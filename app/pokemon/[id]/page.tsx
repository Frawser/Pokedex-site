type PokemonPageProps = {
  params: { id: string };
};

export default async function PokemonPage({ params }: PokemonPageProps) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon");
  const pokemon = await res.json();
  

  return (
    <main className="flex flex-col items-center gap-6 p-10">
      <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="w-60 h-60"
      />

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">Stats</h2>
        <ul className="mt-2 space-y-1">
          {pokemon.stats.map((stat: any) => (
            <li key={stat.stat.name} className="capitalize">
              {stat.stat.name}: <span className="font-bold">{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
