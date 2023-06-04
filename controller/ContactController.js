const {Op}=require("sequelize")
const {Contacts,PhoneNumbers}=require("../model/Contectmodel")
const {BadRequestError, NotFoundError}=require('../error')

//CREATE CONTACT
const createContact=async(req,res)=>{
    const {name,image,numbers}=req.body
    console.log(name)
    if(!name||!image||!numbers){
        
        throw new BadRequestError("Please provide proper details")
    }
    const contactexist=await Contacts.findOne({where:{name:name}})
    console.log(contactexist)
    if(contactexist){
        throw new BadRequestError("Contact already exist")
    }

    const contact=await Contacts.create({name,image}) 
    console.log(contact.id)
    for(let items of numbers){
        await PhoneNumbers.create({number:items,ContactId:contact.id})
    }

    res.status(201).json({msg:contact,number:numbers})
}


//DELETE CONTACT
const deleteContact=async(req,res)=>{
    const { id } = req.params;
    const contact = await Contacts.findByPk(id);

    if (!contact) {
      throw new NotFoundError("Cotact does not exist")
    }

    await contact.destroy();

    res.json({ message: 'Contact deleted successfully' });
}

//GET ALL CONTACT
const fetchALLContact=async(req,res)=>{
    const contact=await Contacts.findAll( {include:[{
        model:PhoneNumbers,
        attributes:['number',"ContactId"]
    
    }]})
    if(!contact){
        throw new BadRequestError("Contact list is Empty")
    }

    res.status(200).json({msg:contact})
}

//SEARCH CONTACT
const searchContact=async(req,res)=>{
    const {name,number} =req.query
    if(!name&&!number){
        throw new BadRequestError("please enter name or phonenumber")
    }
    const contact=await Contacts.findAll({
        where:{
            [Op.or]:[
                {name:{[Op.like]:name}},
                {'$PhoneNumbers.number$':{[Op.like]:number}}
            ],
        },
        include:[{
            model:PhoneNumbers,
            attributes:['number',"ContactId"]
        
        }],
    })
    if(!contact){
        throw new NotFoundError("Contact doesNot exist")
    }

    res.status(200).json({msg:contact})
}


//UPDATE CONTACT 
const updateContact=async(req,res)=>{
    const id=req.params.id
    const {name,numbers}=req.body
    if(!id||(!name&&!numbers)){
        throw new BadRequestError("please provide details to update")
    }
    const contact=await Contacts.findByPk(id,{include:[PhoneNumbers]})
    if(!contact){
        throw new NotFoundError("Unable to find contact")
    }

    //IF ONLY NAME HAS TO BE CHANGED
    if(name){
       await contact.update({name}) 
    }

    else{
        //IF NAME AND PHONENUMBER BOTH HAS TO BE CHANGED
        if(name){
            await contact.update({name}) 
         }
        //IF PHONENUMBER HAS TO BE CHANGED
        await PhoneNumbers.destroy({ where: { ContactId: contact.id } });
        for (const phoneNumber of numbers) {
          await PhoneNumbers.create({ number: phoneNumber, ContactId: contact.id });
        }
    }
    res.status(200).json({msg:`Contact updated for ContactName:${contact.name}`})

}
module.exports={
    createContact,
    deleteContact,
    fetchALLContact,
    searchContact,
    updateContact,
}