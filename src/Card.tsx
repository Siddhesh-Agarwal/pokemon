import pokemonData from "./types.ts"

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

export default function Card({ Data }: { Data: pokemonData | undefined }) {
  return (
    <div className="flex flex-col items-center justify-center w-screen md:w-96 pb-4 bg-black bg-opacity-10 rounded-none md:rounded-xl shadow-xl hover:shadow-2xl">
      {/* Image */}
      <img src={Data?.imageURL} alt={Data?.name} className="w-full border-b rounded-t-xl" loading="lazy" />

      {/* Name and Types */}
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

      {/* Stats */}
      <div className="flex flex-col items-center justify-center w-full h-1/2 my-2">
        <div className="flex flex-row items-center justify-center w-full h-1/2">
          <div className="flex flex-col items-center justify-center w-1/3 h-full">
            <h2 className="text-2xl text-center font-bold">Weight</h2>
            <h3 className="text-xl text-center font-semibold">{Data?.weight}</h3>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3 h-full">
            <h2 className="text-2xl text-center font-bold">Height</h2>
            <h3 className="text-xl text-center font-semibold">{Data?.height}</h3>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3 h-full">
            <h2 className="text-2xl text-center font-bold">Base XP</h2>
            <h3 className="text-xl text-center font-semibold">{Data?.base_experience}</h3>
          </div>
        </div>

        {/* Abilities  */}
        <div className="flex flex-row items-center justify-center w-full h-1/2">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-2xl font-bold">Abilities</h2>
            <div className="flex flex-row items-center justify-center w-full h-full">
              {Data?.abilities.map((ability, index) => <AbilitiesLabel ability={ability} key={index} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
