insert into caught_pokemon (
    name,
    image
) values (
    ${name},
    ${image}
)
returning *;