import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { createWaveCheckout } from "@/lib/payments/wave";
import { createOrangeCheckout } from "@/lib/payments/orange";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customer, items, paymentMethod } = body;

  if (!items?.length)
    return NextResponse.json({ error: "Panier vide" }, { status: 400 });

  const subtotal = items.reduce(
    (t: number, i: any) => t + i.price_fcfa * i.qty,
    0
  );
  const shipping = subtotal >= 50000 ? 0 : 2000;
  const total = subtotal + shipping;
  const reference = `DD-${Date.now().toString(36).toUpperCase()}`;

  const { data: order, error } = await supabaseAdmin()
    .from("orders")
    .insert({
      reference,
      customer_name: customer.name,
      customer_phone: customer.phone,
      customer_email: customer.email,
      address: customer.address,
      city: customer.city,
      items,
      subtotal_fcfa: subtotal,
      shipping_fcfa: shipping,
      total_fcfa: total,
      payment_method: paymentMethod,
      payment_status: "pending",
    })
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const successUrl = `${base}/checkout/confirmation?ref=${reference}`;
  const errorUrl = `${base}/checkout?error=1`;

  if (paymentMethod === "wave") {
    const r = await createWaveCheckout({
      amount: total,
      currency: "XOF",
      successUrl,
      errorUrl,
      reference,
    });
    if (r.ok) return NextResponse.json({ order, redirect: r.checkoutUrl });
    return NextResponse.json({
      order,
      notice: "Wave indisponible — paiement à la livraison",
    });
  }

  if (paymentMethod === "orange") {
    const r = await createOrangeCheckout({
      amount: total,
      reference,
      returnUrl: successUrl,
      cancelUrl: errorUrl,
    });
    if (r.ok) return NextResponse.json({ order, redirect: r.checkoutUrl });
    return NextResponse.json({
      order,
      notice: "Orange Money indisponible — paiement à la livraison",
    });
  }

  return NextResponse.json({ order, redirect: successUrl });
}