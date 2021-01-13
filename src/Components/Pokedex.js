import {useState} from 'react';

const Pokedex = props => {
    return (
        <section>
            <img src={props.pokemon.image} alt={props.pokemon.name} height='100'/>
            <p>{props.pokemon.name}</p>
        </section>
    )
}

export default Pokedex;