"use client";

import Link from "next/link";
import { useState } from "react";

export default function RandomPokemon() {
  const [pokemon, setPokemon] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchRandomPokemon() {
    setLoading(true);

    const max = 1302;
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
        className="btn-primary flex items-center gap-2"
        disabled={loading}
      >
        {loading ? "Loading..." : "🎲 Random Pokémon"}
      </button>

      {pokemon && (
        <Link href={`/pokemon/${pokemon.id}`}>
          <li className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-md hover:shadow-xl p-5 cursor-pointer transition-all duration-300 flex flex-col items-center hover:-translate-y-1 list-none">
            <div className="w-40 h-40 flex items-center justify-center mb-3">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-30 h-30 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h2 className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-100 group-hover:text-yellow-500">
              {pokemon.name}
            </h2>
          </li>
        </Link>
      )}
    </div>
  );
}
