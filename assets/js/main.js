// Initialize Firebase
var config = {
  apiKey: "AIzaSyAAZxdI1B3A8c3RPZiG8gqjk4zwCeza4wA",
  authDomain: "rps-mp-e274f.firebaseapp.com",
  databaseURL: "https://rps-mp-e274f.firebaseio.com",
  projectId: "rps-mp-e274f",
  storageBucket: "rps-mp-e274f.appspot.com",
  messagingSenderId: "575598420973"
};
firebase.initializeApp(config)
var database = firebase.database().ref()

var playerID
var enemyID
var gameIsActive // always updating, true when two players exist in db, false otherwise

$(document).ready(function() {
  // Set name to previously entered name
  $("#nickNameField").val(localStorage.getItem("playerID"))

  $("#userIDSubmission").submit(function(event) {
    event.preventDefault()
    if ($("#nickNameField").val().trim().length > 3) {
      playerID = $("#nickNameField").val().trim()
      localStorage.setItem('playerID', playerID)
      if (setPlayerInDatabase(playerID)) {
        $("#userIDSubmission").hide()
      } else {
        console.log("Room full")
      }
    }
  })

  // if game is active and p1 clicks rock/paper/scissors set it as p1 weapon
  // if game is active and p2 clicks rock/paper/scissors set it as p2 weapon
  // if both players have set their weapons, get their weapons and submit it to rps(p1, p2)
  // give points to whoever wins in database, wait 5 seconds, clear weapon field

  // if user has not made a decision in 60 seconds or if they click leave game button, clear player from database to allow space for someone else
})

// Constantly checking to see whether someone is already playing
database.on("value", function(snapshot) {
  if (snapshot.val().player1 !== "nil" && snapshot.val().player2 !== "nil") {
    gameIsActive = true
  }
  gameIsActive ? $("#gameView").show() : $("#gameView").hide()

  $("#playerTitle").text(snapshot.val().player1) // TODO update depending who user is playing
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code)
})

function setPlayerInDatabase(playerName) {
  // Look for a spot to place the player in
  database.once("value").then(function(snapshot) {
    // if player1 doesn't exist, put playerName there
    if (snapshot.val().player1 === "nil") {
      database.update({
        player1: playerName
      })
      return true
    }
    // if player 2 doesn't exist, put playerName there
    if (snapshot.val().player2 === "nil") {
      database.update({
        player2: playerName
      })
      return true
    }
  })
  // if we can't put the player in a slot,
  return false
}

function rps(p1, p2) {
  if (p1 == p2) {
    return 'draw'
  }
  if ((p1 == 's' && p2 == 'p') || (p1 == 'p' && p2 == 'r') || (p1 == 'r' && p2 == 's')) {
    return 'p1'
  }
  return 'p2'
}
