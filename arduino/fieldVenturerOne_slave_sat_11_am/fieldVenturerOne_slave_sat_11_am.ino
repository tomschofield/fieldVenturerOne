/*
  This is a test sketch for the Adafruit assembled Motor Shield for Arduino v2
  It won't work with v1.x motor shields! Only for the v2's with built in PWM
  control

  For use with the Adafruit Motor Shield v2
  ---->	http://www.adafruit.com/products/1438
*/

#include <Wire.h>
#include <Adafruit_MotorShield.h>
#include "utility/Adafruit_MS_PWMServoDriver.h"

// Create the motor shield object with the default I2C address
Adafruit_MotorShield AFMS = Adafruit_MotorShield();
// Or, create it with a different I2C address (say for stacking)
// Adafruit_MotorShield AFMS = Adafruit_MotorShield(0x61);

// Select which 'port' M1, M2, M3 or M4. In this case, M1
Adafruit_DCMotor *myMotor = AFMS.getMotor(1);
Adafruit_DCMotor *myMotor2 = AFMS.getMotor(2);

int motorSpeed = 150;
// You can also make another motor on port M2
//Adafruit_DCMotor *myOtherMotor = AFMS.getMotor(2);
int control = 0;
int motorRunTime = 2000;


void setup() {
  Serial.begin(9600);           // set up Serial library at 9600 bps
  Serial.println("Adafruit Motorshield v2 - DC Motor test!");

  Wire.begin(8);                // join i2c bus with address #8
  Wire.onReceive(receiveEvent); // register event

  AFMS.begin();  // create with the default frequency 1.6KHz
  //AFMS.begin(1000);  // OR with a different frequency, say 1KHz

  // Set the speed to start, from 0 (off) to 255 (max speed)
  //  myMotor->setSpeed(150);
  //  myMotor->run(FORWARD);
  //  // turn on motor
  //  myMotor->run(RELEASE);
}
void runMotor(int whichMotor, int speed, int direction) {
  if (whichMotor == 0) {
    myMotor->run(direction);
    myMotor->setSpeed(speed);

  }
  else {
    myMotor2->run(direction);
    myMotor2->setSpeed(speed);

  }

}
void stopMotor(int whichMotor) {
  if (whichMotor == 0) {
    myMotor->run(RELEASE);
  }
  else {
    myMotor2->run(RELEASE);
  }

}

void manageMotors() {
  
  //left
  if (control == 53) {
    Serial.print("managing motor: ");
    Serial.println(53);
    runMotor(0, motorSpeed, FORWARD);
    runMotor(1, motorSpeed, BACKWARD);
    
    delay(motorRunTime);
    
    stopMotor(0);
    stopMotor(1);


  }
  //forward
  else if (control == 55) {
    Serial.print("managing motor: ");
    Serial.println(55);
    runMotor(0, motorSpeed, FORWARD);
    runMotor(1, motorSpeed, FORWARD);
    delay(motorRunTime*3);
    stopMotor(0);
    stopMotor(1);
  }
  //right
  else if (control == 54) {
    Serial.print("managing motor: ");
    Serial.println(54);
    runMotor(1, motorSpeed, FORWARD);
    runMotor(0, motorSpeed, BACKWARD);
    delay(motorRunTime);
    stopMotor(1);
    stopMotor(0);

  }
  //backward
  else if (control == 56) {
    Serial.print("managing motor: ");
    Serial.println(56);
    runMotor(0, motorSpeed, BACKWARD);
    runMotor(1, motorSpeed, BACKWARD);
    delay(motorRunTime*3);
    stopMotor(0);
    stopMotor(1);

  }
  control=0;
}
void loop() {

  manageMotors();
  delay(2);
}

void receiveEvent(int howMany) {
//  while (1 < Wire.available()) { // loop through all but the last
//    char c = Wire.read(); // receive byte as a character
//    Serial.print(c);         // print the character
//  }
  int reading =  Wire.read(); 
  if(reading>=53 && reading <=56){
  control =  reading; // receive byte as an integer
  Serial.println(control);         // print the integer
  }
}
