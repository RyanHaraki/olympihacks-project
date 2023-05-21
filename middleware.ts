import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

export const config = {
  matcher: ["/(dashboard)*", "/", "/(api|trpc)(.*)"],
};

// ((?!.*\\..*|_next).*)