/*
 this test sketch will go through the possible manouevres one by one
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

int motorSpeed = 255;
// You can also make another motor on port M2
//Adafruit_DCMotor *myOtherMotor = AFMS.getMotor(2);
int control = 0;
int motorRunTime = 2000;


void setup() {
  Serial.begin(9600);           // set up Serial library at 9600 bps
  Serial.println("Adafruit Motorshield v2 - DC Motor test!");

  
  AFMS.begin();  // create with the default frequency 1.6KHz
  
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
    runMotor(0, 255, FORWARD);
    delay(motorRunTime);
    stopMotor(0);


  }
  //forward
  else if (control == 55) {
    Serial.print("managing motor: ");
    Serial.println(55);
    runMotor(0, 255, FORWARD);
    runMotor(1, 255, FORWARD);
    delay(motorRunTime);
    stopMotor(0);
    stopMotor(1);
  }
  //right
  else if (control == 54) {
    Serial.print("managing motor: ");
    Serial.println(54);
    runMotor(1, 255, FORWARD);
    delay(motorRunTime);
    stopMotor(1);

  }
  //backward
  else if (control == 56) {
    Serial.print("managing motor: ");
    Serial.println(56);
    runMotor(0, 255, BACKWARD);
    runMotor(1, 255, BACKWARD);
    delay(motorRunTime);
    stopMotor(0);
    stopMotor(1);

  }
  control=0;
}
void loop() {
  control=53;
  manageMotors();
  control=54;
  manageMotors();
  control=55;
  manageMotors();
  control=56;
  manageMotors();
  delay(2);
}

