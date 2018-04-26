// all friends data is stored in the following file
var friendsData = require("../data/friends");



// ===============================================================================
// ROUTING all api calls
// ===============================================================================

module.exports = function(app) {
  //returns json formated array of friends.js file
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

//finds a match for a friend based on most similar interst, and returns
//the best match
  app.post("/api/friends", function(req,res){
    var newUser = req.body;
    res.json(findBuddy(newUser));
    addUser(newUser)                                      //new user is added after match is provided for them
  })
};

//each of the 10 answers are compared to other users, the one with the least difference
//is matched as the new users buddy
var findBuddy = function(newUser){
  var bestFriend = "";
  var scoreToBeat = 100;
  var photo = ""; 
  
  for(var i = 0; i< friendsData.length; i++){
    var score = 0;
    for(var j = 0; j< friendsData[i].scores.length; j++){
      score += Math.abs((parseInt(newUser.scores[j])-friendsData[i].scores[j]));      }
    if(score< scoreToBeat){
      scoreToBeat=score;
      bestFriend=friendsData[i].name;
      photo = friendsData[i].photo;
    }
  }

  var newFriend = [bestFriend, photo];
  return newFriend;

}

//formats the new user and stores it in the array of current users
var addUser = function(newUser){
  var newUserToAdd ={};
  newUserToAdd.name= newUser.name;
  newUserToAdd.photo= newUser.photo;
  newUserToAdd.scores=[];
  for(var i=0; i< 10; i++){
    newUserToAdd.scores.push(parseInt(newUser.scores[i]));
  }
  friendsData.push(newUserToAdd);
}


