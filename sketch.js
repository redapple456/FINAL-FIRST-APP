let x;
let y;
let Right;
let Up;
let CircAcc;
let lays;
let sx;
let sy;
let ps;

let state = "WELCOME";
let gCode = "";

let outputBox;
let showDesignButton;
let saveButton;
let loopSize;
let startX;
let startY;
let inputSpeed;
let feedRate;
let totalDistance = 0;
let slowTimeMinutes = 0;
let inputScaffolds;
let numScaffolds = 1;
let zoomScale = 1.0;
let Forward = true;
let centerX, CenterY;

let patternType = "GRID"; 
let patternSelect;

let offsetX = 0;
let offsetY = 0;

let enterButton;
let startButton;
let backButton;

let secondImg;

let inputLayerHeight;
let layerHeightVal = 0.2;


function preload() {
  logoImg = loadImage('https://cmsv2-assets.apptegy.net/uploads/2904/logo/6039/metro-header.png');
  
  secondImg = loadImage('HAMMER_LOGO.png');
  
}

function welcomeUser() {
  state = "WELCOME";
  backButton.hide();
  //Show welcome screen
     fill(0);
    textSize(24);
    textAlign(CENTER);
    text("G-Code Generator", width/2, 300);
    
  hideAllInputs();
  
  
}



function setup() {
  let cnv = createCanvas(400, 500); 
  cnv.style('border', '1px solid #2c3e50');
  
  angleMode(DEGREES);
  
  
  //Enter button
  enterButton = createButton('Get Started!');
  enterButton.position(width/2 - 40, 350);
  enterButton.mousePressed(goToMenu);
  
  //Input boxes:
  inputSX = createInput('100');
  inputSX.position(20,40);
  
  inputSY = createInput('100');
  inputSY.position(20,85);
  
  inputPS = createInput('10');
  inputPS.position(20,130);
  
  inputloopSize = createInput('10');
  inputloopSize.position(180,40);
  
  inputstartX = createInput('0');
  inputstartX.position(180,85);
  
  inputstartY = createInput('0');
  inputstartY.position(180,130);
  
  textLayers = createInput('1');
  textLayers.position(180,175);
  
  inputSpeed = createInput('600'); 
  inputSpeed.position(20,175);
  
  inputScaffolds = createInput('1');
  inputScaffolds.position(210, 265);
  
  
inputLayerHeight = createInput('0.2');
inputLayerHeight.position(210, 320); 
inputLayerHeight.hide();
  
  aboutButton = createButton('?');
  aboutButton.position(355,15);
  aboutButton.size(30,30);
  aboutButton.mousePressed(goToAbout);
  
  aboutButton.style('background-color', '#2c3e50');
  aboutButton.style('color', 'white');
  aboutButton.style('border', 'none');
  aboutButton.style('border-radius', '50%');
  aboutButton.style('font-weight', 'bold');
  aboutButton.style('cursor', 'pointer');
  aboutButton.style('box-shadow', '0px 2px 5px rgba(0,0,0,0.2)');
  aboutButton.style('cursor', 'pointer');
  
  
  
  
  
//Create Start Button
  startButton = createButton('GENERATE G-Code');
  startButton.position(200,205);
  startButton.mousePressed(goToApp);
  
  //Create Back Button
  backButton = createButton('Back to Menu');
  backButton.position(width/2 - 180,460);
  backButton.mousePressed(goToMenu);
  backButton.hide();
  
  //Create Save Button
  saveButton = createButton('Download G-Code');
  //saveButton.style('background-color', '#4CAF50')
  //saveButton.style('color','white');
  saveButton.position(width/2 + 60, 460);
  saveButton.mousePressed(exportGCode);
  saveButton.hide();
  
  //Create a scrollable text area
  outputBox = createElement('textarea');
  outputBox.position(12.5,100);
  outputBox.size(350,300);
  


  
  //Style
  outputBox.style('background-color', 'black');
  outputBox.style('color', '#00ff00');

  outputBox.style('font-family', 'monospace');
  outputBox.style('border', '2px solid #333');
  outputBox.style('padding','10px');
  outputBox.style('z-index', '1');
  outputBox.style('z-index', '2');
  
  
  outputBox.hide(); //Hide it on the menu screen
  
  
  //Create showDesignButton
  showDesignButton = createButton('Show Design');
  showDesignButton.position(280,460);
  showDesignButton.mousePressed(goToDesign);
  showDesignButton.hide();
  
  // Grid Shape Option
  patternSelect = createSelect();
  patternSelect.position(20,260);
  patternSelect.option('GRID');
  patternSelect.option('TRIANGLE');
  patternSelect.changed(() => { patternType = patternSelect.value(); });
  
  
  hideAllInputs();
}


