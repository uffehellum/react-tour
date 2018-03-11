import express from 'express'
import {MongoClient} from 'mongodb'
import {MONGO_URL} from './localconfig'

let app = express()
app.use(express.static('public'))
let db;
MongoClient.connect(MONGO_URL, null, (err, client) => {
    if(err) throw err
    app.listen(3000, () => console.log('listening on port 3000'))
    db = client.db('rgrjs')
    // console.log('db.databaseName', db.databaseName)
    // console.log('col.namespace', col.namespace)

    // col.update({b:1}, {b:1}, {upsert:true}, function(err, result) {
    //     console.log('err', err)
    //     console.log('result expect 1:', result)
    //     // client.close()
    // })


    // console.log('connected to mongo', db)
})

app.get('/data/links', (req, res) => {
    const col = db.collection('links')
    col.find({}).toArray((err, links) => {
        if(err) throw err
        res.json(links)
    })
})