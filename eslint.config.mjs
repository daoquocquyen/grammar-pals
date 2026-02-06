import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: ["node_modules", ".next", "out", "coverage", "dist", ".vercel"],
  },
  ...nextCoreWebVitals,
];

export default config;
