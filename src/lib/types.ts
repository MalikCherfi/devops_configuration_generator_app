export type FileType = "ci.yml" | "eslint" | "pre-commit";

export interface JobDefinition {
  id: string;
  label: string;
  description: string;
  default?: boolean;
}

export interface GeneratePayload {
  /** Chemin absolu du dossier local dans lequel le back doit écrire le fichier */
  repoPath: string;
  /** Type de fichier demandé */
  fileType: FileType;
  /** Nom (relatif) du fichier à créer, ex: ".github/workflows/ci.yml" */
  fileName: string;
  /** Contenu complet du fichier à écrire */
  content: string;
  /** Jobs sélectionnés (uniquement pertinent pour fileType === "ci.yml") */
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
  {
    value: "eslint",
    label: "Configuration ESLint",
    description: "Fichier de config ESLint (flat config)",
    fileName: "eslint.config.mjs",
  },
  {
    value: "pre-commit",
    label: "Pre-commit hooks",
    description: "Hooks exécutés avant chaque commit",
    fileName: ".pre-commit-config.yaml",
  },
];