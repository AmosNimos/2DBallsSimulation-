let x=0,y=0,w=15; // Position and Size of the ball
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

let balls = [];

function preload(){
  sound = loadSound("pop.wav");
}

function setup() {

  ///Setup the canvas to the current display size.
  createCanvas(700, 700);
  //createCanvas(displayWidth/1.5, displayHeight/1.5);
  
  //Setup Color.
  ballColor = color(255,255,255); // default ball color to white.
  backColor = color(0,0,0,Alpha); // default background color to black.
  
  //Initialise phisics
  grav = random(0.02,0.1);

  // Create objects
  var newton =round(random(1));
  print("Newton is:" + newton);
  for (let i = 0; i < 15; i++) {
    balls.push(new Ball(gravity,grav,speed,bounce,width,height,i,w,newton));
  }

}

function draw() {
  //Fill the backgorund with a color
  background(backColor);
  ballAction();
}

function ballAction(){
  //object array update
  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].collision();
  }
}

// Jitter class
class Ball {
  constructor(gravity,grav,speed,bounce,wid,hei,id,w,n) {
    //w=(width+height)/100;
    ///Initialise directional velocity.
    this.speed=random(7);
    this.vspeed=round(random(-speed,speed));
    this.hspeed=round(random(-speed,speed));
    this.collided=false;
    this.gravity=gravity;
    this.grav=grav;
    //this.w=random(8,16);
    this.w=w;
    this.r=this.w/2;
    this.bounce = bounce;
    this.width=wid;
    this.height=hei;
    this.other;
    this.id=id;
    this.x=random(w,width-w);
    this.y=random(w,height-w);
    this.ballColor=color(255,255,255);
    this.newton=n;
  }

  move() {
     ///Reaction to collision
    if(this.collided){
      ///This will slow down infinitly.
      //speed/=1.1;
      ///This should slow down to 0.
      if(this.speed>0){
        this.speed-=0.1;
      }

      ///Change sound based on ball velocity and play the sound
      //sound.setVolume(round(this.speed/4)+round(this.gravity/8));
      //sound.play();

      ///Generate new ball color
      //let R = round(random(255));
      //let G = round(random(255));
      //let B = 255-R;
      //ballColor = color(R,G,B);

      //Refresh collision detection.
      this.collided=false;
    }

    //Update the ball position.
    this.x+=this.hspeed;
    this.y+=this.vspeed+this.gravity;
    this.gravity+=this.grav;
    
    //look at current speed to reset avoid inertion.
    if(this.speed<=1.5){
      //reset speed
      this.speed=5;
      //reset general gravity value
      this.grav = random(0.02,0.1);
    }

    ///Draw the ball.
    //fill(this.ballColor);
    fill(this.speed*45,255-this.speed*45,255-this.speed*45); //set ball color.
    noStroke(); // without outline
    ellipse(this.x,this.y,this.w,this.w);
  }

  collision() {
    
    for (let i = 0; i < balls.length; i++) {
      if(i!=this.id){
        this.other = balls[i];
        if(this.x+this.r>this.other.x-this.other.r && this.x-this.r<this.other.x+this.other.r && this.y+this.r>this.other.y-this.other.r && this.y-this.r<this.other.y+this.other.r && !this.collided){
          this.collided=true;
          ///Right collision between two balls
          if(this.newton){
            ///following newton law of energy conservation
            if(this.x>this.other.x){
              if(this.speed>this.other.speed){
                this.other.speed=this.speed;
                this.other.hspeed=this.hspeed;
                this.speed/=1.05;
                this.hspeed=-this.hspeed/1.5;
              }
            } else {
              if(this.speed>this.other.speed){
                this.other.speed=this.speed;
                this.other.hspeed=this.hspeed;
                this.speed/=1.05;
                this.hspeed=-this.hspeed/1.5;
              }
            }
          } else {
            ///Not following newton law of energy conservation
            this.hspeed=-this.hspeed;
          }
        }
      }
    }
    
    //Right border
    if(this.x>this.width){
      //Teleport the ball away from the border.
      this.x-=this.bounce;
      //change velocity
      this.hspeed=-this.speed;
      this.vspeed=round(random(-this.speed,this.speed));

      //reduce speed 
      this.speed-=0.1;
      //Store that the ball as collided with a border.
      this.collided = true;
    }

    //Left border
    if(this.x<0){
      //Teleport the ball away from the border.
      this.x+=this.bounce;
      //Change velocity
      this.hspeed=this.speed;
      this.vspeed=round(random(-this.speed,this.speed));

      //Reduce speed 
      this.speed-=0.1;
      //Store that the ball as collided with a border.
      this.collided = true;
    }

    //Bottom border
    if(this.y>this.height){
      //Teleport the ball away from the border.
      this.y-=this.bounce;
      //Change velocity
      this.vspeed=-this.speed;
      ///Inverse horisontal velocity
      //hspeed=-hspeed;
      this.hspeed=round(random(-this.speed,this.speed));

      ///reset gravity
      this.gravity=0;
      ///Reduce gravity
      //gravity/=10;
      ///Increase ball speed
      //speed+=0.1;
      ///Reduce speed 
      this.speed-=0.1;
      //Store that the ball as collided with a border.
      this.collided = true;
    }
  
    //Top border
    if(this.y<0){
      //Teleport the ball away from the border.
      this.y+=this.bounce;
      //Change velocity
      this.vspeed=this.speed;
      this.hspeed=-this.hspeed;

      //Reduce speed 
      this.speed-=0.5;

      //Store that the ball as collided with a border.
      this.collided = true;
    }
  }
}
