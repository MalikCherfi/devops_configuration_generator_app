import type { GeneratePayload } from "./types";

export interface GenerationResult {
  ok: boolean;
  payload: GeneratePayload;
  message?: string;
  path?: string;
  error?: string;
}

/**
 * Envoie le payload au backend qui se chargera de créer le fichier
 * sur le disque local, au chemin indiqué (repoPath + fileName).
 *
 * Ne masque plus les erreurs : si le backend répond une erreur ou est
 * injoignable, ok=false est renvoyé avec le message d'erreur associé.
 */
export async function sendGenerationRequest(
  payload: GeneratePayload
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
    // Ici on tombe uniquement en cas de vrai problème réseau
    // (backend éteint, CORS bloquant, mauvaise URL...).
    console.error("Impossible de contacter le backend :", err);
    return {
      ok: false,
      payload,
      error:
        err instanceof Error
          ? err.message
          : "Impossible de contacter le backend",
    };
  }
}