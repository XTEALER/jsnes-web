/* by XTEALER (github: https://github.com/XTEALER)
   Contact Me at: humberto0118@gmail.com || humberto.deleon1@utp.ac.pa
   SUBJECT: GITHUB - $PROJECT
   MY VERSION OF THIS APP ONLINE: http://xtealer.tk
    
    this is a factoring of the original project, you can check it on here: https://github.com/bfirsh/jsnes-web
    to add new roms to the app, you just run put the new roms in the './public/roms' folder,
    remake the config file (the new list of games goes into configNew.js) and copy the string inside the ouput
    file (again ./src/configNew.js) to the corresponding line/s (line 3) inside config.js

    hope you enjoy!

    COMING UPDATES:
    -MULTIPLAYER (LOCAL AND INTERNET)
    -SAVE GAME STATE(LOCALLY)
    -SUPPORT FOR DEVICES WITHOUT PHYSICAL KEYBOARD (ON SCREEN JOYSTICK)
*/

const romsfolder = "../roms/";
const extraroms = "../public/roms";
const fs = require("fs");
const config = {
  ROMS: {}
};
var x = 0;

//  WRITES MODIFIED OBJECT TO FILE
var writeromslist = function() {
  fs.writeFile(
    "./configNew.js",
    JSON.stringify(config.ROMS, false, 2),
    function(err, data) {
      if (err) console.log(err);
    }
  );
  console.log(config.ROMS);
};

// CREATES NEW PROPERTIES INSIDE OBJECT
var addroms = function(rom) {
  for (x in rom) {
    romName = rom[x].split(".nes").shift();
    config.ROMS[romName] = {
      name: romName,
      url: romsfolder + rom[x]
    };
  }
};

// READS ROMS FOLDER AND CREATES A LIST OF ITS CONTENTS
var makeromslist = function() {
  fs.readdir(extraroms, (e, rom) => {
    if (e !== null) {
      console.log(e);
    } else {
      addroms(rom);
      writeromslist();
    }
  });
};
makeromslist();
