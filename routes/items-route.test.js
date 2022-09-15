process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app")
let items = require("../fakeDb.js")

let popsicle = { name: "popsicle", price: 1.45 }

beforeEach(function () {
    items.push(popsicle)
})

afterEach(function () {
    items.length = 0
})

describe("GET /items", function () {
    test("Gets a list of items", async function () {
        const resp = await request(app).get("/items");
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({ items: [popsicle] })
    })
})

describe("POST /items", function () {
    test("Creates an item", async function () {
        const resp = await request(app)
            .post('/items')
            .send({ name: "cheerios", price: 3.40 })
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual(
            {
                "name": "cheerios",
                "price": 3.40
            })
    })
})

describe("GET /items/:name", function () {
    test("Gets a single item", async function () {
        const resp = await request(app).get(`/items/${popsicle.name}`)
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({ item: popsicle })
    })
})

describe("PATCH /items/:name", function () {
    test("Updates a single item", async function () {
        const resp = await request(app).patch(`/items/${popsicle.name}`)
            .send({ name: "updated_popsicle", price: 1.00 })
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            item: { name: "updated_popsicle", price: 1.00 }
        })
    })
})


describe("DELETE /items/:name", function () {
    test("Deletes a single item", async function () {
        const resp = await request(app).delete(`/items/${popsicle.name}`)
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" })
    })
})