const path=require("path")
const CustomError=require("../error/")

const  uploadContactImage=async(req,res)=>{
    try {
        const image=req.files.image
        if (!req.files) {
            throw new CustomError.BadRequestError('No File Uploaded');
          }
      if (!image.mimetype.startsWith('image')) {
            console.log("sdfff")
            throw new CustomError.BadRequestError('Please Upload Image');
          }
          const maxSize = 1024 * 1024;
          if (image.size > maxSize) {
            throw new CustomError.BadRequestError('Please upload image smaller 1MB');
          }
        const imgpath=path.join(__dirname,"../public/"+image.name)

        image.mv(imgpath)
        
        res.status(200).json({image:`/${image.name}`})
    } catch (error) {
        
        res.status(500).json({msg:" Internal server Error"})
    }
    

}
module.exports=uploadContactImage