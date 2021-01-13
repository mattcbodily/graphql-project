import { gql } from '@apollo/client';

export const ADD_POKEMON = gql`
    mutation addPokemon ($name: String! $image: String!
    ) {
        addPokemon(
            name: $name
            image: $image
        ) {
            id,
            name,
            image
        }
    }
`