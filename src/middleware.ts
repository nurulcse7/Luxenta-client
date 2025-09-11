import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const publicRoutes = ["/login", "/register"];

export const middleware = async (request: NextRequest) => {
	const { pathname } = request.nextUrl;

	const userInfo = await getCurrentUser();

	// Logged-in user
	if (userInfo) {
		// Prevent logged-in user from accessing public routes
		if (publicRoutes.some(route => pathname.startsWith(route))) {
			return NextResponse.redirect(new URL(`/`, request.url));
		}

		// Only allow 'investor' role
		if (userInfo.role !== "investor") {
			return NextResponse.redirect(
				new URL(`/login?redirectPath=${pathname}`, request.url)
			);
		}

		// Allowed, continue
		return NextResponse.next();
	}

	// Logged-out user accessing public routes
	if (publicRoutes.some(route => pathname.startsWith(route))) {
		return NextResponse.next();
	}

	// Logged-out user trying to access protected route
	return NextResponse.redirect(
		new URL(`/login?redirectPath=${pathname}`, request.url)
	);
};

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
