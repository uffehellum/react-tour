import express from 'express'
import Schema from './data/schema'
import GraphQLHTTP from 'express-graphql'
import {MongoClient} from 'mongodb'
import {MONGO_URL} from './localconfig'

(async () => {
    let client = await MongoClient.connect(MONGO_URL)
    // console.log('client', client)
    let db = client.db('rgrjs')
    // console.log('db', db)

    let app = express()
    app.use(express.static('public'))
    app.use('/graphql', GraphQLHTTP({
        schema: Schema(db),
        graphiql: true,
    }))
    app.listen(3000, () => console.log('Lytter på port 3000'))
})()


/*
let db;
MongoClient.connect(MONGO_URL, null, (err, client) => {
    if(err) throw err
    app.listen(3000, () => console.log('listening on port 3000'))
    db = client.db('rgrjs')
    app.use('/graphql', GraphQLHTTP({
        schema: Schema(db),
        graphiql: true,
    }))
    
})
*/
// app.get('/data/links', (req, res) => {
//     const col = db.collection('links')
//     col.find({}).toArray((err, links) => {
//         if(err) throw err
//         res.json(links)
//     })
// })