function draw() {
  background(245); // Light clean gray background
  
  if (state === "WELCOME") {
    background(255); // Solid white for a clean look
    
    // DRAW TECHNICAL GRID
    stroke(235); // Very faint gray lines
    strokeWeight(1);
    for (let i = 0; i < width; i += 20) line(i, 0, i, height);
    for (let i = 0; i < height; i += 20) line(0, i, width, i);
    
    imageMode(CENTER);
    if (logoImg) {
      image(logoImg, width/2, 100, 240, 65); // Resized & moved up
    }
    
    if (secondImg) {
      // Placing the HAMMER logo as a clean footer
      image(secondImg, width/2, height - 60, 300, 80); 
    }
    
    // TITLE SECTION
    noStroke();
    fill(30); // Almost black
    textSize(35);
    textAlign(CENTER);
    textStyle(BOLD);
    text("G-Code Generator", width/2, 210);
    
    textStyle(NORMAL);
    textSize(15);
    fill(120); // Lighter gray for subtitle
    text("Precision Scaffold Engineering Tool", width/2, 235);
    
    // STYLE AND POSITION BUTTON
    enterButton.show();
    enterButton.position(width/2 - 75, 290);
    enterButton.size(150, 45);
    enterButton.style('background-color', '#2c3e50'); // Professional Navy Blue
    enterButton.style('color', 'white');
    enterButton.style('border-radius', '10px');
    enterButton.style('border', 'none');
    enterButton.style('font-family', 'sans-serif');
    enterButton.style('font-weight', 'bold');
    enterButton.style('font-size', '16px');
    enterButton.style('cursor', 'pointer');
    
    aboutButton.show();
    enterButton.show();
    
  }

    
   else if (state === "MENU") {
     
     
    imageMode(CENTER);
    if (logoImg) {
      image(logoImg, width/2 + 135, height - 25, 120, 30); // Resized & moved up
    }
    
    if (secondImg) {
      // Placing the HAMMER logo as a clean footer
      image(secondImg, width/2 - 125, height - 27, 140, 40); 
    }
    enterButton.hide();
    
    // Background for inputs
    fill(255);
    noStroke();
    rect(10, 10, 380, 350, 15); 
    
    fill(0);
    textAlign(LEFT);
    textSize(12);
    textStyle(BOLD);
    
    // Column 1 
    text("PUT IN THE VALUES TO CUSTOMIZE YOUR SCAFFOLD", 25, 40);
    textStyle(NORMAL);
    
    text("Width (mm):", 25, 65);
    
    inputSX.position(25, 70);
    text("Height (mm):", 25, 115);
    inputSY.position(25, 120);
    text("Pore Size (mm):", 25, 165);
    inputPS.position(25, 170);
    text("Print Speed (mm/min):", 25, 215);
    inputSpeed.position(25, 220);
    
    text("Shape: ", 210, 265);
    
    
    textStyle(NORMAL);
    
    text("Radius Size (mm):", 210, 65);
    inputloopSize.position(210, 70);
    
    text("Start X:", 210, 115);
    inputstartX.position(210, 120);
    
    text("Start Y:", 210, 165);
    inputstartY.position(210, 170);
    
    text("Layers:", 210, 215);
    textLayers.position(210, 220);
    
    inputScaffolds.position (25,270)
    text("# of Scaffolds", 25, 265);
     
text("Layer Height (mm):", 210, 315);
inputLayerHeight.show();
inputLayerHeight.position(210, 320);

    // Bottom Controls
    startButton.show();
    startButton.position(25, 320);
    startButton.style('background-color', '#4CAF50');
    startButton.style('color', 'white');
    startButton.style('padding', '5px 15px');
    
    patternSelect.show();
    patternSelect.position(210, 270);
     
     aboutButton.hide();

  } else if (state === "APP") {
    drawPreview();
    aboutButton.hide();
  } else if (state === "DESIGN") {
    drawDesignView();
    aboutButton.hide();
  } else if (state === "ABOUT") {
    drawAboutPage();
  }
}










