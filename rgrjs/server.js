// const express = require('express')
import express from 'express'

let app = express()
app.use(express.static('public'))
// app.get('/', (req, res) => res.send('Hallo Verden 2!'))

app.listen(3000)