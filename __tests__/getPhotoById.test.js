const app = require("../src/bin/app");
const request = require("supertest");
const {User, Photo} = require("../db/models");
const {generateToken} = require("../src/lib/jwt");

const credential = {
    username: "mock_username",
    email: "mock@email.com",
    password: "mock_password"
}

describe('API get photo by id', () => {
    let token;
    let trueId;
    beforeAll(async () => {
        const resUser = await User.create(credential);
        token = generateToken(resUser.getDataValue("id"));
        const resPhoto = await Photo.create({
            title: "photo 1",
            caption: "ini photo 1",
            image_url: "photo1.png"
        });
        trueId = resPhoto.getDataValue("id");
    });
    it('should response success', (done) => {
        request(app)
            .get(`/photo/${trueId}`)
            .set("authorization", token)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty("id")
                expect(res.body).toHaveProperty("title")
                expect(res.body).toHaveProperty("caption")
                expect(res.body).toHaveProperty("image_url")
                expect(res.body.id).toEqual(trueId)
                done();
            });
    });
    it('should response error because not authenticated', (done) => {
        request(app)
            .get(`/photo/${trueId}`)
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toStrictEqual({});
                done();
            });
    });
    it('should response error because not found', (done) => {
        request(app)
            .get(`/photo/${trueId+1000}`)
            .set("authorization", token)
            .expect(404)
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