"use client";

import { ListChecks } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AVAILABLE_JOBS } from "../../lib/templates";

interface JobsSelectorProps {
  selectedJobs: string[];
  onToggleJob: (jobId: string, checked: boolean) => void;
  disabled?: boolean;
}

export function JobsSelector({
  selectedJobs,
  onToggleJob,
  disabled,
}: JobsSelectorProps) {
  return (
    <Card className={disabled ? "opacity-50" : undefined}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <ListChecks className="h-4 w-4" />
          Jobs GitHub Actions
        </CardTitle>
        <CardDescription>
          Sélectionnez les jobs à inclure dans le workflow (cumulatif)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground">
          <Badge variant="secondary">install</Badge>
          Toujours inclus automatiquement (installation des dépendances)
        </div>

        <div className="space-y-3">
          {AVAILABLE_JOBS.map((job) => (
            <div key={job.id} className="flex items-start gap-3">
              <Checkbox
                id={`job-${job.id}`}
                checked={selectedJobs.includes(job.id)}
                disabled={disabled}
                onCheckedChange={(checked) =>
                  onToggleJob(job.id, checked === true)
                }
              />
              <div className="grid gap-0.5 leading-none">
                <Label htmlFor={`job-${job.id}`} className="font-medium">
                  {job.label}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {job.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
