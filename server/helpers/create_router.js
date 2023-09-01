const express = require('express')
const ObjectID = require('mongodb').ObjectID

const createRouter = (collection) => {

    const router = express.Router()

    router.get('/', (req, res) => {
        collection
            .find()
            .toArray()
            .then((docs) => res.json(docs))
            .catch((err) => {
                console.error(err)
                res.status(500)
                res.json({ status: 500, error: err })
            })
    })

    router.post('/', (req, res) => {
        const newdata = req.body
        collection
            .insertOne(newdata)
            .then((docs) => {
                res.json(docs.ops[0])
            })
            .catch((err) => {
                console.error(err)
                res.status(500)
                res.json({ status: 500, error: err })
            })
    })

    router.delete('/:id', (req, res) => {
        const id = req.params.id
        collection
            .deleteOne({ _id: ObjectID(id) })
            .then((doc) => res.json(doc))
            .catch((err) => {
                console.error(err)
                res.status(500)
                res.json({ status: 500, error: err })
            })
    })

    return router
}

module.exports = createRouter