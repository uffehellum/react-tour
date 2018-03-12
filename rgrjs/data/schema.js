import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql'

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

let linkType = new GraphQLObjectType({
    name: 'Link',
    fields: () => ({
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        url: { type: GraphQLString },
    })
})

let Schema = (db) => {

    let schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                links: {
                    type: new GraphQLList(linkType),
                    resolve: () => db
                        .collection('links')
                        .find({})
                        .toArray()
                },
            })
        })
    })

    return schema
}
export default Schema
