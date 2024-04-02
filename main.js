prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90,
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/DLA7ACPot/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if (results[0].label == "Best") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
            document.getElementById("result_gestures _name").innerHTML = "All the best";
        }
        if (results[0].label == "Amazing") {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
            document.getElementById("result_gestures _name").innerHTML = "This is looking amazing";
        }
        if (results[0].label == "Victory") {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
            document.getElementById("result_gestures _name").innerHTML = "That was a marvelous victory";
        }

        if (results[1].label == "Best") {
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
            document.getElementById("result_gestures _name2").innerHTML = "All the best";
        }
        if (results[1].label == "Amazing") {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
            document.getElementById("result_gestures _name2").innerHTML = "This is looking amazing";
        }
        if (results[1].label == "Victory") {
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
            document.getElementById("result_gestures _name2").innerHTML = "That was a marvelous victory";
        }
    }
}