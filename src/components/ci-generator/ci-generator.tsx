"use client";

import { useMemo, useState } from "react";
import { RepoPathField } from "./repo-path-field";
import { FileTypeSelect } from "./file-type-select";
import { JobsSelector } from "./jobs-selector";
import { FilePreview } from "./file-preview";
import { GenerateButton } from "./generate-button";
import { SendStatus } from "./send-status";
import { sendGenerationRequest, type GenerationResult } from "../../lib/api";
import {
  generateCiYml,
  generateEslintConfig,
  generatePreCommitConfig,
  AVAILABLE_JOBS,
} from "../../lib/templates";
import { FILE_TYPE_OPTIONS, type FileType, type GeneratePayload } from "../../lib/types";

const DEFAULT_JOBS = AVAILABLE_JOBS.filter((job) => job.default).map(
  (job) => job.id
);

export function CiGenerator() {
  const [repoPath, setRepoPath] = useState("");
  const [fileType, setFileType] = useState<FileType>("ci.yml");
  const [selectedJobs, setSelectedJobs] = useState<string[]>(DEFAULT_JOBS);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);

  const fileName =
    FILE_TYPE_OPTIONS.find((opt) => opt.value === fileType)?.fileName ?? "";

  // Contenu généré recalculé à chaque changement de type de fichier / jobs.
  const content = useMemo(() => {
    switch (fileType) {
      case "ci.yml":
        return generateCiYml(selectedJobs);
      case "eslint":
        return generateEslintConfig();
      case "pre-commit":
        return generatePreCommitConfig();
      default:
        return "";
    }
  }, [fileType, selectedJobs]);

  const handleToggleJob = (jobId: string, checked: boolean) => {
    setSelectedJobs((prev) =>
      checked ? [...prev, jobId] : prev.filter((id) => id !== jobId)
    );
  };

  const handleGenerate = async () => {
    const payload: GeneratePayload = {
      repoPath,
      fileType,
      fileName,
      content,
      jobs: fileType === "ci.yml" ? selectedJobs : undefined,
    };

    setLoading(true);
    setResult(null);
    try {
      const res = await sendGenerationRequest(payload);
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  const canGenerate = repoPath.trim().length > 0;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <RepoPathField value={repoPath} onChange={setRepoPath} />
        <FileTypeSelect value={fileType} onChange={setFileType} />
        <JobsSelector
          selectedJobs={selectedJobs}
          onToggleJob={handleToggleJob}
          disabled={fileType !== "ci.yml"}
        />

        <div className="flex flex-col gap-3">
          <GenerateButton
            onClick={handleGenerate}
            loading={loading}
            disabled={!canGenerate}
          />
          {result && <SendStatus result={result} />}
        </div>
      </div>

      <div>
        <FilePreview fileName={fileName} content={content} />
      </div>
    </div>
  );
}