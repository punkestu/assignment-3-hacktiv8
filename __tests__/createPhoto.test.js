const app = require("../src/bin/app");
const request = require("supertest");
const {User, Photo} = require("../db/models");
const {generateToken} = require("../src/lib/jwt");

const credential = {
    username: "mock_username",
    email: "mock@email.com",
    password: "mock_password"
}

describe('API create photo', () => {
    let token;
    beforeAll(async () => {
        const res = await User.create(credential);
        token = generateToken(res.getDataValue("id"));
    });
    it('should response success', (done) => {
        request(app)
            .post("/photo")
            .set("authorization", token)
            .send({
                title: "photo 1",
                caption: "ini photo 1",
                image_url: "photo1.png"
            })
            .expect(201)
            .end((err, _) => {
                if (err) return done(err);
                done();
            });
    });
    it('should response error because not authenticated', (done) => {
        request(app)
            .post("/photo")
            .send({
                title: "photo 1",
                caption: "ini photo 1",
                image_url: "photo1.png"
            })
            .expect(401)
            .end((err, _) => {
                if (err) return done(err);
                done();
            });
    });
    afterAll(async () => {
        await Photo.destroy({where: {}});
        await User.destroy({where: {}});
    })
});