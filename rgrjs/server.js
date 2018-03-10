// const express = require('express')
import express from 'express'

let app = express()

app.get('/', (req, res) => res.send('Hallo'))

app.listen(3000)