"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface GeoFeatureCollection {
  type: "FeatureCollection";
  features: any[];
}

export default function SeoulMap() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 600;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black"); // SVG 경계 확인용

    // 기존 렌더 제거 (리렌더 대비)
    svg.selectAll("*").remove();

    // 배경색 추가 (SVG 렌더링 확인용) -> 흰색 배경 명시
    svg.append("rect").attr("width", width).attr("height", height);

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
        // GeoJSON Winding Order Fix (CW -> CCW)
        // D3 expects Counter-Clockwise for exterior rings.
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

        // 1️⃣ projection 설정
        // fitExtent를 사용하여 여백을 두고 자동으로 맞춤
        const projection = d3.geoMercator().fitExtent(
          [
            [20, 20],
            [width - 20, height - 20],
          ],
          geojson as any,
        );

        // 2️⃣ path generator
        const pathGenerator = d3.geoPath().projection(projection);

        // 3️⃣ 폴리곤 그리기
        svg
          .selectAll("path")
          .data(geojson.features)
          .enter()
          .append("path")
          .attr("d", (d) => pathGenerator(d as any) || "")
          .attr("fill", "#e5e7eb")
          .attr("stroke", "white") // 배경색과 같은 색으로 설정하여 간격(gap) 효과
          .attr("stroke-width", 5) // 간격 크기 조절
          .on("mouseenter", function () {
            d3.select(this).attr("fill", "#60a5fa");
            d3.select(this).raise(); // 마우스 오버시 위로 올려서 선명하게
          })
          .on("mouseleave", function () {
            d3.select(this).attr("fill", "#e5e7eb");
          });
      })
      .catch((err) => {
        console.error("Error loading map data:", err);
      });
  }, []);

  return <svg ref={svgRef} />;
}
