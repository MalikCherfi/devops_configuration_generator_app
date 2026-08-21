"use client";

import { Loader2, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

/**
 * Bouton "Generate" : lance la génération du fichier et l'envoi
 * du payload (chemin + contenu) au backend.
 */
export function GenerateButton({
  onClick,
  loading,
  disabled,
}: GenerateButtonProps) {
  return (
    <Button onClick={onClick} disabled={disabled || loading} size="lg">
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Generate
    </Button>
  );
}