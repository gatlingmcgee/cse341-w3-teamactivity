const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const lists = await mongodb
            .getDatabase()
            .db()
            .collection('users')
            .find()
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    //#swagger.tags=['Users']
    // const result = await mongodb.getDatabase().db().collection('users').find();
    // result.toArray().then((users) => {
    //     res.setHeader('Content-Type', 'application/json');
    //     res.status(200).json(users);
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id); // Convert id string to ObjectId
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('users')
            .findOne({ _id: userId }); // Use findOne instead of find for a single document

        if (!result) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

    //#swagger.tags=['Users']
    // const userId = new ObjectId(req.params.id);
    // const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    // result.toArray().then((users) => {
    //     res.setHeader('Content-Type', 'application/json');
    //     res.status(200).json(users[0]);
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (result.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error while updating the user');
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error while updateing the user');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error while updateing the user');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}