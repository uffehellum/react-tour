import fs from 'fs'
import express from 'express'
import Schema from './data/schema'
import GraphQLHTTP from 'express-graphql'
import {MongoClient} from 'mongodb'
import {MONGO_URL} from './localconfig'
import {graphql} from 'graphql'
import {introspectionQuery} from 'graphql/utilities'

(async () => {
    let client = await MongoClient.connect(MONGO_URL)
    let db = client.db('rgrjs')
    let schema = Schema(db)
    let app = express()
    app.use(express.static('public'))
    app.use('/graphql', GraphQLHTTP({
        schema,
        graphiql: true,
    }))
    app.listen(3000, () => console.log('Lytter på port 3000'))
    // generate schema.json
    let json = await graphql(schema, introspectionQuery)
    fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2))
})()
