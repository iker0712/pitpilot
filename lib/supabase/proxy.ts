import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            }
          );
        },
      },
    }
  );

  const { data: claimsData, error } =
    await supabase.auth.getClaims();

  if (error) {
    console.error(
      "Error comprobando sesión:",
      error
    );
  }

  const claims = claimsData?.claims ?? null;

  const pathname = request.nextUrl.pathname;

  // Sin sesión → enviar al login
  if (
    !claims &&
    pathname.startsWith("/dashboard")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  // Con sesión → evitar volver al login
  if (
    claims &&
    pathname === "/login"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";

    return NextResponse.redirect(url);
  }

  return response;
}