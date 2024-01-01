import { useEffect, useState } from 'react'
import { PokemonClient } from 'pokenode-ts';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import pokemonData from './types.ts';
import Card from './Card.tsx';
import { GridLoader } from 'react-spinners';

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
    <main className={`w-screen h-screen p-0 m-0 overflow-hidden bg-${Data?.types[0].toLowerCase() || "normal"} bg-opacity-50 flex flex-col items-center justify-center`}>
      {
        Data ? <Card Data={Data} /> : <GridLoader color='#FFCB05' speedMultiplier={0.75} />
      }
      <Analytics />
      <SpeedInsights />
    </main>
  )
}
