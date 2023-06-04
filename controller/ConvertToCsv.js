const fs=require("fs")
const path=require("path")
const {Contacts,PhoneNumbers}=require("../model/Contectmodel")
const createCsvWriter = require('csv-writer').createObjectCsvWriter;



const exportToCsv=async(req,res)=>{
    const contact=await Contacts.findAll( {include:[{
        model:PhoneNumbers,
        attributes:['number',"ContactId"]
    
    }]})
    if(!contact){
        res.status(404).json({message:"Contact is empty"})
    }
    const pathjoin=path.join(__dirname,'../export_to_csv/contacts.csv')
    const csvWriter = createCsvWriter({
        path:pathjoin,              //'../export_to_csv/contacts.csv',
        header: [
          { id: 'name', title: 'Name' },
          { id: 'phoneNumber', title: 'PhoneNumbers' }
        ]
      });

    const csvobj=contact.map(item=>({
        name:item.name,
        phoneNumber:item.PhoneNumbers.map(items=>
            items.number
        ).join(",")
    }))

    await csvWriter.writeRecords(csvobj)
   

    res.status(200).json({msg:"Exported data"})
}
module.exports=exportToCsv