/// <reference types="vitest"/>

import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    reporters: [
      "verbose",
      [
        "vitest-sonar-reporter",
        { outputFile: "coverage/reports/sonar-reporter.xml" },
      ],
    ],
    environmentMatchGlobs: [["test/bdd/**", "prisma"]],
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
    ],
    globals: true,
    coverage: {
      provider: "istanbul",
      reportsDirectory: "./coverage",
      reporter: ["cobertura", "html", "lcov", "text-summary", "text"],
      include: ["src/**/*"],
      exclude: ["**/config/**", "**/schemas/**", "**/schema/**","**/errors/**", "**/core/domain/**", "**/drivers/**","**/repositories/PrismaRepositoryFactory.ts"],
      all: true,
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
  },
});
