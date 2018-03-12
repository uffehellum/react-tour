import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql'

let data = [
    {_id: 'a1', title: 'title', url: 'http://url.com'},
    {_id: 'a2', title: 'title 2', url: 'http://url2.com'},
]

let linkType = new GraphQLObjectType({
    name: 'Link',
    fields: () => ({
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        url: { type: GraphQLString },
    })
})

let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            links: {
                type: new GraphQLList(linkType),
                resolve: () => data,
            },
        })
    })
})

    // mutation: new GraphQLObjectType({
    //     name: 'Mutation',
    //     fields: () => ({
    //         incrementCounter: {
    //             type: GraphQLInt,
    //             resolve: () => ++counter,
    //         }
    //     })
    // })

export default schema
