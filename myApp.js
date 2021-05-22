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

const createAndSavePerson = (done) => {
    var myPerson = new Person({name: "Charlie Brown", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
     
     myPerson.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)});
};


//creating multiple db instances at once 
var arrayofPeople = [{name: "Mac Donald", age: 80, favoriteFoods: ["pizza", "fish", "fresh fruit"]},
   {name: "Snoop Dogg", age: 4, favoriteFoods: ["eggs", "fish", "chips"]},
   {name: "Charlie Mean", age: 32, favoriteFoods: ["eggs", "pizza", "onions"]}];
       


//create and save a model record instance
const createManyPeople = (arrayofPeople, done) => {

     Person.create(arrayofPeople,function(err, people){
    if (err) return console.error(err);
    done(null, people)
    });
  
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
