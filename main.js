song="";

scoreleftWrist=0;
scorerightWrist=0;

rightWristX=0;
rightWristY=0;

leftWristX=0;
leftWristY=0;

function preload(){
   song = loadSound("music.mp3");
}

function setup(){
canvas = createCanvas(400, 400);
canvas.center();

video = createCapture(VIDEO);
video.hide();

posenet = ml5.poseNet(video, modelLoaded);
posenet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Model Loaded!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;

        scoreleftWrist=results[0].pose.keypoints[9].score;
        scorerightWrist=results[0].pose.keypoints[10].score;
    }
}

function draw(){
    image(video, 0, 0, 400, 400);

    fill("#FF0000");
    stroke("#FF0000");

if(scorerightWrist > 0.2){

    circle(rightWristX, rightWristY, 20);

    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "Speed is 0.5x";
        song.rate(0.5);
    }

    else if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "Speed is 1x";
        song.rate(1);
    }

    else if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "Speed is 1.5x";
        song.rate(1.5);
    }

    else if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML = "Speed is 2x";
        song.rate(2);
    }

    else if(rightWristY > 400){
        document.getElementById("speed").innerHTML = "Speed is 2.5x";
        song.rate(2.5);
    }
}

if(scoreleftWrist > 0.2){

    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals / 500;
    document.getElementById("volume").innerHTML = "Volume = " +volume;
    song.setVolume(volume);

}
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}