function doesStuff() {
  background(255);   // clear canvas
  x = 100;
  y = 100;
  Right = true;
  Up = true;
  sx = (int(inputSX.value()));
  sy = (int(inputSY.value())); 
  ps = (int(inputPS.value()))// IMPORTANT: convert string → number
 if(ps>0) { 
  iteratH = sy / ps;
  iteratH = round(sy/ps)
  iteratV = sx / ps;
  Layers();
 }
 }


function Layers() {
  let layerHeight = 0.2; 

  for (let i = 1; i <= lays; i += 1) {
    strokeWeight(1 + (i * 0.5));
    x = 0;
    y = 0;
    Right = true;
    Up = true;

    if (state === "APP" || state === "DESIGN") {
      gCode += "; --- STARTING LAYER " + i + " ---\n";
      
      let currentZ = (i - 1) * layerHeightVal;
      gCode += `G1 Z${currentZ.toFixed(3)} F300\n`;
      gCode += `G1 F${feedRate}\n`;

      if (i > 1) {
        slowTimeMinutes += (layerHeight / 300);
      }
    }

    if (patternType === "GRID") {
      HorizLines();
      VertLines();
    } else if (patternType === "TRIANGLE") {
      CenterMaker(0);
      Forward = true;
      OtherWays(0);
      
      CenterMaker(60);
      Forward = true;
      OtherWays(60);
      
      CenterMaker(120);
      Forward = true;
      OtherWays(120);
    }
  }
}





function move(newX, newY, isDrawing = true) {
  if (isDrawing) {
    // FIX: Track distance for every move
    totalDistance += dist(x, y, newX, newY);
    line(x, y, newX, newY);
  }
  x = newX;
  y = newY;

  if (state === "APP") {
    let finalX = (startX + x);
    let finalY = (startY + y);
    gCode += `G1 X${finalX.toFixed(3)} Y${finalY.toFixed(3)}\n`;
  }
}









function HorizLines() {
  for (let i = 0; i <= iteratH; i += 1) {
    if (Right == true) {
      // Use the move function to ensure distance is tracked consistently
      move(x + sx, y);
      CircleHoriz();
      Right = false;
    } else {
      move(x - sx, y);
      CircleHoriz();
      Right = true;
    }
  }
}



function CircleHoriz() {
  var cx = x;
  var cy = y;
  var centerx;
  var centery = y;

  if (Right == true) {
    centerx = x + loopSize;
    for (let i = -180; i <= 0; i += CircAcc) {
      let nextX = centerx + (loopSize * cos(i));
      let nextY = centery + loopSize * (sin(i));
      move(nextX, nextY); // FIX: Using move() tracks distance automatically
    }

    move(x, y + ps); // Move vertical segment
    centery += ps;

    for (let i = 0; i <= 180; i += CircAcc) {
      let nextX = centerx + (loopSize * cos(i));
      let nextY = centery + loopSize * (sin(i));
      move(nextX, nextY);
    }
  } else {
    centerx = x - loopSize;
    for (let i = 0; i <= 180; i += CircAcc) {
      let nextX = centerx + (loopSize * cos(i));
      let nextY = centery - loopSize * (sin(i));
      move(nextX, nextY);
    }

    move(x, y + ps);
    centery += ps;

    for (let i = 180; i <= 360; i += CircAcc) {
      let nextX = centerx + (loopSize * cos(i));
      let nextY = centery - loopSize * (sin(i));
      move(nextX, nextY);
    }
  }
}




