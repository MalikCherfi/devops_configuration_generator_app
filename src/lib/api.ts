import type { GeneratePayload } from "./types";

export interface GenerationResult {
  ok: boolean;
  payload: GeneratePayload;
  message?: string;
  path?: string;
  error?: string;
}

export async function sendGenerationRequest(
  payload: GeneratePayload,
): Promise<GenerationResult> {
  try {
    const res = await fetch(`http://localhost:8000/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        ok: false,
        payload,
        error: data?.error ?? `Erreur backend (${res.status})`,
      };
    }

    return {
      ok: true,
      payload,
      message: data?.message,
      path: data?.path,
    };
  } catch (err) {
    console.error("Impossible de contacter le backend :", err);
    return {
      ok: false,
      payload,
      error: "Impossible de contacter le backend",
    };
  }
}
