update caught_pokemon
set name = ${name}
where id = ${id}
returning *;