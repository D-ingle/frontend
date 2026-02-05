"use client";

import { useMapModeStore } from "../../store/mapModeStore";
import Navbar from "./Navbar";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMapMode } = useMapModeStore();

  return (
    <>
      {!isMapMode && (
        <div className="sticky top-0 z-50 w-full bg-white">
          <Navbar />
        </div>
      )}
      {children}
    </>
  );
}
