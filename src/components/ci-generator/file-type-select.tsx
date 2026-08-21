"use client";

import { FileCode2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FILE_TYPE_OPTIONS, type FileType } from "../../lib/types";

interface FileTypeSelectProps {
  value: FileType;
  onChange: (value: FileType) => void;
}

/**
 * Sélecteur du type de fichier à générer : ci.yml, eslint ou pre-commit.
 */
export function FileTypeSelect({ value, onChange }: FileTypeSelectProps) {
  const current = FILE_TYPE_OPTIONS.find((opt) => opt.value === value);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <FileCode2 className="h-4 w-4" />
          Type de fichier
        </CardTitle>
        <CardDescription>Que voulez-vous générer ?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label htmlFor="file-type">Fichier</Label>
        <Select value={value} onValueChange={(v) => onChange(v as FileType)}>
          <SelectTrigger id="file-type">
            <SelectValue placeholder="Choisir un type de fichier" />
          </SelectTrigger>
          <SelectContent>
            {FILE_TYPE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {current && (
          <p className="text-sm text-muted-foreground">
            {current.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}