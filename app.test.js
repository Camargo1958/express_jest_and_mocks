import request from 'supertest'
import app from './app.js'

describe("POST /users", () => {

    describe("given a username and password", () => {
        // should save the username and password to the database
        // should respond a json object containg the user id
        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "password"
            })
            expect(response.statusCode).toBe(200)
        })

        test("should specify json in the content type header", async() => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "password"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

        test("response has userId", async () => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "password"
            })
            expect(response.body.userId).toBeDefined()
        })
    })

    describe("when the username and password is missing", () => {
        test("should repond with a status code of 400", async () => {
            const bodyData = [
                {username: "username"},
                {password: "password"},
                {}
            ]
            for (const body of bodyData) {
                const response = await request(app).post("/users").send(body)
                expect(response.statusCode).toBe(400)
            }

        })
    })
})