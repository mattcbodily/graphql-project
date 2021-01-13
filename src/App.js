import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
// import Header from './Components/Header';
// import Finder from './Components/Finder';
// import Pokedex from './Components/Pokedex';
import { GET_POKEMON } from './GraphQL/Queries';
import './App.css';

const App = props => {
  const [caughtPokemon, setCaughtPokemon] = useState([]);
  const {error, loading, data} = useQuery(GET_POKEMON)

  useEffect(() => {
    if(data){
      console.log(data)
    }
  }, [data])

  return (
    <div className="App">
      {/* <Header />
      <Finder />
      <Pokedex /> */}
    </div>
  )
}

export default App;