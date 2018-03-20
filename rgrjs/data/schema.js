import {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql'
import { resolve } from 'url';

import {
    connectionDefinitions,
    connectionArgs,
    connectionFromPromisedArray,
    globalIdField,
    mutationWithClientMutationId
} from 'graphql-relay'

let Schema = (db) => {

    let store = {}

    let linkType = new GraphQLObjectType({
        name: 'Link',
        fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLID),
                resolve: (r) => r._id
            },
            title: { type: GraphQLString },
            url: { type: GraphQLString },
        })
    })

    let linkConnection = connectionDefinitions({
        name: 'link',
        nodeType: linkType,
    })

    let storeType = new GraphQLObjectType({
        name: 'Store',
        fields: () => ({
            id: globalIdField("Store"),
            linkConnection: {
                type: linkConnection.connectionType,
                args: connectionArgs,
                resolve: (_, args) => connectionFromPromisedArray(
                    db.collection('links').find({}).toArray(),
                    args)
            },
        })
    })

    let createLinkMutation = new mutationWithClientMutationId({
        name: 'CreateLink',
        inputFields: {
            title: { type: GraphQLNonNull (GraphQLString)},
            url: { type: GraphQLNonNull (GraphQLString)},
        },
        outputFields: {
            linkEdge: {
                type: linkConnection.edgeType,
                resolve: (obj) => ({node: obj.ops[0], cursor: obj.insertedId})
            },
            store: {
                type: storeType,
                resolve: () => store
            }
        },
        mutateAndGetPayload: ({title, url}) => 
            db.collection('links').insertOne({title, url})
        
    })

    let schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                store: {
                    type: storeType,
                    resolve: () => store
                }
            })
        }),

        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: () => ({
                createLink: createLinkMutation
            })
        })
    })
    return schema
}

export default Schema

