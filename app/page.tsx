import Featured from "@/components/Featured";
import RandomPokemon from "@/components/RandomPokemon";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col items-center gap-4 p-14">
        <h1 className="text-center mt-10 text-8xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">
          Gotta catch &apos;em all!
        </h1>
        <p className="text-center text-white text-xl">
          Discover, search and explore the amazing world of Pokémon. Find
          <br /> your favourite and learn about their stats.
        </p>

        <RandomPokemon />
      </section>
      <section>
        <Featured />
      </section>
    </main>
  );
}
