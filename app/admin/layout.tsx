import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignoré dans les Server Components
          }
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-cream flex">
      <aside className="w-60 bg-choco text-ivory p-8 flex flex-col gap-6">
        <p className="font-display text-xl tracking-[0.2em]">DD · ADMIN</p>
        <nav className="flex flex-col gap-4 text-sm">
          <Link href="/admin" className="link-underline">Dashboard</Link>
          <Link href="/admin/produits" className="link-underline">Produits</Link>
          <Link href="/admin/commandes" className="link-underline">Commandes</Link>
        </nav>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}