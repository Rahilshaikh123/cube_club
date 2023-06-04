const db=require("./DbConnection")
const {sequelize,DataTypes}=db;

Contacts=sequelize.define("Contact",{
    image:{
        type:DataTypes.STRING,
       allowNull:false,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    }
})

PhoneNumbers=sequelize.define("PhoneNumbers",{
    number:{
        type:DataTypes.BIGINT,
        allowNull:false,
        unique:true
    }
},{timestamps:false})

Contacts.hasMany(PhoneNumbers)
PhoneNumbers.belongsTo(Contacts,{
    foreignKey:'ContactId',
})

module.exports={
    Contacts,
    PhoneNumbers
};