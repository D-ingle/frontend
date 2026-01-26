"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const width = 776;
    const height = 776;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("width", "100%")
      .attr("height", "100%");

    svg.selectAll("*").remove();

    fetch("/data/seoul_map/seoul-sig.geojson")
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to fetch GeoJSON: ${res.status} ${res.statusText}`,
          );
        }
        return res.json();
      })
      .then((geojson: GeoFeatureCollection) => {
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

        const projection = d3.geoMercator().fitExtent(
          [
            [40, 40],
            [width - 40, height - 40],
          ],
          geojson as any,
        );

        const pathGenerator = d3.geoPath().projection(projection);

        // Create groups to manage layering: paths first, then labels
        const gPaths = svg.append("g").attr("class", "regions");
        const gLabels = svg.append("g").attr("class", "labels");

        // Draw Polygons
        gPaths
          .selectAll("path")
          .data(geojson.features)
          .enter()
          .append("path")
          .attr("d", (d) => pathGenerator(d as any) || "")
          .attr("fill", (d) =>
            selectedRegions.includes(d.properties.SIG_KOR_NM)
              ? "#DEFAF2"
              : "#FFFFFF",
          )
          .attr("stroke", (d) =>
            selectedRegions.includes(d.properties.SIG_KOR_NM)
              ? "#30CEA1"
              : "#D9D9D9",
          )
          .attr("stroke-width", 2)
          .attr("cursor", "pointer")
          .style("transition", "all 0.3s ease")
          .on("click", (_event, d) => {
            onRegionClick(d.properties.SIG_KOR_NM);
          })
          .on("mouseenter", function () {
            d3.select(this)
              .attr("stroke", "#30CEA1")
              .attr("stroke-width", 3)
              .raise();
          })
          .on("mouseleave", function (_event, d) {
            const isSelected = selectedRegions.includes(
              d.properties.SIG_KOR_NM,
            );
            d3.select(this)
              .attr("stroke", isSelected ? "#30CEA1" : "#D9D9D9")
              .attr("stroke-width", 2);
          });

        // Draw Labels
        gLabels
          .selectAll("text")
          .data(geojson.features)
          .enter()
          .append("text")
          .attr("x", (d) => pathGenerator.centroid(d as any)[0])
          .attr("y", (d) => pathGenerator.centroid(d as any)[1])
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .attr("font-size", "12px")
          .attr("font-weight", (d) =>
            selectedRegions.includes(d.properties.SIG_KOR_NM) ? "700" : "500",
          )
          .attr("fill", (d) =>
            selectedRegions.includes(d.properties.SIG_KOR_NM)
              ? "#2EA98C"
              : "#7B7B7B",
          )
          .attr("pointer-events", "none")
          .style("font-family", "Pretendard Variable, sans-serif")
          .text((d) => d.properties.SIG_KOR_NM);
      })
      .catch((err) => {
        console.error("Error loading map data:", err);
      });
  }, [selectedRegions, onRegionClick]);

  return <svg ref={svgRef} className="w-full h-full" />;
}
