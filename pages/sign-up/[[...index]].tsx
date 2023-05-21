import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen w-full flex items-center-justify-center">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        redirectUrl="/dashboard"
      />
    </div>
  );
}
