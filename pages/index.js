import MainPage from "@/components/MainPage";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <SignedIn>
        <MainPage />
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
