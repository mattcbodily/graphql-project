import { useMutation } from '@apollo/client';
import { ADD_POKEMON } from '../GraphQL/Mutations';
import { GET_POKEMON } from '../GraphQL/Queries';

const WildPokemon = props => {
    const [addPokemon, {error}] = useMutation(ADD_POKEMON);

    const catchPokemon = () => {
        addPokemon({
            variables: {
                name: props.pokemon.name,
                image: props.pokemon.sprites.front_default
            },
            refetchQueries: [{query: GET_POKEMON}]
        })

        if(error){
            console.log(error)
        }

        props.getWildPokemon();
    }

    return (
        <section onClick={catchPokemon}>
            <img src={props.pokemon.sprites.front_default} alt={props.pokemon.name}/>
            <p>{props.pokemon.name}</p>
        </section>
    )
}

export default WildPokemon;