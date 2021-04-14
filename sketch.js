var detector; 
var myVid; 
var objResults = [];
var redbox; 
var thetext; 

var buttonGuess, buttonYes, buttonNo, filterBtn; 
var timerValue = 3;
var score = 0; 


function preload(){
    detector = ml5.objectDetector('cocossd');
}

function setup(){
    createCanvas(windowWidth, windowHeight); 
    // background(0);
    myVid = createCapture(VIDEO, videoLoaded); 
    buttonGuess = select("#guess");
    buttonYes = select("#yes"); 
    buttonNo = select("#no"); 
    filterBtn = select("#filters");
    // invertBtn = select("#invert");
    // grayBtn = select("#gray");  
    // posterizeBtn = select("#posterize");
    // blurBtn = select("#blur");  

    buttonGuess.mousePressed(detectObj);
    buttonYes.mousePressed(upScore); 
    buttonNo.mousePressed(downScore); 
    // invertBtn.mousePressed(changeFilter('INVERT'));   
    // grayBtn.mousePressed(changeFilter('GRAY')); 
    // posterizeBtn.mousePressed(changeFilter('POSTERIZE')); 
    // blurBtn.mousePressed(changeFilter('BLUR')); 

    filterModes = [
        INVERT,
        GRAY,
        POSTERIZE,
        BLUR
      ];
    
    index = 0; 
    currfilterMode = filterModes[index]; 
    filterBtn.mousePressed(changeFilter); 

}


function videoLoaded(){
myVid.size(640, 480); 
myVid.hide(); 
}

function upScore(){
    score += 1; 
    console.log(score); 

 
}
function downScore(){
    score -= 1; 
    console.log(score);
}

function draw(){
    // background("black"); 
    image(myVid, windowWidth/2.75, 150, 700, 480);
  
    
    
    filter(currfilterMode, 10);

    fill("white");
    noStroke();
    rect(windowWidth/2.75, 115, 200, 60); 
    textSize(24); 
    strokeWeight(1); 
    noStroke(); 
    fill("black"); 
    text("Score:  " + score, windowWidth/2.75 + 20, 140);
  

    for(var i=0; i<objResults.length; i++){
        var obj = objResults[i];
        //bounding box
        stroke(250, 0, 0); 
        // console.log("write");
        strokeWeight(4); 
        noFill(); 
        redbox = rect(obj.x + windowWidth/2.75, obj.y + 150, obj.width, obj.height);
        //label
        stroke(255, 0, 0); 
        strokeWeight(1); 
        fill(255, 0, 0);
        textSize(24); 
        thetext = text(obj.label, obj.x + 10 + windowWidth/2.75, obj.y + 135);
    }
}

function changeFilter(){
    if(index < filterModes.length - 1){
        index++; 
    } else{
        index= 0; 
    }
    currfilterMode = filterModes[index]; 
}


function detectObj(){

        //you only need to call this when the guess button is pressed
        detector.detect(myVid, objsIDed); 

        function objsIDed(error, results){
            if(error){
                console.error(error); 
            } else{
                objResults = results; 
                //function calling itself
                detector.detect(myVid, objsIDed);
            }
            // console.log(objResults);
        }
        
}