function VertLines() {
  line(x, y, x, y - ps);
  if (state === "APP") {
    gCode += "G1 X" + ((startX + x)).toFixed(3) + " Y" + ((startY + y - ps)).toFixed(3) + "\n";
  }
  y -= ps;

  for (let i = 0; i <= iteratV; i += 1) {
    if (Up == true) {
      line(x, y, x, y - sy);
      if (state === "APP") {
        gCode += "G1 X" + ((startX + x)).toFixed(3) + " Y" + ((startY + y - sy)).toFixed(3) + "\n";
      }
      y -= sy;
      if (iteratH % 2 == 0) {
        CircleVertEVEN();
      } else {
        CircleVertODD();
      }
      Up = false;
    } else {
      line(x, y, x, y + sy);
      if (state === "APP") {
        gCode += "G1 X" + ((startX + x)).toFixed(3) + " Y" + ((startY + y + sy)).toFixed(3) + "\n";
      }
      y += sy;
      if (iteratH % 2 == 0) {
        CircleVertEVEN();
      } else {
        CircleVertODD();
      }
      Up = true;
    }
  }

  if (iteratH % 2 == 0) {
    if (iteratV % 2 == 0) {
      line(x, y, startX, startY);
      if (state === "APP") {
        gCode += "G1 X" + (startX).toFixed(3) + " Y" + (startY).toFixed(3) + "\n";
      }
      x = startX;
      y = startY;
    } else {
      line(x, y, x - 30, y);
      if (state === "APP") {
        gCode += "G1 X" + ((startX + x - 30)).toFixed(3) + " Y" + ((startY + y)).toFixed(3) + "\n";
      }
      x -= 30;
      line(x, y, x, startY);
      if (state === "APP") {
        gCode += "G1 X" + ((startX + x)).toFixed(3) + " Y" + (startY).toFixed(3) + "\n";
      }
      y = startY;
      line(x, y, startX, startY);
      if (state === "APP") {
        gCode += "G1 X" + (startX).toFixed(3) + " Y" + (startY).toFixed(3) + "\n";
      }
      x = startX;
    }
  } else {
    if (iteratV % 2 == 0) {
      if (state === "APP") {
        gCode += "G1 X" + ((startX + x)).toFixed(3) + " Y" + ((startY + y - 40)).toFixed(3) + "\n";
      }
      y -= 40;
      line(x, y, startX, y);
      if (state === "APP") {
        gCode += "G1 X" + (startX).toFixed(3) + " Y" + ((startY + y)).toFixed(3) + "\n";
      }
      x = startX;
      line(x, y, startX, startY);
      if (state === "APP") {
        gCode += "G1 X" + (startX).toFixed(3) + " Y" + (startY).toFixed(3) + "\n";
      }
      y = startY;
    } else {
      line(x, y, x + 30, y);
      if (state === "APP") {
        gCode += "G1 X" + ((startX + x + 30)).toFixed(3) + " Y" + ((startY + y)).toFixed(3) + "\n";
      }
      x += 30;
      line(x, y, x, startY - 40);
      if (state === "APP") {
        gCode += "G1 X" + ((startX + x)).toFixed(3) + " Y" + ((startY - 40)).toFixed(3) + "\n";
      }
      y = startY - 40;
      line(x, y, startX, startY - 40);
      if (state === "APP") {
        gCode += "G1 X" + (startX).toFixed(3) + " Y" + ((startY - 40)).toFixed(3) + "\n";
      }
      x = startX;
      line(x, y, startX, startY);
      if (state === "APP") {
        gCode += "G1 X" + (startX).toFixed(3) + " Y" + (startY).toFixed(3) + "\n";
      }
      y = startY;
    }
  }
}


