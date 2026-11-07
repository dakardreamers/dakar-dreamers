export async function createWaveCheckout(params: {
  amount: number;
  currency: "XOF";
  successUrl: string;
  errorUrl: string;
  reference: string;
}) {
  const key = process.env.WAVE_API_KEY;
  if (!key) return { ok: false as const, reason: "WAVE_NOT_CONFIGURED" };

  const res = await fetch("https://api.wave.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: String(params.amount),
      currency: params.currency,
      success_url: params.successUrl,
      error_url: params.errorUrl,
      client_reference: params.reference,
    }),
  });

  if (!res.ok) return { ok: false as const, reason: "WAVE_API_ERROR" };
  const data = await res.json();
  return { ok: true as const, checkoutUrl: data.wave_launch_url as string };
}