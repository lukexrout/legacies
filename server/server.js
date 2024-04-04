const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({ origin: '*'}))

//ROUTES//

app.post('/contact', async (req, res) => {

    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const phone = req.body.phone
    const type = req.body.type
    const reason = req.body.reason

    try {
        const request = await pool.query(
            'INSERT INTO "contacts" (first_name, last_name, email, phone, type, reason) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [first_name, last_name, email, phone, type, reason])
        res.status(200).send(request.rows)
    } catch (err) {
        res.status(400).send(err.message)
    }

})

// create table "contacts" (date DATE DEFAULT NOW(), first_name varchar(77), last_name varchar(77), email varchar(77), phone varchar(77), type varchar(77), reason varchar(77))

app.listen(4444, () => {console.log('server has started on port 4444')})