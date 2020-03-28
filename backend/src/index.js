const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express ()

app.use(cors())
// app.use(cors({
//     origin: '192.168.0.21'
// }))
app.use(express.json())
app.use(routes )

app.listen(3333, () => console.log('> Server running on port 3333'))