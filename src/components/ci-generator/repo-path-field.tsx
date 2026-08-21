"use client";

import { FolderGit2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface RepoPathFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Champ permettant de renseigner le chemin absolu du dossier local
 * (le repository) dans lequel le backend devra créer les fichiers.
 */
export function RepoPathField({ value, onChange }: RepoPathFieldProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <FolderGit2 className="h-4 w-4" />
          Repository local
        </CardTitle>
        <CardDescription>
          Chemin du dossier dans lequel les fichiers seront créés
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label htmlFor="repo-path">Chemin du dossier</Label>
        <Input
          id="repo-path"
          placeholder="/Users/moi/projets/mon-repo"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="font-mono text-sm"
        />
      </CardContent>
    </Card>
  );
}