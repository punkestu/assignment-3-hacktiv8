const {Photo} = require("../../db/models");

module.exports = {
    createPhoto: async (req, res) => {
        const {name, caption, image_url} = req.body;
        try {
            await Photo.create({name, caption, image_url});
            res.sendStatus(201);
        } catch (err) {
            res.sendStatus(500);
        }
    },
    getAllPhoto: async (req, res) => {
        try {
            const photos = await Photo.findAll({where: {}});
            res.json(photos);
        } catch (err) {
            res.sendStatus(500);
        }
    },
    getPhotoById: async (req, res) => {
        const {id} = req.params;
        try {
            const photo = await Photo.findOne({where: {id: id}});
            if (!photo) {
                throw {code: 404}
            }
            res.json(photo);
        } catch (err) {
            res.sendStatus(err.code || 500);
        }
    }
}