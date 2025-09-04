export async function getFeaturedPokemon() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
  if (!res.ok) throw new Error("Failed to fetch Pokémon list");

  const data = await res.json();

  const chosen: any[] = [];
  const usedIndexes = new Set<number>();

  while (chosen.length < 4) {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    if (!usedIndexes.has(randomIndex)) {
      usedIndexes.add(randomIndex);
      chosen.push(data.results[randomIndex]);
    }
  }

  const pokemons = await Promise.all(
    chosen.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      if (!res.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
      return res.json();
    })
  );

  return pokemons;
}

export const typeColors: Record<string, { border: string; bg: string }> = {
  normal: { border: "border-gray-400", bg: "bg-gray-400" },
  fire: { border: "border-red-500", bg: "bg-red-500" },
  water: { border: "border-blue-500", bg: "bg-blue-500" },
  electric: { border: "border-yellow-400", bg: "bg-yellow-400" },
  grass: { border: "border-green-500", bg: "bg-green-500" },
  ice: { border: "border-cyan-400", bg: "bg-cyan-400" },
  fighting: { border: "border-orange-700", bg: "bg-orange-700" },
  poison: { border: "border-purple-500", bg: "bg-purple-500" },
  ground: { border: "border-yellow-600", bg: "bg-yellow-600" },
  flying: { border: "border-indigo-400", bg: "bg-indigo-400" },
  psychic: { border: "border-pink-500", bg: "bg-pink-500" },
  bug: { border: "border-lime-600", bg: "bg-lime-600" },
  rock: { border: "border-yellow-800", bg: "bg-yellow-800" },
  ghost: { border: "border-purple-700", bg: "bg-purple-700" },
  dragon: { border: "border-indigo-600", bg: "bg-indigo-600" },
  dark: { border: "border-gray-800", bg: "bg-gray-800" },
  steel: { border: "border-gray-500", bg: "bg-gray-500" },
  fairy: { border: "border-pink-300", bg: "bg-pink-300" },
};

export async function getPokemonList() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
  const data = await res.json();
  return data.results.map((p: { name: string }) => p.name);
}
