const express = require('express')
const router = new express.Router()
const ExpressError = require('../error')
const items = require("../fakeDb")

router.get("/", function (req, res) {
    res.json({ items })
})

router.post("/", (req, res) => {
    const newItem = { name: req.body.name, price: req.body.price }
    items.push(newItem)
    res.send(req.body)
})

router.get("/:name", (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    res.json({ item: foundItem })
})

router.patch("/:name", (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    foundItem.name = req.body.name
    foundItem.price = req.body.price
    res.json({ item: foundItem })
})

router.delete("/:name", (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    items.splice(foundItem, 1)
    res.json({ message: "Deleted" })
})

module.exports = router