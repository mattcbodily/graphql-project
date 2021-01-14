import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import axios from 'axios';
import Header from './Components/Header';
import WildPokemon from './Components/WildPokemon';
import Pokedex from './Components/Pokedex';
import { GET_POKEMON } from './GraphQL/Queries';
import { FlexSection } from './styles/AppStyles';
import './App.css';

const App = props => {
  const [wildPokemon, setWildPokemon] = useState([]),
        [caughtPokemon, setCaughtPokemon] = useState([]);

  const { error, loading, data } = useQuery(GET_POKEMON)

  const getWildPokemon = () => {
    const pokemonArray = [];
    const rand1 = Math.ceil(Math.random() * 151),
          rand2 = Math.ceil(Math.random() * 151),
          rand3 = Math.ceil(Math.random() * 151);

    axios.get(`https://pokeapi.co/api/v2/pokemon/${rand1}`)
      .then(response => {
        pokemonArray.push(response.data);
        axios.get(`https://pokeapi.co/api/v2/pokemon/${rand2}`)
          .then(response => {
            pokemonArray.push(response.data);
            axios.get(`https://pokeapi.co/api/v2/pokemon/${rand3}`)
              .then(response => {
                pokemonArray.push(response.data);
                setWildPokemon(pokemonArray)
              })
          })
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getWildPokemon()
  }, [])

  useEffect(() => {
    if(error) {
      console.log(error)
    }

    if (data) {
      setCaughtPokemon(data.pokemon)
    }
  }, [data])

  return (
    <div className="App">
      <Header />
      <FlexSection>
        {wildPokemon.map((pokemon, i) => (
          <WildPokemon key={i} pokemon={pokemon} getWildPokemon={getWildPokemon}/>
        ))}
      </FlexSection>
      <h2>Pokedex</h2>
      <FlexSection>
        {caughtPokemon.slice().sort((a,b) => a.id - b.id).map(pokemon => (
          <Pokedex
            key={pokemon.id}
            pokemon={pokemon} />
        ))}
      </FlexSection>
    </div>
  )
}

export default App;