import { getFeaturedPokemon } from "@/lib/util";
import Link from "next/link";

export default async function Featured() {
  const pokemons = await getFeaturedPokemon();
  return (
    <section className="px-3 py-5">
      <h1 className="text-center mt-4 mb-4 text-5xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">
        Featured Pokémon
      </h1>
      <div className="flex justify-center mb-35">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {pokemons.map((pokemon) => (
            <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
              <li className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-md hover:shadow-xl p-5 cursor-pointer transition-all duration-300 flex flex-col items-center hover:-translate-y-1">
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
          ))}
        </ul>
      </div>
    </section>
  );
}

