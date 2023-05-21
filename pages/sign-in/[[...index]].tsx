import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen w-full flex items-center-justify-center">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl="/dashboard"
      />
    </div>
  );
}
