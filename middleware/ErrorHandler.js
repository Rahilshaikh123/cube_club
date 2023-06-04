const errorHandlerMIddleware=(err,req,res,next)=>{
    const errObj={
        message:err.message,
        statusCode:err.statusCode||500
    }
    
    res.status(errObj.statusCode).json({message:errObj.message})

    
}
module.exports=errorHandlerMIddleware