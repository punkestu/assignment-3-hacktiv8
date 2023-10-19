const app = require("../src/bin/app");
const request = require("supertest");
const {User, Photo} = require("../db/models");
const {generateToken} = require("../src/lib/jwt");

const credential = {
    username: "mock_username",
    email: "mock@email.com",
    password: "mock_password"
}

describe('API get all photo', () => {
    let token;
    beforeAll(async () => {
        const res = await User.create(credential);
        token = generateToken(res.getDataValue("id"));
        await Photo.create({
            title: "photo 1",
            caption: "ini photo 1",
            image_url: "photo1.png"
        });
        await Photo.create({
            title: "photo 2",
            caption: "ini photo 2",
            image_url: "photo2.png"
        });
        await Photo.create({
            title: "photo 3",
            caption: "ini photo 3",
            image_url: "photo3.png"
        });
    });
    it('should response success', (done) => {
        request(app)
            .get("/photo")
            .set("authorization", token)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.length).toEqual(3);
                done();
            });
    });
    it('should response error because not authenticated', (done) => {
        request(app)
            .get("/photo")
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toStrictEqual({});
                done();
            });
    });
    afterAll(async () => {
        await Photo.destroy({where: {}});
        await User.destroy({where: {}});
    })
});