import Search from "@/components/Search";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      <Link href={"/"} className="text-center text-lg font-extrabold">Pokedex</Link>
      <Search />
    </nav>
  );
}
