import { defineConfig } from "orval";

export default defineConfig({
  dingle: {
    input: {
      target: "./openapi.json", // TODO: 백엔드 Swagger URL이나 파일 경로로 수정 필요
    },
    output: {
      mode: "tags-split",
      target: "shared/api/generated/dingle.ts",
      schemas: "shared/api/generated/model",
      client: "react-query",
      override: {
        mutator: {
          path: "shared/api/axios-instance.ts",
          name: "customInstance",
        },
      },
    },
  },
});
