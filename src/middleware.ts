import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const allowedRoles = ["investor", "agent"] as const;
type Role = (typeof allowedRoles)[number];

const commonPaths = [/^\//]; // Everyone can access
const roleBasedPaths: Record<Role, RegExp[]> = {
	investor: [/^\/investor/],
	agent: [/^\/agent/],
};

export const middleware = async (req: NextRequest) => {
	const { pathname, origin } = req.nextUrl;

	// 1️⃣ Allow login and register even in maintenance
	if (pathname === "/login" || pathname === "/register") {
		return NextResponse.next();
	}

	const user = await getCurrentUser();

	// 3️⃣ Logged-out → redirect to login
	if (!user) {
		return NextResponse.redirect(new URL("/login", origin));
	}

	const role = user.role as string;

	// 4️⃣ Role-based access
	if (allowedRoles.includes(role as Role)) {
		const isCommon = commonPaths.some(regex => regex.test(pathname));
		if (isCommon || pathname === "/") return NextResponse.next();

		const allowedPaths = roleBasedPaths[role as Role];
		const matchesRolePage = allowedPaths.some(regex => regex.test(pathname));
		if (matchesRolePage) return NextResponse.next();

		return NextResponse.redirect(new URL("/", origin));
	}

	// 5️⃣ Block other roles
	return NextResponse.redirect(new URL("/login", origin));
};

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
