// Initialize Firebase
var config = {
  apiKey: "AIzaSyAAZxdI1B3A8c3RPZiG8gqjk4zwCeza4wA",
  authDomain: "rps-mp-e274f.firebaseapp.com",
  databaseURL: "https://rps-mp-e274f.firebaseio.com",
  projectId: "rps-mp-e274f",
  storageBucket: "rps-mp-e274f.appspot.com",
  messagingSenderId: "575598420973"
};
firebase.initializeApp(config);
database = firebase.database();

var playerID;
var enemyID;
var gameIsActive;

$(document).ready(function() {
  // Constantly checking to see whether someone is already playing
  database.ref().on("value", function(snapshot) {
    gameIsActive = snapshot.val().gameIsActive;
    gameIsActive ? $("#gameView").show() : $("#gameView").hide();
  });
  // If user has previously set a playerID in localStorage, set name field
  if (localStorage.getItem("playerID") !== null) {
    $("#nickNameField").val(playerID);
  }

  $("#userIDSubmission").submit(function(event) {
    event.preventDefault();
    var nameInField = $("#nickNameField").val().trim();
    if (nameInField !== "" && nameInField.length > 3 && !gameIsActive) {
      playerID = nameInField;
      localStorage.setItem('playerID', playerID);
      $("#playerTitle").text(playerID);
      $("#userIDSubmission").hide();
    }
  })
})

function rps(p1, p2) {
  if (p1 == p2) {
    return 'draw';
  }
  if ((p1 == 's' && p2 == 'p') || (p1 == 'p' && p2 == 'r') || (p1 == 'r' && p2 == 's')) {
    return 'p1';
  } else {
    return 'p2';
  }
}
