"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import type { GenerationResult } from "../../lib/api";

interface SendStatusProps {
  result: GenerationResult;
}

export function SendStatus({ result }: SendStatusProps) {
  if (!result.ok) {
    return (
      <div className="flex w-full items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-left text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
        <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="min-w-0 flex-1 text-left">
          <p className="font-medium leading-snug">
            Échec de l&apos;envoi au backend
          </p>
          <p className="mt-0.5 break-all text-xs leading-snug opacity-80">
            {result.error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-start gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="min-w-0 flex-1 text-left">
        <p className="font-medium leading-snug">
          {result.message ?? "Fichier créé avec succès"}
        </p>
        {result.path && (
          <p className="mt-0.5 break-all font-mono text-xs leading-snug opacity-80">
            {result.path}
          </p>
        )}
      </div>
    </div>
  );
}
