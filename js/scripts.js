var g_id  = "#idPlans";
var g_lab = "#idSoftware";

// helper function to close the drawer when in mobile view
//
function closeNav() {
  var d = document.querySelector('.mdl-layout');
  d.MaterialLayout.toggleDrawer();
}

//  Fade out the old section and fade in the new.
//  Also highlight the new section btn.
//
var fadeIn = function(a_id) {
  var id = "#" + a_id;

  if(id === g_id) return;

  $(g_id).removeClass("mdl-component--active");
  $(g_id).addClass("mdl-component--inactive");

  $(g_id + "Btn").removeClass("mdl-button--raised");
  $("#" + a_id + "Btn").addClass("mdl-button--raised");
  $(g_id + "Btn2").removeClass("mdl-button--raised");
  $("#" + a_id + "Btn2").addClass("mdl-button--raised");

  setTimeout(function() {
    $(id).removeClass("mdl-component--inactive");
    $(id).addClass("mdl-component--active");
    g_id = id;
  }, 500)
};

// Get the image into the canvas element on the page.
//
var imageObj = new Image(),
    context;
imageObj.onload = function() {
  context = document.getElementById('idCanvas').getContext('2d');
  context.drawImage(imageObj, 0, 0);

  // setup click listeners for the buttons
  document.getElementById('idSoftware').addEventListener("click", drawSoftware);
  document.getElementById('idElectronic').addEventListener("click", drawElectronic);
  document.getElementById('idSewing').addEventListener("click", drawSewing);
  document.getElementById('idWood').addEventListener("click", drawWood);

  drawSoftware(true);
};
imageObj.src = 'imgs/download.jpg';

// helper function to clear the area.
//
var clearDraw = () => {
  context.clearRect(0, 0, 1500, 1125);
  context.drawImage(imageObj, 0, 0);
  context.beginPath();
}

// helper function to clear the area and update the
// selected lab button.
var preDraw = function(a_tab) {
  clearDraw();

  $(g_lab).removeClass("mdl-button--raised");
  $(a_tab).addClass("mdl-button--raised");
  g_lab = a_tab;
}

//            x     y    size
var home = [ [900,  180, 100], // table
             [900,  280, 100], // table
             [900,  380, 100], // table
             [1400, 180, 50],  // desk
             [1370, 180, 50],  // desk
             [1330, 180, 50],  // desk
             [1400, 180, 50], // desk
             [1370, 180, 50], // desk
             [1330, 180, 50], // desk
             [1400, 180, 50], // desk
             [1370, 180, 50], // desk
             [1330, 180, 50], // desk
             [1400, 180, 50], // desk
             [1370, 180, 50], // desk
             [1330, 180, 50]  // desk
          ],
    curPos = home.slice(0); // clone
    nextPos = Array(15).fill([]);

// draw a square
//
var draw = function(x, y, size) {
  context.rect(x,y,size,size);
}

// helper method to check if an 2 arrays with 2 values are equvilent.
//
var checkScalar = (a, b) => {
  return a.length==b.length && a.every(function(v,i) { return v === b[i]});
}

// animate the motion of desks in the space.
// return a promise to be resolved once the animation is complete.
//
var animate = function()  {
  var done = 0xff,
      step = (a, b) => {
        for(var i=0; i<2; ++i) {
          if(a[i] !== b[i]) {
            a[i] += ((a[i]-b[i]) < 0) ? 10 : -10;
          }
        }
      };

  return new Promise((resolve, reject) => {
    var tick = () => {
      clearDraw();
      for(var i=0; i<15; i++) {
        if(checkScalar( curPos[i], nextPos[i])) {
          done &= (~(1<<i));
          draw(curPos[i][0], curPos[i][1], curPos[i][2]);
        } else {
          step(curPos[i], nextPos[i]);
          draw(curPos[i][0], curPos[i][1], curPos[i][2]);
        }
      }
      context.fill();
      context.stroke();
    },

    timer = setInterval( () => {
      if(done !== 0) {
        tick();
      } else {
        clearInterval(timer);
        resolve();
      }
    }, 100);
  });
}

// helper function to fill in an array for the different labs.
//
var fillArray = function( a_x,     a_y,    a_size,
                          a_xsize, a_ysize,
                          a_xoff,  a_yoff, a_idx, a_arr ) {
  var i,j;
  for( i=0; i<a_xsize; ++i) {
    for( j=0; j<a_ysize; ++j) {
      a_arr[i*a_yoff+j+a_idx] = [ a_x+i*a_xoff, a_y+j*a_yoff, a_size ];
    }
  }
}

// when software lab is clicked draw desks.
// init: the initial call to show on startup.
//
var drawSoftware = function(a_init) {
  preDraw("#idSoftware");
  var myFillArray = function(a_arr) {
    fillArray( 1050, 230, 50,
               3,    4,
               100,  100, 3, a_arr );
  };


 //  if(a_init === true) {
 //    myFillArray(curPos);
 //  } else {
 //     nextPos = home.slice(0);
 //     animate().then(() => {
 //         myFillArray(nextPos);
 //         animate().then(() => {
 //             myFillArray(curPos);
 //         });
 //     });
 // }

  for(i=0; i<3; i++) {
    for(j=0; j<4; j++) {
      draw(1050+i*100, 230+j*100, 50);
    }
  }

  context.fill();
  context.stroke();
}

// when software lab is clicked draw desks.
var drawElectronic = function() {
  preDraw("#idElectronic");
  var ix = 1000,
      iy = 300,
      size=50;

  for(i=0; i<3; i++) {
    for(j=0; j<3; j++) {
      draw(ix+i*100, iy+j*100, size);
    }
  }

  context.fill();
  context.stroke();
};

// when software lab is clicked draw desks.
var drawSewing = function() {
  preDraw("#idSewing");

  var ix = 1000,
      iy = 300,
      size=50;

  for(i=0; i<2; i++) {
    for(j=0; j<2; j++) {
      draw(ix+i*150, iy+j*150, size);
    }
  }

  context.fill();
  context.stroke();
};

// when software lab is clicked draw desks.
var drawWood = function() {
  preDraw("#idWood");

  // home.forEach((x) => {
  //   draw(x[0],x[1],x[2]);
  // });

  context.rect(900,280,100,100);
  context.rect(1100,350,100,100);
  context.rect(1000,500,100,100);


  context.fill();
  context.stroke();
};
