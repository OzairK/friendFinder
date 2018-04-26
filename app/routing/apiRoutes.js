// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  app.post("/api/friends", function(req,res){
    var newUser = req.body;
    res.json(findBuddy(newUser));
    addUser(newUser)   
  })
};

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


