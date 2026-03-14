import type { PanchaBhoota } from "@/types/edition";
import {
  Flame,
  Mountain,
  Orbit,
  Sparkles,
  Wind,
  Droplets,
} from "lucide-react";

const ELEMENT_ICONS: Record<PanchaBhoota, React.ComponentType<{ className?: string }>> = {
  Prithvi: Mountain,
  Jala: Droplets,
  Agni: Flame,
  Vayu: Wind,
  Akasha: Sparkles,
};

interface ElementIconProps {
  element: PanchaBhoota;
  className?: string;
}

export function ElementIcon({ element, className }: ElementIconProps) {
  const Icon = ELEMENT_ICONS[element] ?? Orbit;
  return <Icon className={className} aria-hidden />;
}
