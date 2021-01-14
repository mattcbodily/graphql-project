import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_NAME, DELETE_POKEMON } from '../GraphQL/Mutations';
import { GET_POKEMON } from '../GraphQL/Queries';
import { Button } from '../styles/AppStyles';

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
        <section className='pokemon'>
            <img src={props.pokemon.image} alt={props.pokemon.name} />
            {editView
            ? (
                <>
                    <input value={newName} onChange={e => setNewName(e.target.value)}/>
                    <Button onClick={changeName}>Submit</Button>
                    <Button delete onClick={() => setEditView(false)}>Cancel</Button>
                </>
            )
            : (
                <>
                    <p>{props.pokemon.name}</p>
                    <Button onClick={() => setEditView(true)}>Edit</Button>
                    <Button delete onClick={removePokemon}>Delete</Button>
                </>
            )}
        </section>
    )
}

export default Pokedex;