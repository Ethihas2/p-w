status = false;
objects = []

function preload(){

}

function setup(){
    webcam = createCapture(VIDEO)
    webcam.hide()   
    canvas = createCanvas(680,520)
    canvas.center();
}

function modelLoaded(){
    
    console.log('Model loaded!');
    status = true;
}



function start(){
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('object_detect').innerHTML = "Status : Detecting"
    object = document.getElementById('object_name').value
}


function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results)
        objects = results;
    }
}

function draw(){
    image(webcam,0,0,680,520)
    if(status != ""){
        object_Detector.detect(webcam,gotResults);
    
        for(var i = 0;i<objects.length;i++){
            fill("red")
            text(objects[i].label+" "+floor(objects[i].confidence*100)+"%",object[i].x+15, objects[i].y+15)
            noFill()
            stroke("red")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)

            document.getElementById("detectOrNot").innerHTML = objects.length

            if(object == objects[i].label){
            document.getElementById("object_detect").innerHTML = "Object found!"
        
            }
            else{
            document.getElementById("object_detect").innerHTML = "Object not found"
            }
        }
    }
    
}
