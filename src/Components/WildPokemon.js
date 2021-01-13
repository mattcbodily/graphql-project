const WildPokemon = props => {
    return (
        <section>
            <img src={props.pokemon.sprites.front_default} alt={props.pokemon.name}/>
            <p>{props.pokemon.name}</p>
        </section>
    )
}

export default WildPokemon;