function CircleVertODD() {
  var cx = x;
  var cy = y;
  var centerx = x;
  var centery;
  if (Up == true) {
    centery = y - loopSize;
    for (let i = -90; i >= -270; i -= CircAcc) {
      line(cx, cy, centerx + (loopSize * cos(i)), centery - loopSize * (sin(i)));
      if (state === "APP") {
        gCode += "G1 X" + ((startX + centerx + (loopSize * cos(i)))).toFixed(3) + " Y" + ((startY + centery - loopSize * (sin(i)))).toFixed(3) + "\n";
      }
      cx = centerx + loopSize * (cos(i));
      cy = centery - loopSize * (sin(i));
    }
    line(cx, cy, cx + ps, cy);
    if (state === "APP") {
      gCode += "G1 X" + ((startX + cx + ps)).toFixed(3) + " Y" + ((startY + cy)).toFixed(3) + "\n";
    }
    centerx += ps;
    cx += ps;
    for (let i = 90; i >= -90; i -= CircAcc) {
      line(cx, cy, centerx + (loopSize * cos(i)), centery - loopSize * (sin(i)));
      if (state === "APP") {
        gCode += "G1 X" + ((startX + centerx + (loopSize * cos(i)))).toFixed(3) + " Y" + ((startY + centery - loopSize * (sin(i)))).toFixed(3) + "\n";
      }
      cx = centerx + loopSize * (cos(i));
      cy = centery - loopSize * (sin(i));
    }
    x = cx;
    y = cy;
  }
  if (Up == false) {
    centery = y + loopSize;
    for (let i = 90; i <= 270; i += CircAcc) {
      line(cx, cy, centerx + (loopSize * cos(i)), centery - loopSize * (sin(i)));
      if (state === "APP") {
        gCode += "G1 X" + ((startX + centerx + (loopSize * cos(i)))).toFixed(3) + " Y" + ((startY + centery - loopSize * (sin(i)))).toFixed(3) + "\n";
      }
      cx = centerx + loopSize * (cos(i));
      cy = centery - loopSize * (sin(i));
    }
    line(cx, cy, cx + ps, cy);
    if (state === "APP") {
      gCode += "G1 X" + ((startX + cx + ps)).toFixed(3) + " Y" + ((startY + cy)).toFixed(3) + "\n";
    }
    centerx += ps;
    cx += ps;
    for (let i = -90; i <= 90; i += CircAcc) {
      line(cx, cy, centerx + (loopSize * cos(i)), centery - loopSize * (sin(i)));
      if (state === "APP") {
        gCode += "G1 X" + ((startX + centerx + (loopSize * cos(i)))).toFixed(3) + " Y" + ((startY + centery - loopSize * (sin(i)))).toFixed(3) + "\n";
      }
      cx = centerx + loopSize * (cos(i));
      cy = centery - loopSize * (sin(i));
    }
    x = cx;
    y = cy;
  }
}



function CircleVertEVEN() {
  var cx = x;
  var cy = y;
  var centerx = x;
  var centery;
  if (Up == true) {
    centery = y - loopSize;
    for (let i = -90; i <= 90; i += CircAcc) {
      line(cx, cy, centerx + (loopSize * cos(i)), centery - loopSize * (sin(i)));
      if (state === "APP") {
        gCode += "G1 X" + ((startX + centerx + (loopSize * cos(i)))).toFixed(3) + " Y" + ((startY + centery - loopSize * (sin(i)))).toFixed(3) + "\n";
      }
      cx = centerx + loopSize * (cos(i));
      cy = centery - loopSize * (sin(i));
    }
    line(cx, cy, cx - ps, cy);
    if (state === "APP") {
      gCode += "G1 X" + ((startX + cx - ps)).toFixed(3) + " Y" + ((startY + cy)).toFixed(3) + "\n";
    }
    centerx -= ps;
    cx -= ps;
    for (let i = 90; i <= 270; i += CircAcc) {
      line(cx, cy, centerx + (loopSize * cos(i)), centery - loopSize * (sin(i)));
      if (state === "APP") {
        gCode += "G1 X" + ((startX + centerx + (loopSize * cos(i)))).toFixed(3) + " Y" + ((startY + centery - loopSize * (sin(i)))).toFixed(3) + "\n";
      }
      cx = centerx + loopSize * (cos(i));
      cy = centery - loopSize * (sin(i));
    }
    x = cx;
    y = cy;
  }
  if (Up == false) {
    centery = y + loopSize;
    for (let i = 90; i >= -90; i -= CircAcc) {
      line(cx, cy, centerx + (loopSize * cos(i)), centery - loopSize * (sin(i)));
      if (state === "APP") {
        gCode += "G1 X" + ((startX + centerx + (loopSize * cos(i)))).toFixed(3) + " Y" + ((startY + centery - loopSize * (sin(i)))).toFixed(3) + "\n";
      }
      cx = centerx + loopSize * (cos(i));
      cy = centery - loopSize * (sin(i));
    }
    line(cx, cy, cx - ps, cy);
    if (state === "APP") {
      gCode += "G1 X" + ((startX + cx - ps)).toFixed(3) + " Y" + ((startY + cy)).toFixed(3) + "\n";
    }
    centerx -= ps;
    cx -= ps;
    for (let i = -90; i >= -270; i -= CircAcc) {
      line(cx, cy, centerx + (loopSize * cos(i)), centery - loopSize * (sin(i)));
      if (state === "APP") {
        gCode += "G1 X" + ((startX + centerx + (loopSize * cos(i)))).toFixed(3) + " Y" + ((startY + centery - loopSize * (sin(i)))).toFixed(3) + "\n";
      }
      cx = centerx + loopSize * (cos(i));
      cy = centery - loopSize * (sin(i));
    }
    x = cx;
    y = cy;
  }
}


