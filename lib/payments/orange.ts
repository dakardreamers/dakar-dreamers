export async function createOrangeCheckout(params: {
  amount: number;
  reference: string;
  returnUrl: string;
  cancelUrl: string;
}) {
  const {
    ORANGE_MONEY_CLIENT_ID,
    ORANGE_MONEY_CLIENT_SECRET,
    ORANGE_MONEY_MERCHANT_KEY,
  } = process.env;

  if (
    !ORANGE_MONEY_CLIENT_ID ||
    !ORANGE_MONEY_CLIENT_SECRET ||
    !ORANGE_MONEY_MERCHANT_KEY
  ) {
    return { ok: false as const, reason: "ORANGE_NOT_CONFIGURED" };
  }

  const tokenRes = await fetch("https://api.orange.com/oauth/v3/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${ORANGE_MONEY_CLIENT_ID}:${ORANGE_MONEY_CLIENT_SECRET}`
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!tokenRes.ok) return { ok: false as const, reason: "ORANGE_AUTH_ERROR" };
  const { access_token } = await tokenRes.json();

  const payRes = await fetch(
    "https://api.orange.com/orange-money-webpay/dev/v1/webpayment",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant_key: ORANGE_MONEY_MERCHANT_KEY,
        currency: "OUV",
        order_id: params.reference,
        amount: params.amount,
        return_url: params.returnUrl,
        cancel_url: params.cancelUrl,
        notif_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/orange`,
        lang: "fr",
        reference: "DAKAR DREAMERS",
      }),
    }
  );

  if (!payRes.ok) return { ok: false as const, reason: "ORANGE_API_ERROR" };
  const data = await payRes.json();
  return { ok: true as const, checkoutUrl: data.payment_url as string };
}