const express=require("express")
const router=express.Router()
const {
    createContact,
    deleteContact,
    fetchALLContact,
    searchContact,
    updateContact
}=require("../controller/ContactController")

const uploadContactImage=require("../controller/UploadImage")
const exportToCsv = require("../controller/ConvertToCsv")

router.route("/")
.post(createContact)
.get(fetchALLContact)

router.post("/image",uploadContactImage)
router.get("/search",searchContact)
router.get("/exportcsv",exportToCsv)


router.route("/:id")
.delete(deleteContact)
.patch(updateContact)

module.exports=router