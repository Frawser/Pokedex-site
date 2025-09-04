"use client";

import Link from "next/link";
import { useState } from "react";
import { typeColors } from "@/lib/util";

export default function RandomPokemon() {
  const [pokemon, setPokemon] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchRandomPokemon() {
    setLoading(true);

    const max = 1025;
    const randomId = Math.floor(Math.random() * max) + 1;

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (!res.ok) throw new Error("Failed to fetch Pokémon");

      const data = await res.json();
      setPokemon(data);
    } catch (err) {
      console.error("Failed to fetch Pokemon", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={fetchRandomPokemon}
        className="btn-primary flex items-center gap-2 mb-6"
        disabled={loading}
      >
        {loading ? "Loading..." : "🎲 Random Pokémon"}
      </button>

      {pokemon && (
        <Link href={`/pokemon/${pokemon.id}`}>
          <li className="group bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-xl p-5 cursor-pointer transition-all duration-300 flex flex-col items-center hover:-translate-y-1 list-none">
            <div
              className={`w-40 h-40 flex items-center justify-center mb-3 border-4 ${
                typeColors[pokemon.types?.[0]?.type?.name || "normal"].border
              } rounded-full`}
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-30 h-30 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h2 className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-100 group-hover:text-yellow-500">
              {pokemon.name}
            </h2>

            <div className="flex gap-2 mt-2 flex-wrap justify-center">
              {pokemon.types.map((t: any) => (
                <span
                  key={t.type.name}
                  className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${
                    typeColors[t.type.name]?.bg || "bg-gray-300"
                  }`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3 text-center w-full">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  HP
                </span>
                <span className="font-bold text-gray-800 dark:text-gray-100">
                  {
                    pokemon.stats.find((s: any) => s.stat.name === "hp")
                      ?.base_stat
                  }
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ATK
                </span>
                <span className="font-bold text-gray-800 dark:text-gray-100">
                  {
                    pokemon.stats.find((s: any) => s.stat.name === "attack")
                      ?.base_stat
                  }
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  DEF
                </span>
                <span className="font-bold text-gray-800 dark:text-gray-100">
                  {
                    pokemon.stats.find((s: any) => s.stat.name === "defense")
                      ?.base_stat
                  }
                </span>
              </div>
            </div>
          </li>
        </Link>
      )}
    </div>
  );
}
