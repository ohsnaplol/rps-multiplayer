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

$(document).ready(function() {
  $("#gameView").hide();
  // If user has previously set a playerID in localStorage, set it again
  if (localStorage.getItem("playerID") !== null) {
    playerID = localStorage.getItem("playerID");
    $("#playerTitle").text(playerID);
    $("#userIDSubmission").hide();
    $("#gameView").show();
  }

  $("#userIdSubmitBtn").on("click", function() {
    if ($("#nickNameField").val().trim() !== "") {
      playerID = $("#nickNameField").val().trim();
      localStorage.setItem('playerID', playerID);
      $("#playerTitle").text(playerID);
      $("#userIDSubmission").hide();
      $("#gameView").show();
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
