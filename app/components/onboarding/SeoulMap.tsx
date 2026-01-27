"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface GeoFeature {
  type: "Feature";
  properties: {
    SIG_KOR_NM: string;
    [key: string]: any;
  };
  geometry: any;
}

interface GeoFeatureCollection {
  type: "FeatureCollection";
  features: GeoFeature[];
}

interface SeoulMapProps {
  selectedRegions: string[];
  onRegionClick: (regionName: string) => void;
}

export default function SeoulMap({
  selectedRegions,
  onRegionClick,
}: SeoulMapProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [geoData, setGeoData] = useState<GeoFeatureCollection | null>(null);
  const onRegionClickRef = useRef(onRegionClick);
  const selectedRegionsRef = useRef(selectedRegions);

  // Update refs for callbacks and state to avoid re-binding issues in D3
  useEffect(() => {
    onRegionClickRef.current = onRegionClick;
    selectedRegionsRef.current = selectedRegions;
  }, [onRegionClick, selectedRegions]);

  // Phase 1: Data Fetching and Initialization
  useEffect(() => {
    fetch("/data/seoul_map/seoul-sig.geojson")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch GeoJSON");
        return res.json();
      })
      .then((geojson: GeoFeatureCollection) => {
        // Reverse coordinates if necessary (D3 orientation)
        geojson.features.forEach((feature) => {
          if (feature.geometry.type === "Polygon") {
            feature.geometry.coordinates.forEach((ring: any[]) =>
              ring.reverse(),
            );
          } else if (feature.geometry.type === "MultiPolygon") {
            feature.geometry.coordinates.forEach((polygon: any[]) => {
              polygon.forEach((ring: any[]) => ring.reverse());
            });
          }
        });
        setGeoData(geojson);
      })
      .catch((err) => console.error("Error loading map data:", err));
  }, []);

  // Phase 2: Render and Update
  useEffect(() => {
    if (!geoData || !svgRef.current) return;

    const width = 776;
    const height = 776;

    const svg = d3.select(svgRef.current);

    // Initial SVG Setup (only runs once after data is loaded)
    if (svg.selectAll("g").empty()) {
      svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("width", "100%")
        .attr("height", "100%");

      const projection = d3.geoMercator().fitExtent(
        [
          [5, 5],
          [width - 5, height - 5],
        ],
        geoData as any,
      );

      const pathGenerator = d3.geoPath().projection(projection);

      const gPaths = svg.append("g").attr("class", "regions");
      const gLabels = svg.append("g").attr("class", "labels");

      // Draw Regions (Static part)
      gPaths
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", (d) => pathGenerator(d as any) || "")
        .attr("cursor", "pointer")
        .style("transition", "all 0.3s ease")
        .on("click", (_event, d) => {
          onRegionClickRef.current(d.properties.SIG_KOR_NM);
        })
        .on("mouseenter", function (_event, d) {
          const isSelected = selectedRegionsRef.current.includes(
            d.properties.SIG_KOR_NM,
          );
          d3.select(this)
            .attr("fill", isSelected ? "#DEFAF2" : "#F2F2F2")
            .attr("stroke", "#30CEA1")
            .attr("stroke-width", 4)
            .raise();
        })
        .on("mouseleave", function (_event, d) {
          updateStyles();
        });

      // Draw Labels (Static part)
      gLabels
        .selectAll("text")
        .data(geoData.features)
        .enter()
        .append("text")
        .attr("x", (d) => pathGenerator.centroid(d as any)[0])
        .attr("y", (d) => pathGenerator.centroid(d as any)[1])
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "14px")
        .attr("pointer-events", "none")
        .style("font-family", "Pretendard Variable, sans-serif")
        .text((d) => d.properties.SIG_KOR_NM);
    }

    // Phase 3: Update Styles Based on selectedRegions
    const updateStyles = () => {
      const currentSelected = selectedRegionsRef.current;
      svg
        .selectAll<SVGPathElement, GeoFeature>("path")
        .attr("fill", (d) =>
          currentSelected.includes(d.properties.SIG_KOR_NM)
            ? "#DEFAF2"
            : "#F7F7F7",
        )
        .attr("stroke", "#FFFFFF")
        .attr("stroke-width", 4);

      svg
        .selectAll<SVGTextElement, GeoFeature>("text")
        .attr("font-weight", (d) =>
          currentSelected.includes(d.properties.SIG_KOR_NM) ? "700" : "500",
        )
        .attr("fill", (d) =>
          currentSelected.includes(d.properties.SIG_KOR_NM)
            ? "#2EA98C"
            : "#7B7B7B",
        );
    };

    updateStyles();
  }, [geoData, selectedRegions]);

  return <svg ref={svgRef} className="w-full h-full" />;
}