function goToApp() {
  // 1. Assign values from input boxes to the variables
  sx = float(inputSX.value());
  sy = float(inputSY.value());
  ps = float(inputPS.value());
  loopSize = float(inputloopSize.value());
  startX = float(inputstartX.value());
  startY = float(inputstartY.value());
  lays = int(textLayers.value());
  numScaffolds = int(inputScaffolds.value());
  feedRate = float(inputSpeed.value());
  layerHeightVal = float(inputLayerHeight.value());
  totalDistance = 0;
  


  // 2. Starting positions
  x = 0;
  y = 0
  cx = 0;
  cy = 0;
  Right = true;
  Up = true;
  CircAcc = 30;

  // 3. Calculate iterations based on inputs
  iteratH = sy / ps;
  iteratV = sx / ps;

  // 4. Set the State to APP
  state = "APP";
  
  backButton.show();
  backButton.html('Back to Menu');
  backButton.position(width/2 - 180, 460);
  backButton.mousePressed(goToMenu);

  // 5. Run the math to create the G-Code
  gCode = ""; // Clear old code first
  generateLogic(); 

  // 6. Hide the Menu UI
  hideAllInputs();
  
  // 7. Show the App UI and fill the scroll box
  backButton.show();
  outputBox.show();
  showDesignButton.show();
  outputBox.value(gCode); // Sends the final G-code into the scroll box
}


function goToMenu() {
  state = "MENU";
  
  enterButton.hide(); // Hide the Get Started button
  
  // Show all the input boxes and the generator button
  inputSX.show();
  inputSY.show();
  inputPS.show();
  inputloopSize.show();
  inputstartX.show();
  inputstartY.show();
  textLayers.show();
  inputSpeed.show();
  inputScaffolds.show();
  startButton.show();
  patternSelect.show();
  aboutButton.show();
  
  backButton.show();
  backButton.position(25, 375);
  backButton.html('Back');
  backButton.mousePressed(welcomeUser);

  // Hide the navigation buttons from other screens
  outputBox.hide();
  showDesignButton.hide();
  saveButton.hide();
}



function generateLogic() {
  // 1. HEADER
  gCode = "G21 ; Set units to mm\n";
  gCode += "G90 ; Absolute positioning\n";
  //gCode += "G1 Z0.2 F300\n";

  let cols = 7; 
  
  // Store the actual starting point from the input box
  let baseStartX = float(inputstartX.value());
  let baseStartY = float(inputstartY.value());

  // 2. SCAFFOLD LOOP
  for (let s = 0; s < numScaffolds; s++) {
    let col = s % cols;
    let row = Math.floor(s / cols);
    
    let xOffset = col * (sx + (loopSize * 4) + 20);
    let yOffset = row * (sy + 100);

    gCode += "; --- STARTING SCAFFOLD " + (s + 1) + " ---\n";

    // Shift the global start positions for this specific scaffold
    startX = baseStartX + xOffset;
    startY = baseStartY + yOffset;

    x = 0;
    y = 0;
    Right = true;
    Up = true;

    // Move to the start of this specific scaffold
    gCode += "G0 X" + (startX).toFixed(3) + " Y" + (startY).toFixed(3) + "\n";

    // 3. CALL PATTERNS
    Layers();
  }

  // 4. FOOTER
  gCode += "G1 Z5 ; Lift tool up\n";
  gCode += "M30 ; Program End\n";
  
  // Reset startX/Y back to the UI values so the preview doesn't break
  startX = baseStartX;
  startY = baseStartY;
  
  
  
  
  
}



