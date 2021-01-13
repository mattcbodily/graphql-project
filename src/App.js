import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
// import Header from './Components/Header';
// import Finder from './Components/Finder';
import Pokedex from './Components/Pokedex';
import { GET_POKEMON } from './GraphQL/Queries';
import './App.css';

const App = props => {
  const [wildPokemon, setWildPokemon] = useState([]),
        [caughtPokemon, setCaughtPokemon] = useState([]);

  const {error, loading, data} = useQuery(GET_POKEMON)

  useEffect(() => {
    if(data){
      setCaughtPokemon(data.pokemon)
    }
  }, [data])

  console.log(caughtPokemon)

  return (
    <div className="App">
      {caughtPokemon.map(pokemon => (
        <Pokedex 
          key={pokemon.id}
          pokemon={pokemon}/>
      ))}
    </div>
  )
}

export default App;