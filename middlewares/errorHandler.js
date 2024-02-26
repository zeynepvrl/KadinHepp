const errorHandler=(error , req,res,next)=>{                      //bunun bütün yerde çalışması için index.js de app.use ile yazmamız lazım
    res.status(500).json({error})
}

export {errorHandler}