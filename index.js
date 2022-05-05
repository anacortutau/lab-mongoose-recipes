const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title:"Primera receta de Mongo db",
      level: "UltraPro Chef",
      ingredients:["arroz", "leche", "azucar", "canela"],
      cuisine:"España",
      dishType:"dessert",
      duration: 60,
      creator: "Ana y Andrea"

    })

  })
  .then((response)=>{
    console.log(response.title)
    return Recipe.insertMany(data)

    
  })
  .then((response)=>{
    //console.log(response.title)
    return Recipe.find().select("title")
  })
  .then((response)=>{
    console.log(response)
    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration: 100},{new:true})
  })
  .then((response)=>{
    console.log(response)
    return Recipe.findOneAndDelete({title: "Carrot Cake"})
  })
  .then((response)=>{
    console.log("Receta borrada")
    return mongoose.connection.close()  
  })
  .then((response)=>{
    console.log("Conexion cerrada")
  })
 
  .catch(error => {
    console.error('Error connecting to the database', error);
  })




