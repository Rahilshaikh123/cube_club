
const {Sequelize,Model,DataTypes}=require("sequelize")

const dbname="Contact";
const username=process.env.USER_NAME;
const password=process.env.PASSWORD;
    const sequelize = new Sequelize(dbname, username, password, {
    host: 'localhost',
    port:"3306",
    dialect: "mysql"
  });

  
const db={};
db.sequelize=sequelize;
db.Sequelize=Sequelize;
db.Model=Model;
db.DataTypes=DataTypes;


module.exports=db;