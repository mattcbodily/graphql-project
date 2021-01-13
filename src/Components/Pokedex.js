import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_NAME, DELETE_POKEMON } from '../GraphQL/Mutations';
import { GET_POKEMON } from '../GraphQL/Queries';

const Pokedex = props => {
    const [newName, setNewName] = useState(''),
          [editView, setEditView] = useState(false);

    const [editName, {error}] = useMutation(EDIT_NAME),
          [deletePokemon, {error2}] = useMutation(DELETE_POKEMON);

    const changeName = () => {
        editName({
            variables: {
                name: newName,
                id: props.pokemon.id
            },
            refetchQueries: [{query: GET_POKEMON}]
        })

        if(error){
            console.log(error)
        }

        setEditView(false);
    }

    const removePokemon = () => {
        deletePokemon({
            variables: {
                id: props.pokemon.id
            },
            refetchQueries: [{query: GET_POKEMON}]
        })

        if(error2){
            console.log(error2)
        }
    }

    return (
        <section>
            <img src={props.pokemon.image} alt={props.pokemon.name} height='100'/>
            {editView
            ? (
                <>
                    <input value={newName} onChange={e => setNewName(e.target.value)}/>
                    <button onClick={changeName}>Submit</button>
                    <button onClick={() => setEditView(false)}>Cancel</button>
                </>
            )
            : (
                <>
                    <p>{props.pokemon.name}</p>
                    <button onClick={() => setEditView(true)}>Edit</button>
                    <button onClick={removePokemon}>Delete</button>
                </>
            )}
        </section>
    )
}

export default Pokedex;