function drawPreview() {
  // Clear the area where the box sits to keep things clean
  background(220); // Or whatever your main background color is
  
  fill(0);
  textSize(18);
  textAlign(CENTER);
  text("CNC TOOLPATH GENERATED", width/2, 40);
  
  textSize(12);
  text("Use the box below to scroll through your G-Code", width/2, 65);
}

function goToDesign() {
  state = "DESIGN";
  outputBox.hide();
  showDesignButton.hide();
  backButton.show();
  saveButton.hide();
  
}


function drawDesignView() {
  // Reset totals before recalculating
  totalDistance = 0; 
  slowTimeMinutes = 0;
  background(220); 
  
  fill('black');
  stroke('black');
  strokeWeight(2);
  let boxX = width/2 - 175;
  let boxY = 60;
  let boxW = 350;
  let boxH = 250;
  rect(boxX, boxY, boxW, boxH);
  
  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(boxX, boxY, boxW, boxH);
  drawingContext.clip();
  
  let cols = 5; 
  let spacingX = sx + (loopSize * 4) + 20;
  let spacingY = sy + 100;

  let gridW = min(numScaffolds, cols) * spacingX;
  let gridH = ceil(numScaffolds / cols) * spacingY;

  let scaleW = (boxW - 40) / gridW;
  let scaleH = (boxH - 60) / gridH;

  let dynamicScale = min(scaleW, scaleH) * zoomScale;
  dynamicScale = constrain(dynamicScale, 0.01, 10.0);

  translate(width/2 + offsetX, boxY + 40 + offsetY); 
  scale(dynamicScale);
  
  stroke('#60FF10'); 
  strokeWeight(0.8 / dynamicScale); 
  
  let numInRow = min(numScaffolds, cols);
  let totalWidthOffset = (numInRow - 1) * spacingX;
  translate(-totalWidthOffset / 2, 0);
  
  for (let s = 0; s < numScaffolds; s++) {
    push();
    let col = s % cols;
    let row = Math.floor(s / cols);
    let xOffset = col * spacingX;
    let yOffset = row * spacingY;
    
    translate(xOffset, yOffset);
    x = 0;
    y = 0;
    Right = true;
    Up = true;
    Layers(); 
    pop();
  }  
  
  drawingContext.restore();
  pop();
  
  // TIME CALCULATION LOGIC
  let actualFeed = feedRate > 0 ? feedRate : 600; 
  // totalDistance already accounts for all layers and scaffolds because Layers() is called in the loop above
  let printingTimeMinutes = totalDistance / actualFeed;
  let totalTimeMinutes = printingTimeMinutes + slowTimeMinutes;
  
  let totalSeconds = Math.floor(totalTimeMinutes * 60);
  let mins = Math.floor(totalSeconds / 60);
  let secs = totalSeconds % 60;
  
  fill(225);
  noStroke();
  textSize(14);
  textAlign(LEFT);
  text("Estimated Print Time: " + mins + "m " + secs + "s", width/2 - 170, 290);
  
  fill(0);
  noStroke();
  textSize(16);
  textAlign(CENTER);
  text("VISUAL DESIGN PREVIEW", width/2, 40);
  
  
  fill(100);
  textSize(10);
  text("Scroll to Zoom | Drag to Move | Double-Click to Reset", width/2, 335);
}



function goToDesign() {
  
  state = "DESIGN";
  outputBox.hide();
  showDesignButton.hide();
  backButton.show();
  backButton.html('Back');
  backButton.position(width/2 - 174, 350);
  backButton.mousePressed(goToApp);
  saveButton.show();
  inputSpeed.hide();
  inputScaffolds.hide();
  saveButton.position(width/2 + 53, 350);
  patternSelect.hide();
  inputLayerHeight.hide();
  
}

