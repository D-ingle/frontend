"use client";

import { useMapModeStore } from "../../store/mapModeStore";
import Navbar from "./Navbar";
import { cn } from "../../lib/utils";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMapMode } = useMapModeStore();

  return (
    <>
      <div
        className={cn(
          "sticky top-0 z-50 w-full bg-white",
          isMapMode && "hidden",
        )}
      >
        <Navbar />
      </div>
      {children}
    </>
  );
}
