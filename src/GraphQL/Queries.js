import {gql} from '@apollo/client';

export const GET_POKEMON = gql`
    query PokemonQuery {
        pokemon {
            id,
            name,
            image
        }
    }
`