function exportGCode() {
  let blob = new Blob([gCode], { type: 'text/plain'});
  let a = document.createElement('a');
  a.download = 'toolpath.txt';
  a.href = window.URL.createObjectURL(blob);
  a.click();
  window.URL.revokeObjectURL(a.href);
  
  
}

function mouseWheel(event) {
  if (state === "DESIGN") {
    // If scrolling up, zoom in. If scrolling down, zoom out.
    if (event.delta > 0) {
      zoomScale *= 0.9;
    } else {
      zoomScale *= 1.1;
    }
    // Block the actual browser page from scrolling
    return false;
  }
}


function partnerPattern() {
  CenterMaker(0);
  Forward = true;
  OtherWays(0);
  CenterMaker(60);
  Forward = true;
  OtherWays(60);
  CenterMaker(120);
  Forward = true;
  OtherWays(120);
}

function OtherWays(angle) {
  let truelength = sx;
  for (let i = 0; i <= iteratH; i += 1) {
    if (Forward == true) {
      move(x + truelength * cos(angle), y + truelength * sin(angle));
      move(x + ps * cos(angle + 90), y + ps * sin(angle + 90));
      Forward = false;
    } else {
      move(x + truelength * cos(angle + 180), y + truelength * sin(angle + 180));
      move(x + ps * cos(angle + 90), y + ps * sin(angle + 90));
      Forward = true;
    }
  }
}

function CenterMaker(angle) {
  Centerx = startX;
  Centery = startY;
  let tx = Centerx - (sx / 2) * cos(angle);
  let ty = Centery - (sy / 2) * sin(angle);
  tx -= (sx / 2) * cos(angle + 90);
  ty -= (sy / 2) * sin(angle + 90);
  x = tx;
  y = ty;
}


function mouseDragged() {
  if (state === "DESIGN") {
    let boxX = width/2 - 175;
    let boxY = 60;
    if (mouseX > boxX && mouseX < boxX + 350 && mouseY > boxY && mouseY < boxY + 250) {
      offsetX += mouseX - pmouseX;
      offsetY += mouseY - pmouseY;
    }
  }
}

function doubleClicked() {
  if (state === "DESIGN") {
    offsetX = 0;
    offsetY = 0;
    zoomScale = 1.0;
  }
}


function hideAllInputs() {
  inputSX.hide();
  inputSY.hide();
  inputPS.hide();
  inputloopSize.hide();
  inputstartX.hide();
  inputstartY.hide();
  textLayers.hide();
  inputSpeed.hide();
  inputScaffolds.hide();
  startButton.hide();
  patternSelect.hide();
  inputLayerHeight.hide();
}

function goToAbout() {
  state = "ABOUT";
  hideAllInputs();
  enterButton.hide();
  backButton.show();
  backButton.html('Back')
  backButton.position(width/2 - 20, 430);
  backButton.mousePressed(welcomeUser);
  aboutButton.hide();
}

function drawAboutPage() {
  background(255);
  
  // Technical grid
  stroke(235);
  for (let i = 0; i < width; i += 20) line(i, 0, i, height);
  for (let i = 0; i < height; i += 20) line(0, i, width, i);

  // White Card
  fill(255, 240);
  stroke(200);
  rect(30, 50, 340, 350, 15);

  // Content
  noStroke();
  fill(30);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(22);
  text("About This Tool", width/2, 90);

  textStyle(NORMAL);
  textSize(14);
  textAlign(CENTER);
  let aboutText = "This G-Code Generator is a specialized engineering tool for creating scaffolds. \n\nUsers can customize geometry and pore sizes to generate G-code for their scaffolds.\n\nThe purpose of the app is to allow medical professional to be able to generate their own G-code to create scaffolds instead of them relying on engineers. \n\nCreated in partnership with Metro Schools and the HAMMER ERC.";
  text(aboutText, 50, 130, 300, 300); // Wraps text inside a 300px box
  
  if (secondImg) {
    imageMode(CENTER);
    image(secondImg, width/2 - 90, 375, 120, 35);
  }
  if (logoImg) {
    imageMode(RIGHT);
    image(logoImg, width/2 + 90, 375, 75, 20);
  }
}

