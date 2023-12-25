import { useEffect, useState } from 'react'
import { PokemonClient } from 'pokenode-ts';
import { SpeedInsights } from '@vercel/speed-insights/react';


type pokemonData = {
  imageURL: string;
  name: string;
  types: string[];
  base_experience: number;
  height: number;
  weight: number;
  abilities: string[];
}


function TypeLabel(props: { type: string }) {
  console.log(props.type)
  return (
    <span className={`px-3 py-1 mx-1 bg-${props.type.toLowerCase()} rounded-xl font-semibold shadow-sm uppercase`}>
      {props.type}
    </span>
  )
}

function AbilitiesLabel(props: { ability: string }) {
  return (
    <label className="px-3 py-1 mx-1 bg-gray-200 rounded-xl first-letter:uppercase">
      {props.ability}
    </label>
  )
}

const getPokemonPicture = (id: number) => {
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id.toString().padStart(3, '0')}.png`
}

export default function App() {
  const [Data, setPokemon] = useState<pokemonData>();

  useEffect(() => {
    // choose a pokemon randomly
    const pokeID = Math.floor(Math.random() * 1000 + 1);
    const client = new PokemonClient();
    client.getPokemonById(pokeID)
      .then((pokemon) => {
        console.log(pokemon);
        if (pokemon?.types[0].type.name === "dark") {
          window.location.reload();
        }
        setPokemon({
          imageURL: getPokemonPicture(pokeID),
          name: pokemon.name,
          types: pokemon.types.map((type) => type.type.name),
          base_experience: pokemon.base_experience,
          height: pokemon.height,
          weight: pokemon.weight,
          abilities: pokemon.abilities.map((ability) => ability.ability.name),
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  // Return the data
  return (
    <main className={`w-screen h-screen overflow-hidden bg-${Data?.types[0].toLowerCase() || "normal"} bg-opacity-50`}>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center w-96 pb-4 bg-black bg-opacity-10 rounded-xl shadow-xl hover:shadow-2xl">
          <img src={Data?.imageURL} alt={Data?.name} className="w-full border-b rounded-t-xl" />
          <div className="flex flex-row items-center justify-center w-full h-1/2">
            <div className="flex flex-col items-center justify-center w-1/2 h-full">
              <h1 className="text-4xl font-bold mb-2 first-letter:capitalize">
                {Data?.name}
              </h1>
              <div className="flex flex-row items-center justify-center w-full h-1/2">
                {Data?.types.map((type, index) => <TypeLabel type={type} key={index} />)}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-1/2 my-2">
            <div className="flex flex-row items-center justify-center w-full h-1/2">
              <div className="flex flex-col items-center justify-center w-1/3 h-full">
                <h1 className="text-2xl text-center font-bold">Weight</h1>
                <h1 className="text-2xl text-center font-semibold">{Data?.weight}</h1>
              </div>
              <div className="flex flex-col items-center justify-center w-1/3 h-full">
                <h1 className="text-2xl text-center font-bold">Height</h1>
                <h1 className="text-2xl text-center font-semibold">{Data?.height}</h1>
              </div>
              <div className="flex flex-col items-center justify-center w-1/3 h-full">
                <h1 className="text-2xl text-center font-bold">Base XP</h1>
                <h1 className="text-2xl text-center font-semibold">{Data?.base_experience}</h1>
              </div>
            </div>

            {/* Abilities  */}
            <div className="flex flex-row items-center justify-center w-full h-1/2">
              <div className="flex flex-col items-center justify-center w-full h-full">
                <h1 className="text-2xl font-bold">Abilities</h1>
                <div className="flex flex-row items-center justify-center w-full h-full">
                  {Data?.abilities.map((ability, index) => <AbilitiesLabel ability={ability} key={index} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SpeedInsights />
    </main>
  )
}
