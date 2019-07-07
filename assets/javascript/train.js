// firebase config

var config = {
    apiKey: "AIzaSyAd7nX4nwo7Y4lAkVggS5kSJjkGv2LiDHY",
    authDomain: "train-homework-ad42d.firebaseapp.com",
    databaseURL: "https://train-homework-ad42d.firebaseio.com",
    projectId: "train-homework-ad42d",
    storageBucket: "",
    messagingSenderId: "182060293125",
    appId: "1:182060293125:web:b87932c754951b6c"
};

firebase.initializeApp(config);

var database = firebase.database();

// button for adding train time 

$("#add-train-btn").on("click", function(event){
 event.preventDefault();

 //  getting users input
 var trainName = $("#train-name-input").val().trim();
 var destination = $("#destination-input").val().trim();
 var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
 var frequency = $("#frequency-input").val().trim();

 //  object for firebase 
 var newTrain = {
    train: trainName,
    destination: destination,
    time: trainTime,
    frequency: frequency
 };

 //  Puts new data
 database.ref().push(newTrain);

//  logging into the console
 console.log(newTrain.train);
 console.log(newTrain.destination);
 console.log(newTrain.time);
 console.log(newTrain.frequency);

 alert("Train has been successfully added!")

 $("#train-name-input").val("");
 $("#destination-input").val("");
 $("#time-input").val("");
 $("#destination-input").val("");
});

// 3. adding into firebase the info 
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // store everything into a variable 
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(destination);
    console.log(time);
    console.log(frequency);


    var difference = moment().diff(moment(time), "minutes");
    console.log(difference);

    var nextTrain = moment().add(minUntil, "minutes").format('LT');
    console.log(minLeft);

    var timePretty = moment.unix(time).format("HH:mm");

    var nextTrain = moment(timePretty).add(frequency, "minutes");
    var minLeft = moment().diff(nextTrain, "minutes")
    console.log(minLeft);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minLeft),
    );

    $("#train-table > tbody").append(newRow);



});