import { getFeaturedPokemon } from "@/lib/util";
import Link from "next/link";
import { typeColors } from "@/lib/util";

export default async function Featured() {
  const pokemons = await getFeaturedPokemon();

  return (
    <section className="px-3 py-5">
      <h1 className="text-center mt-4 mb-4 text-5xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">
        Featured Pokémon
      </h1>
      <div className="flex justify-center mb-35">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {pokemons.map((pokemon) => {
            const firstType = pokemon.types?.[0]?.type?.name || "normal";

            const hp = pokemon.stats.find(
              (s: any) => s.stat.name === "hp"
            )?.base_stat;
            const attack = pokemon.stats.find(
              (s: any) => s.stat.name === "attack"
            )?.base_stat;
            const defense = pokemon.stats.find(
              (s: any) => s.stat.name === "defense"
            )?.base_stat;

            return (
              <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
                <li
                  className={`group bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-xl p-5 cursor-pointer transition-all duration-300 flex flex-col items-center hover:-translate-y-1`}
                >
                  <div
                    className={`w-40 h-40 flex items-center justify-center mb-3 border-4 ${typeColors[firstType].border} rounded-full`}
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
                        {hp}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ATK
                      </span>
                      <span className="font-bold text-gray-800 dark:text-gray-100">
                        {attack}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        DEF
                      </span>
                      <span className="font-bold text-gray-800 dark:text-gray-100">
                        {defense}
                      </span>
                    </div>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
