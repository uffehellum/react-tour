import express from 'express'
import schema from './data/schema'
import GraphQLHTTP from 'express-graphql'
import {MongoClient} from 'mongodb'
import {MONGO_URL} from './localconfig'

let app = express()
app.use(express.static('public'))

app.use('/graphql', GraphQLHTTP({
    schema,
    graphiql: true,
}))

let db;
MongoClient.connect(MONGO_URL, null, (err, client) => {
    if(err) throw err
    app.listen(3000, () => console.log('listening on port 3000'))
    db = client.db('rgrjs')
})

app.get('/data/links', (req, res) => {
    const col = db.collection('links')
    col.find({}).toArray((err, links) => {
        if(err) throw err
        res.json(links)
    })
})