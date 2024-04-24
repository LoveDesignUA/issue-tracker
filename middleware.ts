// import { auth } from "@/auth";
// import { NextResponse } from "next/server";

// export default auth((req) => {
//   if (!req.auth) {
//     return NextResponse.redirect(new URL("/api/auth/signin", req.nextUrl));
//   }

//   return null;
// });

// TODO
export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: ["/issues/new", "/issues/:id/edit"],
};
