import { auth } from "../src/handler"

const dummyBodies = [
    JSON.stringify({
        "email": "aeapgmail.com", // Invalid email formatt: expect 400
        "password": "aeap19980929"
    }),
    JSON.stringify({
        "email": "fake@gmail.com", // Non-existent email: Expect 401
        "password": "aeap19980929"
    }),
    JSON.stringify({
        "email": "aeap@gmail.com", // Invalid password: Expect 401
        "password": "invalidPassword"
    }),
    JSON.stringify({
        "email": "aeap@gmail.com", // Valid credentials: Expect 200
        "password": "aeap19980929"
    })
]

const dummyEvent = {
    body: {}
}

const test = () => {
    dummyBodies.forEach(dummyBody => {
        dummyEvent.body = dummyBody
        auth(dummyEvent, {}).then(res => console.log(res))
    })
}

test()