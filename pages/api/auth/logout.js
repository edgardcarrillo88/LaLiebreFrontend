import { verify } from "jsonwebtoken";
import { serialize } from "cookie"

export default function Handler(req,res) {
    console.log(req);
    const {MyTokenName} = req.cookies

    if(!MyTokenName){
        return(
                res.status(401).json({error: 'No Token'})
            )
    }

    try {
        verify(MyTokenName,process.env.secrettoken)
        const serialized = serialize('MyTokenName',null,{
            httpOnly:true,
            secure:false,
            sameSite:'strict',//none para comunicarse con otro dominio
            MaxAge: 0,
            path: '/'
        })
        res.setHeader('Set-Cookie',serialized)
        return (
            res.json({response:'cierre de sesión exitoso'})
        )
    } catch (error) {
        res.json({error:'token invalido'})
    }
    
};
