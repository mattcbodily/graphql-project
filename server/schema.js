const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLSchema
} = require('graphql')
let dbInstance = null;
const massive = require('massive')
const { CONNECTION_STRING } = process.env;

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    dbInstance = db;
    console.log('db connected');
})

const PokemonType = new GraphQLObjectType({
    name: 'Pokemon',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        image: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        pokemon: {
            type: new GraphQLList(PokemonType),
            resolve(parent, args){
                return dbInstance.get_pokemon()
                        .then(pokemon => pokemon);
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPokemon: {
            type: PokemonType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                image: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                return dbInstance.add_pokemon({name: args.name, image: args.image})
                            .then(pokemon => pokemon[0]);
            }
        },
        editName: {
            type: PokemonType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                return dbInstance.edit_name({name: args.name, id: args.id})
                        .then(pokemon => pokemon[0]);
            }
        },
        deletePokemon: {
            type: PokemonType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                return dbInstance.delete_pokemon({id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})