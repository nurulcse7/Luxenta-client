import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const publicRoutes = ["/login", "/register"];

export const middleware = async (request: NextRequest) => {
	const { pathname } = request.nextUrl;

	const userInfo = await getCurrentUser();

	if (userInfo) {
		if (publicRoutes.some(route => pathname.startsWith(route))) {
			return NextResponse.redirect(new URL(`/`, request.url));
		}
		return NextResponse.next();
	}

	if (publicRoutes.some(route => pathname.startsWith(route))) {
		return NextResponse.next();
	}

	return NextResponse.redirect(
		new URL(`/login?redirectPath=${pathname}`, request.url)
	);
};

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
