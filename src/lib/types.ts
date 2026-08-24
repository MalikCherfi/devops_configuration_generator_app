export type FileType = "ci.yml" | "eslint" | "pre-commit";

export interface JobDefinition {
  id: string;
  label: string;
  description: string;
  default?: boolean;
}

export interface GeneratePayload {
  repoPath: string;
  fileType: FileType;
  fileName: string;
  content: string;
  jobs?: string[];
}

export const FILE_TYPE_OPTIONS: {
  value: FileType;
  label: string;
  description: string;
  fileName: string;
}[] = [
  {
    value: "ci.yml",
    label: "Workflow CI (ci.yml)",
    description: "Pipeline GitHub Actions : install, lint, tests, build...",
    fileName: ".github/workflows/ci.yml",
  },
  // {
  //   value: "eslint",
  //   label: "Configuration ESLint",
  //   description: "Fichier de config ESLint (flat config)",
  //   fileName: "eslint.config.mjs",
  // },
  // {
  //   value: "pre-commit",
  //   label: "Pre-commit hooks",
  //   description: "Hooks exécutés avant chaque commit",
  //   fileName: ".pre-commit-config.yaml",
  // },
];