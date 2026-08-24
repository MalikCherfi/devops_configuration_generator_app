"use client";

import { useState } from "react";
import { Check, Copy, Eye } from "lucide-react";
import Editor from "@monaco-editor/react";
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

/** Détermine le langage Monaco en fonction de l'extension du fichier */
function getLanguage(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "yml":
    case "yaml":
      return "yaml";
    case "js":
    case "mjs":
    case "cjs":
      return "javascript";
    case "ts":
    case "tsx":
      return "typescript";
    case "tf":
    case "tfvars":
      return "hcl";
    case "json":
      return "json";
    default:
      return "plaintext";
  }
}

export function FilePreview({ fileName, content }: FilePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const language = getLanguage(fileName);

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
      
      <CardContent>
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={content}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 12,
            lineNumbers: "on",
            guides: { indentation: true },
            automaticLayout: true,
            domReadOnly: true,
            tabSize: 2,
          }}
        />
      </CardContent>
    </Card>
  );
}