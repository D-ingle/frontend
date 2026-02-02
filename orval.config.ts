import { defineConfig } from "orval";

export default defineConfig({
  dingle: {
    input: {
      target: "https://d-home.o-r.kr/v3/api-docs",
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
