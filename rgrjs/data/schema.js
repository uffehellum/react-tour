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
    connectionFromPromisedArray
} from 'graphql-relay'

let Schema = (db) => {

    let data = [
        { _id: 'a1', title: 'title', url: 'http://url.com' },
        { _id: 'a2', title: 'title 2', url: 'http://url2.com' },
    ]

    function getLinks(db) {
        const col = db.collection('links')
        col.find({}).toArray((err, links) => {
            if(err) throw err
            res.json(links)
        })
    }

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
            linkConnection: {
                type: linkConnection.connectionType,
                args: connectionArgs,
                resolve: (_, args) => connectionFromPromisedArray(
                    db.collection('links').find({}).toArray(),
                    args)
            },
        })
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
        })
    })
    return schema
}

export default Schema
