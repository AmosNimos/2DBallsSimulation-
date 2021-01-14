let x=0,y=0,w=10; // Position and Size of the ball
///alternative example:
//let PS = [0,0,10];

let hspeed=0, vspeed=0; // Velocity
///alternative example:
//let Velocity = [0,0];

let speed = 5; // The initial speed of the ball.
let bounce =10; //The amount of ball displacement on collision.
let collided = false; //Store if the ball has collided.
let Alpha = 20; // Backgroud opacity.
let ballCol,backCol; // Color types;
let gravity =0; //Curent gravity
let grav = 0.05; //General gravity

function preload(){
  sound = loadSound("HomeMade.wav");
}

function setup() {

  //Setup the canvas to the current display size.
  createCanvas(200, 200);
  
  //Setup Color.
  ballColor = color(255,255,255); // default ball color to white.
  backColor = color(0,0,0,Alpha); // default background color to black.
  
  //Call the function to initialise the ball parameter.
  InitialiseBall();
  
  //Initialise phisics
  grav = random(0.02,0.1);

}

function draw() {
  
  //Fill the backgorund with a color
  background(backColor);
  
  ///Canvas border collision detection.
  collisionDetection();

  ///Reaction to collision
  if(collided){
    ///This will slow down infinitly.
    //speed/=1.1;
    ///This should slow down to 0.
    if(speed>0){
    speed-=0.1;
    }

    //Change sound based on ball velocity
    sound.setVolume(speed/4+(gravity)/8);
    //Play sound
    sound.play();
    
    ///Generate new ball color
    //let R = round(random(255));
    //let G = round(random(255));
    //let B = 255-R;
    //ballColor = color(R,G,B);
    
    //Refresh collision detection.
    collided=false;
  }
     
  //Update the ball position.
  x+=hspeed;
  y+=vspeed+gravity;
  gravity+=grav;
  if(speed<=1.5){
    //reset speed
    speed=5;
    //reset general gravity value
    grav = random(0.02,0.1);
  }
  
  //Draw the ball.
  //fill(ballColor);
  fill(speed*45,255-speed*45,255-speed*45); //set ball color.
  noStroke(); // without outline
  ellipse(x,y,w,w);
}

function InitialiseBall(){
  //Set the ball position to the canvas center.
  x=width/2;
  y=height/2;
  //w=(width+height)/100;
  //Initialise directional velocity.
  vspeed=round(random(-speed,speed));
  hspeed=round(random(-speed,speed));
}

function collisionDetection(){
  //Right border
  if(x>width){
    //Teleport the ball away from the border.
    x-=bounce;
    //change velocity
    hspeed=-speed;
    vspeed=round(random(-speed,speed));
    
    //reduce speed 
    speed-=0.1;
    //Store that the ball as collided with a border.
    collided = true;
  }
  
  //Left border
  if(x<0){
    //Teleport the ball away from the border.
    x+=bounce;
    //Change velocity
    hspeed=speed;
    vspeed=round(random(-speed,speed));
    
    //Reduce speed 
    speed-=0.1;
    //Store that the ball as collided with a border.
    collided = true;
  }
  
  //Bottom border
  if(y>height){
    //Teleport the ball away from the border.
    y-=bounce;
    //Change velocity
    vspeed=-speed;
    ///Inverse horisontal velocity
    //hspeed=-hspeed;
    hspeed=round(random(-speed,speed));
    
    ///reset gravity
    gravity=0;
    ///Reduce gravity
    //gravity/=10;
    ///Increase ball speed
    //speed+=0.1;
    ///Reduce speed 
    speed-=0.1;
    //Store that the ball as collided with a border.
    collided = true;
  }
  
  //Top border
  if(y<0){
    //Teleport the ball away from the border.
    y+=bounce;
    //Change velocity
    vspeed=speed;
    hspeed=-hspeed;
    
    //Reduce speed 
    speed-=0.5;
    
    //Store that the ball as collided with a border.
    collided = true;
  }
}