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
