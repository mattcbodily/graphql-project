import { gql } from '@apollo/client';

export const ADD_POKEMON = gql`
    mutation addPokemon (
        $name: String! 
        $image: String!
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

export const EDIT_NAME = gql`
    mutation editName (
        $name: String! 
        $id: Int!
        ) {
        editName(
            name: $name
            id: $id
        ) {
            id
        }
    }
`

export const DELETE_POKEMON = gql`
    mutation deletePokemon (
        $id: Int!
        ) {
        deletePokemon(
            id: $id
        ) {
            id
        }
    }
`