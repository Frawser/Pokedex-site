"use client";
import { typeColors } from "@/lib/util";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { getPokemonList } from "@/lib/util";
import Link from "next/link";
import { PokemonDetails } from "@/lib/interface";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
  const [filtered, setFiltered] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    getPokemonList().then((list) => setPokemonList(list));
  }, []);

  const handleSearch = useDebouncedCallback((value: string) => {
    const results = pokemonList.filter(
      (p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.types.some((t) =>
          String(t).toLowerCase().includes(value.toLowerCase())
        )
    );
    setFiltered(results.slice(0, 10));
  }, 200);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 rounded-lg bg-gray-700 text-white text-sm shadow hover:bg-gray-600 transition-colors"
      >
        Search (Ctrl+K)
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-4">
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />

            <ul className="mt-4 flex flex-col gap-2 max-h-80 overflow-y-auto">
              {filtered.map((p) => (
                <Link key={p.name} href={`/pokemon/${p.name}`}>
                  <li className="group bg-white dark:bg-gray-800 border-2 rounded-3xl shadow-md p-3 flex flex-col cursor-pointer hover:shadow-xl transition-all duration-200">
                    <span className="capitalize text-gray-800 dark:text-gray-100 font-semibold">
                      {p.name}
                    </span>
                    <div className="flex gap-2 mt-1">
                      {p.types.map((type) => (
                        <span
                          key={String(type)}
                          className={`px-2 py-1 text-xs rounded-lg text-white ${
                            typeColors[String(type)]?.bg || "bg-gray-400"
                          }`}
                        >
                          {String(type)}
                        </span>
                      ))}
                    </div>
                  </li>
                </Link>
              ))}
            </ul>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-2 text-sm hover:underline capitalize text-gray-800 dark:text-gray-100 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
