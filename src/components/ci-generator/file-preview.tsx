"use client";

import { useState } from "react";
import { Check, Copy, Eye } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface FilePreviewProps {
  fileName: string;
  content: string;
}

/**
 * Affiche le contenu du fichier qui sera envoyé au backend,
 * avec un bouton pour copier rapidement le contenu.
 */
export function FilePreview({ fileName, content }: FilePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Eye className="h-4 w-4" />
            Aperçu
          </CardTitle>
          <Button size="sm" variant="outline" onClick={handleCopy}>
            {copied ? (
              <Check className="mr-1.5 h-3.5 w-3.5" />
            ) : (
              <Copy className="mr-1.5 h-3.5 w-3.5" />
            )}
            {copied ? "Copié" : "Copier"}
          </Button>
        </div>
        <CardDescription className="font-mono text-xs">
          {fileName}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col min-h-0">
        <pre className="flex-1 overflow-auto rounded-md bg-muted p-4 text-xs leading-relaxed font-mono">
          <code>{content}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
