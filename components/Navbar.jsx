import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 w-full py-6 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-white text-3xl font-extrabold tracking-wide">
          🎯 Daily Goals
        </h1>
        <div className="flex space-x-10 text-lg font-medium">
          <Link
            href="/"
            className="text-white hover:text-yellow-300 transition duration-200 flex items-center gap-2"
          >
            🏠 <span>Acasă</span>
          </Link>
          <Link
            href="/records/create"
            className="text-white hover:text-yellow-300 transition duration-200 flex items-center gap-2"
          >
            ➕ <span>Adaugă obiectiv</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
