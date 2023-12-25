import { useEffect, useState } from 'react'
import { PokemonClient } from 'pokenode-ts';

type pokemonData = {
  imageURL: string;
  name: string;
  types: string[];
  base_experience: number;
  height: number;
  abilities: string[];
}


function TypeLabel(props: { type: string }) {
  console.log(props.type)
  return (
    <span className={`px-2 py-1 mx-1 bg-${props.type.toLowerCase()} rounded-md border shadow-sm`}>
      {props.type}
    </span>
  )
}

const getPokemonPicture = (id: number) => {
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id.toString().padStart(3, '0')}.png`
}

export default function App() {
  const [Data, setPokemon] = useState<pokemonData>();

  useEffect(() => {
    // choose a pokemon randomly
    const pokeID = Math.floor(Math.random() * 250 + 1);
    const client = new PokemonClient();
    client.getPokemonById(pokeID)
      .then((pokemon) => {
        setPokemon({
          imageURL: getPokemonPicture(pokeID),
          name: pokemon.name,
          types: pokemon.types.map((type) => type.type.name),
          base_experience: pokemon.base_experience,
          height: pokemon.height,
          abilities: pokemon.abilities.map((ability) => ability.ability.name)
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  // Return the data
  return (
    <main className={`w-screen h-screen overflow-hidden bg-${Data?.types[0].toLowerCase() || "normal"} bg-opacity-75`}>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center w-96 pb-4 bg-black bg-opacity-10 rounded-xl shadow-xl hover:shadow-2xl">
          <img src={Data?.imageURL} alt={Data?.name} className="w-full border-b rounded-t-xl" />
          <div className="flex flex-row items-center justify-center w-full h-1/2">
            <div className="flex flex-col items-center justify-center w-1/2 h-full">
              <h1 className="text-4xl font-bold mb-2">{Data?.name}</h1>
              <div className="flex flex-row items-center justify-center w-full h-1/2">
                {Data?.types.map((type, index) => <TypeLabel type={type} key={index} />)}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-1/2">
            <div className="flex flex-row items-center justify-center w-full h-1/2">
              <div className="flex flex-col items-center justify-center w-1/2 h-full">
                <h1 className="text-2xl text-center font-bold">Base Experience</h1>
                <h1 className="text-2xl text-center font-semibold">{Data?.base_experience}</h1>
              </div>
              <div className="flex flex-col items-center justify-center w-1/2 h-full">
                <h1 className="text-2xl text-center font-bold">Height</h1>
                <h1 className="text-2xl text-center font-semibold">{Data?.height}</h1>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center w-full h-1/2">
              <div className="flex flex-col items-center justify-center w-full h-full">
                <h1 className="text-2xl font-bold">Abilities</h1>
                <div className="flex flex-row items-center justify-center w-full h-full">
                  {Data?.abilities.map((ability, index) => <label key={index} className="px-2 py-1 mx-1 bg-gray-200 rounded-xl">{ability}</label>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
