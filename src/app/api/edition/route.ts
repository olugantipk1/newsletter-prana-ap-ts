import { NextResponse } from "next/server";
import { getEdition } from "@/lib/edition";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") ?? undefined;
  const source = searchParams.get("source") as "mock" | "rss" | undefined;

  try {
    const { edition, source: usedSource } = await getEdition({ date, source });
    return NextResponse.json(
      { edition, source: usedSource },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("[prana] getEdition error:", error);
    return NextResponse.json(
      { error: "Failed to load edition" },
      { status: 500 }
    );
  }
}
