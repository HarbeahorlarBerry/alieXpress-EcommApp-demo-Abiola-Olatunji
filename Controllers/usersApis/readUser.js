<<<<<<< HEAD
import User  from "../../Models/usersSchema.js";

// get all users
export const getAllUsers = async (req, res) => {    
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

//getAUser
export const getAUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

//getByqueryParams

export const getByqueryParams = async (req, res) => {
    const { name, price, year } = req.query
    const filter = {}

    if (username) filter.filterusername = name
    if (gmail) filter.gmail = price
    if (gmail) filter.year = year

    try {
        const user = await User.find(filter)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
=======
import User  from "../../Models/usersSchema.js";

// get all users
export const getAllUsers = async (req, res) => {    
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

//getAUser
export const getAUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

//getByqueryParams

export const getByqueryParams = async (req, res) => {
    const { name, price, year } = req.query
    const filter = {}

    if (username) filter.filterusername = name
    if (gmail) filter.gmail = price
    if (gmail) filter.year = year

    try {
        const user = await User.find(filter)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
>>>>>>> 0d63b00672bda2fa831c980a89e1892c9c48ad22
}