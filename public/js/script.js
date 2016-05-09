

$( document ).ready(function() {
  

  Number.prototype.map = function ( in_min , in_max , out_min , out_max ) {
      return ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
  }
   var startTime = Date.now();
  var myvalues = [];
  var myvalues1 = [];
  var myvalues2 = [];
  var myvalues3 = [];
  var distanceTravelled = 0;
  var socket = io();
  var clickColour = "black";
  var packetsReceived = 0;
  var instructionsSent = 0;

      var color0 = "#26d0d0"; 
    var color1 = "white"; 
    var color2 = "lightGray"; 
    var color3 = "#713274"; 

    var lWidth = 2;
    var gWidth = '1820px';
    var boxLineColor = "rgba(0,0,0,0)";
    var medianColor="white";
    var boxFillColor = "darkGray";//"26d0d0";
    var whiskerColor = "pink";
    var outlierLineColor = "grey";
    var boxWidth="400px";
    var boxHeight="70px";

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
  var oscillator = audioCtx.createOscillator();
  oscillator.type = 'sawtooth';
  oscillator.frequency.value = 200;
  oscillator.connect(audioCtx.destination);
  oscillator.start(0);

  var oscillator1 = audioCtx.createOscillator();
  oscillator1.type = 'square';
  oscillator1.frequency.value = 200;
  oscillator1.connect(audioCtx.destination);
  oscillator1.start(0);

  var oscillator2 = audioCtx.createOscillator();
  oscillator2.type = 'sine';
  oscillator2.frequency.value = 200;
  oscillator2.connect(audioCtx.destination);
  oscillator2.start(0);

  var oscillator3 = audioCtx.createOscillator();
  oscillator3.type = 'triangle';
  oscillator3.frequency.value = 200;
  oscillator3.connect(audioCtx.destination);
  oscillator3.start(0);

  function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

   $('#alcohol_box').sparkline(myvalues,{type:'box',height: boxHeight, width: boxWidth, lineColor:color1, outlierLineColor:outlierLineColor, whiskerColor:whiskerColor,lineWidth:lWidth, boxLineColor:boxLineColor,medianColor:medianColor,boxFillColor:boxFillColor });
    $('#c02_box').sparkline(myvalues1,{type:'box',height: boxHeight, width: boxWidth, lineColor:color1, outlierLineColor:outlierLineColor, whiskerColor:whiskerColor,lineWidth:lWidth, boxLineColor:boxLineColor,medianColor:medianColor,boxFillColor:boxFillColor });
    $('#methane_box').sparkline(myvalues2,{type:'box',height: boxHeight, width: boxWidth, lineColor:color1, outlierLineColor:outlierLineColor, whiskerColor:whiskerColor,lineWidth:lWidth, boxLineColor:boxLineColor,medianColor:medianColor,boxFillColor:boxFillColor });
    $('#humidity_box').sparkline(myvalues3,{type:'box',height: boxHeight, width: boxWidth, lineColor:color1, outlierLineColor:outlierLineColor, whiskerColor:whiskerColor,lineWidth:lWidth, boxLineColor:boxLineColor,medianColor:medianColor,boxFillColor:boxFillColor });
    
    $('.inlinesparkline').sparkline(myvalues,{height:'100px',width: gWidth, lineWidth:lWidth, spotColor:'false',minSpotColor:'false',maxSpotColor:'false',  type:'line', lineColor:color0,fillColor:'rgba(255,255,255,0)',chartRangeMin:'0',chartRangeMax:'1023' });
    $('.inlinesparkline').sparkline(myvalues1,{composite:'true',lineWidth:lWidth, height:'100px',width: gWidth,spotColor:'false',minSpotColor:'false',maxSpotColor:'false',  type:'line', lineColor:color1,fillColor:'rgba(255,255,255,0)',chartRangeMin:'0',chartRangeMax:'1023' });
    $('.inlinesparkline').sparkline(myvalues2,{composite:'true',lineWidth:lWidth, height:'100px',width: gWidth,spotColor:'false',minSpotColor:'false',maxSpotColor:'false',  type:'line', lineColor:color2,fillColor:'rgba(255,255,255,0)',chartRangeMin:'0',chartRangeMax:'1023' });
    $('.inlinesparkline').sparkline(myvalues3,{composite:'true',lineWidth:lWidth, height:'100px',width: gWidth,spotColor:'false',minSpotColor:'false',maxSpotColor:'false',  type:'line', lineColor:color3,fillColor:'rgba(255,255,255,0)',chartRangeMin:'0',chartRangeMax:'1023' });

    $("#instructions_sent").text("COMMANDS SENT: "+instructionsSent);

  $('#sensor0').text("alcohol: 0");
  $('#sensor1').text("C02: 0");
  $('#sensor2').text("methane: 0");
  $('#sensor3').text("particulates: 0");



 // console.log("iframe",$("iframe").html());

 
  // $("polygon").click(function(){
  //   console.log($(this).attr("id"));
  // });
  var html ="<div class='bar_chart'> <div class='bar_background'><div id='alcohol_bar' class='bar'></div></div></div>";
  $( "#alcohol_hook" ).append( html );
  
  html ="<div class='bar_chart'> <div class='bar_background'><div id='c02_bar'  class='bar'></div></div></div>";

  $( "#c02_hook" ).append( html );
  html ="<div class='bar_chart'> <div class='bar_background'><div id='methane_bar'  class='bar'></div></div></div>";

  $( "#methane_hook" ).append( html );
  html ="<div class='bar_chart'> <div class='bar_background'><div id='humidity_bar' class='bar'></div></div></div>";

  $( "#humidity_hook" ).append( html );

  html ="<div class='v_bar_chart'> <div class='v_bar_background'><div id='battery_bar' class='v_bar'><div id='battery_label' 'class='v_bar_label'> </div></div></div></div>";
  $( "#battery_hook" ).append( html );

  html ="<div class='v_bar_chart'> <div class='v_bar_background'><div id='level_bar' class='v_bar'><div id='level_label' 'class='v_bar_label'> </div></div></div></div>";

  $( "#level_hook" ).append( html );


  function checkCamera(){
    $.get('https://open.ivideon.com/embed/v2/?server=100-2dffae92a34dd80816b49f0d16d1efc6&camera=0&width=&height=&lang=en',function(data){
      console.log(data.search("No camera"));
      if(data.search("No camera")>-1){
        $("#camera_status_inner").text("X");
      }
      else{
        $("#camera_status_inner").text("");
      }
    })
  }
  setInterval(function(){ 
    checkCamera();
  },5000);
    setInterval(function(){ 
     

      $("#time").text("TIME OPERATONAL: "+Date.now());
      var timeElapsed = Date.now()-startTime;
      var numberOfHoursForShow = 3;
      var battCapacity = 1000*60*numberOfHoursForShow;
      //console.log(battCapacity,timeElapsed/1000);
      var batteryLife =100-(timeElapsed/battCapacity) ;
      batteryLife+=" ";
      batteryLife = batteryLife.substring(0,6);
      

      // $("#battery").text("BATTERY REMAINING: "+batteryLife+"%");
      $("#battery_label").text("BATT: "+batteryLife+"%");
      var maxBarHeight = 230;
      barHeight = maxBarHeight-(batteryLife/maxBarHeight);
      $("#battery_bar").height(barHeight+"px");
      $("#battery_bar").css('top',(maxBarHeight-barHeight)+"px");


      var signalStrength=getRandomArbitrary(70,80);
      signalStrength+=" ";
      signalStrength = signalStrength.substring(0,6); 

      $("#level_label").text("SIGNAL: "+signalStrength+"%");
      var maxBarHeight = 230;
       barHeight = maxBarHeight-(signalStrength/maxBarHeight);
      //console.log(barHeight);
      $("#level_bar").height(signalStrength+"px");
      $("#level_bar").css('top',(maxBarHeight-barHeight)+"px");



    }, 100);


 
 

  $("#distance").text("DISTANCE SINCE OPERATONAL: "+distanceTravelled);

  $(".cls-10").mouseover(function(){
    $(this).attr("fill",'white');
    //fill:#fbb040
   
    //console.log("over");
  });
  function incDistance(){
    setTimeout(function(){
      distanceTravelled+=Math.random(2,5)*1000;
      distanceTravelled+=" ";
      distanceTravelled = distanceTravelled.substring(0,6);
      distanceTravelled=parseInt(distanceTravelled);
      $("#distance").text("DISTANCE SINCE OPERATONAL: "+distanceTravelled+"mm");
    }, 4000);
  }
  function indicateMotion(selector){
    console.log(aog.fis);
    $(selector).find(".motion").fadeIn( "slow", function() {
      $(selector).find(".motion").fadeOut( "slow", function() {
        $(selector).find(".motion").fadeIn( "slow", function() {
          $(selector).find(".motion").fadeOut( "slow", function() {
            $(selector).find(".motion").fadeIn( "slow", function() {
              $(selector).find(".motion").fadeOut( "slow", function() {
            
              });
            });
          });
        });
      });
    });

  }


  $(".cls-10").mouseleave(function(){
    $(this).attr("fill",'#fbb040');
    //fill:#fbb040
   
    console.log("over");
  });


  $('#left').click(function() {
    //console.log("left");
    $(this).attr("fill",clickColour);
    incInstructionsSent();

    var selector = "#anti_inner";
    indicateMotion(selector);

    socket.emit('arduino_instruction', "5");
  });
  $('#right').click(function() {
    //console.log("right");
    $(this).attr("fill",clickColour);
    incInstructionsSent();

    var selector = "#clockwise_inner";
    indicateMotion(selector);

    socket.emit('arduino_instruction', "6");
  });
  $('#forward').click(function() {
    //console.log("forward");
    $(this).attr("fill",clickColour);
    incInstructionsSent();
    incDistance();

    var selector = "#forward_inner";
    indicateMotion(selector);

    socket.emit('arduino_instruction', "7");
  });
  $('#backward').click(function() {
    //console.log("backward");
    $(this).attr("fill",clickColour);
    incInstructionsSent();
    incDistance();

    var selector = "#reverse_inner";
    indicateMotion(selector);

    socket.emit('arduino_instruction', "8");
  });

function incInstructionsSent(){
  instructionsSent++;
  $("#instructions_sent").text("COMMANDS SENT: "+instructionsSent);
}

  socket.on('arduino message', function(msg){
    //console.log('got arduino message: ' + msg);
    // var n = msg.indexOf("*");
    // var val = msg.substring(0,n);
    
    $('#connection_status_inner').text("X");
  var readings = msg.split("*");

  if(readings.length==5){
    packetsReceived++;
    $("#packets_received").text("DATA PACKETS RECEIVED: "+packetsReceived);
    $('#sensor0').text("alcohol: "+readings[0]);
    var height = parseInt(readings[0]).map(1023,0, 0, 100);
    $('#sensor0head').css("top", height+"px");

    $('#sensor1').text("C02: "+readings[1]);
    $('#sensor2').text("methane: "+readings[2]);
    $('#sensor3').text("particulates: "+readings[3]);

    oscillator.frequency.value = parseInt(readings[0]);
    oscillator1.frequency.value = parseInt(readings[1]);
    oscillator2.frequency.value = parseInt(readings[2]);
    oscillator3.frequency.value = parseInt(readings[3]);


    myvalues.push(readings[0]);
    myvalues1.push(readings[1]);
    myvalues2.push(readings[2]);
    myvalues3.push(readings[3]);
    
    $("#alcohol_bar").width(parseInt(readings[0]).map(0,1023,0,$('#alcohol_hook').width()));
    $("#c02_bar").width(parseInt(readings[1]).map(0,1023,0,$('#c02_hook').width()));
    $("#methane_bar").width(parseInt(readings[2]).map(0,1023,0,$('#methane_hook').width()));
    $("#humidity_bar").width(parseInt(readings[3]).map(0,1023,0,$('#humidity_hook').width()));

    var arrLength =500;
    if(myvalues.length>arrLength){
      myvalues.shift();
    }
    if(myvalues1.length>arrLength){
      myvalues1.shift();
    }
    if(myvalues2.length>arrLength){
      myvalues2.shift();
    }
    if(myvalues3.length>arrLength){
      myvalues3.shift();
    }
  }


    $('#alcohol_box').sparkline(myvalues,{type:'box',height: boxHeight, width: boxWidth, lineColor:color1, outlierLineColor:outlierLineColor, whiskerColor:whiskerColor,lineWidth:lWidth, boxLineColor:boxLineColor,medianColor:medianColor,boxFillColor:boxFillColor });
    $('#c02_box').sparkline(myvalues1,{type:'box',height: boxHeight, width: boxWidth, lineColor:color1, outlierLineColor:outlierLineColor, whiskerColor:whiskerColor,lineWidth:lWidth, boxLineColor:boxLineColor,medianColor:medianColor,boxFillColor:boxFillColor });
    $('#methane_box').sparkline(myvalues2,{type:'box',height: boxHeight, width: boxWidth, lineColor:color1, outlierLineColor:outlierLineColor, whiskerColor:whiskerColor,lineWidth:lWidth, boxLineColor:boxLineColor,medianColor:medianColor,boxFillColor:boxFillColor });
    $('#humidity_box').sparkline(myvalues3,{type:'box',height: boxHeight, width: boxWidth, lineColor:color1, outlierLineColor:outlierLineColor, whiskerColor:whiskerColor,lineWidth:lWidth, boxLineColor:boxLineColor,medianColor:medianColor,boxFillColor:boxFillColor });
    
    $('.inlinesparkline').sparkline(myvalues,{height:'100px',width: gWidth, lineWidth:lWidth, spotColor:'false',minSpotColor:'false',maxSpotColor:'false',  type:'line', lineColor:color0,fillColor:'rgba(255,255,255,0)',chartRangeMin:'0',chartRangeMax:'1023' });
    $('.inlinesparkline').sparkline(myvalues1,{composite:'true',lineWidth:lWidth, height:'100px',width: gWidth,spotColor:'false',minSpotColor:'false',maxSpotColor:'false',  type:'line', lineColor:color1,fillColor:'rgba(255,255,255,0)',chartRangeMin:'0',chartRangeMax:'1023' });
    $('.inlinesparkline').sparkline(myvalues2,{composite:'true',lineWidth:lWidth, height:'100px',width: gWidth,spotColor:'false',minSpotColor:'false',maxSpotColor:'false',  type:'line', lineColor:color2,fillColor:'rgba(255,255,255,0)',chartRangeMin:'0',chartRangeMax:'1023' });
    $('.inlinesparkline').sparkline(myvalues3,{composite:'true',lineWidth:lWidth, height:'100px',width: gWidth,spotColor:'false',minSpotColor:'false',maxSpotColor:'false',  type:'line', lineColor:color3,fillColor:'rgba(255,255,255,0)',chartRangeMin:'0',chartRangeMax:'1023' });

  //});
    // socket.emit('chat message', $('#m').val());
    // $('#m').val('');
    // return false;
  });

  socket.on('lost connection', function(msg){
    console.log("list");
    $('#connection_status_inner').text("");

  });

});