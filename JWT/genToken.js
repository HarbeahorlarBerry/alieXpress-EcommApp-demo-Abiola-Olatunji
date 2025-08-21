<<<<<<< HEAD
import  sign  from "jsonwebtoken"


const getToken = (userId) => { 
    return sign({userId}, process.env.JWT_SECRET, {expiresIn: "1m"})
}

=======
import  sign  from "jsonwebtoken"


const getToken = (userId) => { 
    return sign({userId}, process.env.JWT_SECRET, {expiresIn: "1m"})
}

>>>>>>> 0d63b00672bda2fa831c980a89e1892c9c48ad22
export default getToken