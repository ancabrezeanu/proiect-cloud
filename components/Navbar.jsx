import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-purple-800 w-full py-6 shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto w-full flex justify-between items-center px-8">
        <h1 className="text-white text-3xl font-extrabold tracking-wider font-[Poppins]">
          🎯 Daily Goals
        </h1>

        <div className="flex gap-6">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition-all shadow-md"
          >
            🏠 Acasă
          </Link>
          <Link
            href="/records/create"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full transition-all shadow-md"
          >
            ➕ Adaugă obiectiv
          </Link>
          <Link
            href="/records/completed"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-full transition-all shadow-md"
          >
            ✅ Finalizate
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
