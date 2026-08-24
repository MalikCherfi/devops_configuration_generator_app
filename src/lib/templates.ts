import type { JobDefinition } from "./types";

export const AVAILABLE_JOBS: JobDefinition[] = [
  {
    id: "lint",
    label: "Lint",
    description: "Exécute le script npm run lint du projet",
    default: true,
  },
  {
    id: "eslint",
    label: "ESLint",
    description: "Job dédié qui exécute ESLint directement (npx eslint .)",
    default: false,
  },
  {
    id: "typecheck",
    label: "Type check",
    description: "Vérifie les types TypeScript (tsc --noEmit)",
    default: false,
  },
  {
    id: "test",
    label: "Tests unitaires",
    description: "Lance la suite de tests (Jest / Vitest)",
    default: true,
  },
  {
    id: "build",
    label: "Build",
    description: "Build de production de l'application",
    default: true,
  },
  {
    id: "security",
    label: "Audit de sécurité",
    description: "npm audit sur les dépendances",
    default: false,
  },
];

const INSTALL_JOB = `  install:
    name: Install dependencies
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
`;

function jobBlock(id: string): string {
  const checkoutAndInstall = `      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci`;

  switch (id) {
    case "lint":
      return `  lint:
    name: Lint
    runs-on: ubuntu-latest
    needs: install
    steps:
${checkoutAndInstall}
      - run: npm run lint
`;
    case "eslint":
      return `  eslint:
    name: ESLint
    runs-on: ubuntu-latest
    needs: install
    steps:
${checkoutAndInstall}
      - run: npx eslint . --max-warnings=0
`;
    case "typecheck":
      return `  typecheck:
    name: Type check
    runs-on: ubuntu-latest
    needs: install
    steps:
${checkoutAndInstall}
      - run: npx tsc --noEmit
`;
    case "test":
      return `  test:
    name: Tests
    runs-on: ubuntu-latest
    needs: install
    steps:
${checkoutAndInstall}
      - run: npm test -- --ci
`;
    case "build":
      return `  build:
    name: Build
    runs-on: ubuntu-latest
    needs: install
    steps:
${checkoutAndInstall}
      - run: npm run build
`;
    case "security":
      return `  security:
    name: Security audit
    runs-on: ubuntu-latest
    needs: install
    steps:
${checkoutAndInstall}
      - run: npm audit --audit-level=high
`;
    default:
      return "";
  }
}

export function generateCiYml(selectedJobIds: string[]): string {
  const header = `name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
`;

  const selectedBlocks = AVAILABLE_JOBS.filter((job) =>
    selectedJobIds.includes(job.id)
  )
    .map((job) => jobBlock(job.id))
    .join("\n");

  return `${header}${INSTALL_JOB}\n${selectedBlocks}`.trimEnd() + "\n";
}

export function generateEslintConfig(): string {
  return `// npm i -D eslint eslint-config-next
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
 
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])
 
export default eslintConfig
`;
}

export function generatePreCommitConfig(): string {
  return `repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files

  - repo: local
    hooks:
      - id: eslint
        name: ESLint
        entry: npx eslint --fix
        language: system
        types: [javascript, ts, tsx]

      - id: prettier
        name: Prettier
        entry: npx prettier --write
        language: system
        types: [javascript, ts, tsx, css, json]
`;
}