require('dotenv').config();
const mongoose = require('mongoose');


//connect to database 
mongoose.connect(process.env.MONGO_URI);

/*Assign Mongoose Schema to a variable
This is not necessary but will make your code easier to read */
const Schema = mongoose.Schema;


//create schema
const personSchema = new Schema({
name : {type: String, required: true},
age: Number ,
favoriteFoods: [String]
});

// create person model from schema
const Person = mongoose.model("Person", personSchema);

//individual entry 
var myPerson = new Person({name: "Charlie Brown", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
     
const createAndSavePerson = (done) => {
     myPerson.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)});
};
       
//multiple entries
var arrayofPeople = [{name: "Mac Donald", age: 80, favoriteFoods: ["pizza", "fish", "fresh fruit"]},
   {name: "Snoop Dogg", age: 4, favoriteFoods: ["eggs", "fish", "chips"]},
   {name: "Charlie Mean", age: 32, favoriteFoods: ["eggs", "pizza", "onions"]}];

const createManyPeople = (arrayofPeople, done) => {

     Person.create(arrayofPeople,function(err, people){
    if (err) return console.error(err);
    done(null, people)
    });
  
};

//searching using model.find() method
const findPeopleByName = (personName, done) => {

  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
    });
};

//Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food},function (err,data){
    if (err) return console.log(err);
    done(null , data);
  });
};

const findPersonById = (personId, done) => {
  
  Person.findById(personId,
  function(err,data){
    if(err) return console.log(err);
    done(null , data);
    });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId,(err,person) =>{
  
  if(err)return console.log(err);

  //this is where the addition happens 
  person.favoriteFoods.push(foodToAdd);

  // and inside the find callback - save() the updated Person.
  person.save((err,updatedPerson)=> {

    if(err) return console.log(err);
      done(null , updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    {new: true},
    (err,updatedDoc)=>{

    if(err) return console.log(err);
      done(null , updatedDoc);
  })
};

const removeById = (personId, done) => {
  
  Person.findByIdAndRemove(personId,(err,removedDoc) => {
  if (err) return console.log(err);
  done(null , removedDoc);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove},(err,response)=>{
  if(err) return console.log(err);
  done(null , response);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age:0}).exec((err,response)=>{
    if(err) return console.log(err);
      done(null , response);
  });

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
