import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="bg-purple-800 w-full py-8 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center px-10 gap-6 sm:gap-0">
        <h1 className="text-white text-4xl font-extrabold tracking-wide font-[Poppins] leading-relaxed">
          Daily Goals
        </h1>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 items-center">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md text-lg tracking-wider min-w-[140px] text-center"
          >
            Acasă
          </Link>
          <Link
            href="/records/create"
            className="bg-green-600 hover:bg-green-700 hover:scale-105 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md text-lg tracking-wider min-w-[140px] text-center"
          >
            Adaugă obiectiv
          </Link>
          <Link
            href="/records/completed"
            className="bg-yellow-500 hover:bg-yellow-600 hover:scale-105 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md text-lg tracking-wider min-w-[140px] text-center"
          >
            Finalizate
          </Link>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-white text-purple-800 font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-md">
                Autentificare
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
