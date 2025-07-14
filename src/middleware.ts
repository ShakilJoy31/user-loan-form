
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  
  const token = request?.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  // let user;
  // try {
  //   user = jwtDecode(token);  
  // } catch (error) {
  //   return NextResponse.redirect(new URL("/admin-login", request.url));
  // }
  
//   console.log("**user", user);
//   if (user?.role === "ADMIN") {
//     return NextResponse.next();
//   } else {
//     return NextResponse.redirect(new URL("/admin-login", request.url));
//   }
}

export const config = {
  matcher: ["/cart", "/my_order", "/return_order", "/cancel_order", "/wishlist", "/profile"],
};