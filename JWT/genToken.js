import  sign  from "jsonwebtoken"


const getToken = (userId) => { 
    return sign({userId}, process.env.JWT_SECRET, {expiresIn: "1m"})
}

export default getToken