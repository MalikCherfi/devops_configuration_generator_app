import type { JobDefinition } from "./types";

/**
 * Jobs "optionnels" proposés à l'utilisateur pour le fichier ci.yml.
 * Le job "install" est toujours ajouté automatiquement en base, il n'est
 * donc pas listé ici : cocher un job l'ajoute EN PLUS des autres jobs déjà
 * cochés (ils ne s'excluent jamais entre eux).
 */
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

/**
 * Génère le contenu complet du ci.yml en fonction des jobs cochés.
 * Le job "install" est toujours présent en base.
 * Chaque job optionnel coché (dont "eslint") s'ajoute EN PLUS des autres.
 */
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

/** Template de base pour une config ESLint (flat config, projet TS/Next.js) */
export function generateEslintConfig(): string {
  return `import js from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    ignores: ["node_modules/**", ".next/**", "dist/**", "build/**"],
  },
];
`;
}

/** Template de base pour un .pre-commit-config.yaml */
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