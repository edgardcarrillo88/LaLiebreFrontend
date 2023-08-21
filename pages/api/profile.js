import { verify } from "jsonwebtoken"

export default function profileHandler(req,res) {

    const {MyTokenName} =  req.cookies

    
    try {
        const user = verify(MyTokenName,process.env.NEXT_PUBLIC_secrettoken)//este secret viene del jsw.sign, este secret puede ser una variable de entorno
        console.log(user);
        return(
            res.json({
                user:user.username,
                email:user.email
            })
        )
    } catch (error) {
        return res.status(401).json({error:"Token invalido"})
    }

    
};
