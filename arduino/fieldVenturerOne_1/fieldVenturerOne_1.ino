/*
  Running Node.js processes asynchronously using
  the Process class.
  Context:  Arduino, for Yun
  This sketch shows how to run a node.js script as a linux shell command
  using an Arduino Yún. It starts a process running asynchronously,
  then passes bytes from the STDOUT of the process to the Arduino's
  serial port.  Any bytes from the Arduino's serial port
  are sent to the STDIN of the process.
  created 21 Jun 2014
  modified 8 Mar 2015
  by Tom Igoe
*/
#include <Wire.h>

#include <Process.h>
Process nodejs;    // make a new Process for calling Node
boolean lightOn = true;
int motorSpeed = 150;

int motorRunTime = 5000;
int delaytime = 5000;
int motorAction = 0;
boolean debug = false;
const int numSensors = 4;

const int
PWM_A   = 3,
DIR_A   = 12,
BRAKE_A = 9,
PWM_B   = 11,
DIR_B   = 13,
BRAKE_B = 8;
void setup() {
  Bridge.begin();	// Initialize the Bridge
  Serial.begin(9600);	// Initialize the Serial
  Wire.begin();

  pinMode(13, OUTPUT);
  // Wait until a Serial Monitor is connected.
  //while (!Serial);
  digitalWrite(13, LOW);
  delay(500);
  // launch the echo.js script asynchronously:
  //nodejs.runShellCommandAsynchronously("node /mnt/sda1/arduino/node/forward_3.js");
  nodejs.runShellCommandAsynchronously("node /mnt/sda1/arduino/node/rover/server_2.js");
  digitalWrite(13, HIGH);
  delay(200);
  digitalWrite(13, LOW);
  delay(200);
  digitalWrite(13, HIGH);
  //setupMotors();
  //Serial.println("Started process");
}
void loop() {

  if (nodejs.running()) {

    //writeNumberToNode(analogRead(A0));
    
    int readings [numSensors];
    readings[0] = analogRead(A0);
    readings[1] = analogRead(A1);
    readings[2] = analogRead(A2);
    readings[3] = analogRead(A3);
    writeNumbersToNode(readings, numSensors);
  }
  //if it isn't running restart it!
  else {
    nodejs.runShellCommandAsynchronously("node /mnt/sda1/arduino/node/rover/server_2.js");
  }
  // }

  // pass any incoming bytes from the running node process
  // to the serial port:

  while (nodejs.available()) {
    Serial.write(nodejs.read());
    int reading = nodejs.read();
    //left
    if (reading != 10) {
      //writewordToNode("received");
      
      Wire.beginTransmission(8); // transmit to device #8
      // Wire.write("x is ");        // sends five bytes
      Wire.write(reading);              // sends one byte
      Wire.endTransmission();

    }
    if (reading == 53) {


      lightOn = !lightOn;
    }


  }
  // chooseMotorAction(motorAction);
  if (lightOn) {
    digitalWrite(13, HIGH);
  }
  else {
    digitalWrite(13, LOW);
  }

}


void writeNumberToNode(int reading) {
  String num = String(reading);
  num += "*";
  for (int i = 0; i < num.length(); i++) {
    //nodejs.write(Str2[i]);
    nodejs.write(num.charAt(i));
  }

  //add the requisite new line
  nodejs.write(10);

}
void writeNumbersToNode(int readings [], int numReadings) {
  String msg = "";
  for(int i=0;i<numReadings;i++){
    String num = String(readings[i]);
    msg+=num;
    msg+="*";
  }
  
  //num += "*";
  for (int i = 0; i < msg.length(); i++) {
    //nodejs.write(Str2[i]);
    nodejs.write(msg.charAt(i));
  }

  //add the requisite new line
  nodejs.write(10);

}

void writewordToNode(String aword) {
  
  for (int i = 0; i < aword.length(); i++) {
    //nodejs.write(Str2[i]);
    nodejs.write(aword.charAt(i));
  }
  //add the requisite new line
  nodejs.write(10);

}

//
//void chooseMotorAction(int reading) {
//
//  if (motorAction > 50) {
//    Serial.print("got motor action ");
//    Serial.println(reading);
//    if (reading == 53) {
//      runMotor(0, motorSpeed, "forwards");
//      delay(motorRunTime);
//      digitalWrite(BRAKE_A, HIGH);  // raise the brake
//      delay(delaytime);
//      motorAction = 0;
//      lightOn = !lightOn;
//    }
//    //right
//    else if (reading == 54) {
//      runMotor(1, motorSpeed, "forwards");
//      delay(motorRunTime);
//      digitalWrite(BRAKE_B, HIGH);  // raise the brake
//      delay(delaytime);
//      motorAction = 0;
//    }
//    //forwards
//    else if (reading == 55) {
//      runMotor(0, motorSpeed, "forwards");
//      runMotor(1, motorSpeed, "forwards");
//      delay(motorRunTime);
//      digitalWrite(BRAKE_A, HIGH);  // raise the brake
//      digitalWrite(BRAKE_B, HIGH);  // raise the brake
//      delay(delaytime);
//      motorAction = 0;
//    }
//    //backwards
//    else if (reading == 56) {
//      runMotor(0, motorSpeed, "backwards");
//      runMotor(1, motorSpeed, "backwards");
//      delay(motorRunTime);
//      digitalWrite(BRAKE_A, HIGH);  // raise the brake
//      digitalWrite(BRAKE_B, HIGH);  // raise the brake
//      delay(delaytime);
//      motorAction = 0;
//    }
//  }
//}
//
//void runMotor(int whichMotor, int speed, String direction) {
//  if (whichMotor == 1) {
//    if (direction.equals("forwards")) {
//      digitalWrite(BRAKE_B, LOW);  // setting brake LOW disable motor brake
//      digitalWrite(DIR_B, HIGH);   // setting direction to HIGH the motor will spin forward
//      analogWrite(PWM_B, 255);
//    }
//    else if (direction.equals("backwards")) {
//      digitalWrite(BRAKE_B, LOW);  // setting brake LOW disable motor brake
//      digitalWrite(DIR_B, LOW);   // setting direction to HIGH the motor will spin forward
//      analogWrite(PWM_B, 255);
//
//    }
//  }
//
//  else if (whichMotor == 0) {
//    if (direction.equals("forwards")) {
//      digitalWrite(BRAKE_A, LOW);  // setting brake LOW disable motor brake
//      digitalWrite(DIR_A, HIGH);   // setting direction to HIGH the motor will spin forward
//      analogWrite(PWM_A, 255);
//    }
//    else if (direction.equals("backwards")) {
//      digitalWrite(BRAKE_A, LOW);  // setting brake LOW disable motor brake
//      digitalWrite(DIR_A, LOW);   // setting direction to HIGH the motor will spin forward
//      analogWrite(PWM_A, 255);
//
//    }
//  }
//
//
//
//
//}
//void stopMotor(int whichMotor) {
//  int motorPin = 0;
//  int dirPin = 0;
//  int brakePin = 0;
//  if (whichMotor == 0) {
//    motorPin = 3;
//    dirPin = 12;
//    brakePin = 9;
//  }
//  else {
//    motorPin = 11;
//    dirPin = 13;
//    brakePin = 9;
//  }
//
//  digitalWrite(brakePin, HIGH);   //Disengage the Brake for Channel A
//  analogWrite(motorPin, 0);
//
//}

