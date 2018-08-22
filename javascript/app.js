var config = {
    apiKey: "AIzaSyCU_q3Ncz-m8hl_DiS8RtUr3lUhrh9zsLw",
    authDomain: "trainschedule2018-3d9a7.firebaseapp.com",
    databaseURL: "https://trainschedule2018-3d9a7.firebaseio.com",
    projectId: "trainschedule2018-3d9a7",
    storageBucket: "trainschedule2018-3d9a7.appspot.com",
    messagingSenderId: "1087583113643"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
   // Grabs user input
  
   var trainName = $("#train-name-input").val().trim();
   var destin = $("#destin-input").val().trim();
   var firstTrain = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
   var freq = $("#freq-input").val().trim();

   var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
   console.log(firstTimeConverted);
   

   
   // Creates local "temporary" object for holding train data
   var newTrain = {
    name: trainName,
    destination: destin,
    start: firstTrain,
    frequency: freq
  };

  $("#name").append(trainName);
  $("#dest").append(destin);
  $("#freq").append(freq);

   // Uploads train data to the database
   database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  $("#train-name-input").val("");
  $("#destin-input").val("");
  $("#time-input").val("");
  $("#freq-input").val("");

  var currentTime = moment();
  moment.duration(freq, 'minutes');
  // console.log(moment(firstTrain).diff(moment().format("mm")));
  var min = $("#min").text(currentTime % freq);
  $("#min").append(minAway);
    console.log(min);
    var minAway = freq - min;
    console.log(minAway);
    var nextTrain = moment().add(minAway, "minutes");
    $("#arrive").append(nextTrain);
    console.log(nextTrain);
  
});
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destin = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var freq = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(destin);
    console.log(firstTrain);
    console.log(freq);

  });