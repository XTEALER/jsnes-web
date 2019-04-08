
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
const extraroms = './public/roms';
const fs = require('fs');
const config = {
    ROMS: {

    },
    GOOGLE_ANALYTICS_CODE: 'process.env.REACT_APP_GOOGLE_ANALYTICS_CODE',
    SENTRY_URI: 'process.env.REACT_APP_SENTRY_URI'
};
var x = 0;

//  WRITES MODIFIED OBJECT TO FILE
var writeromslist = function (data) {
    this.data = data;
    fs.writeFile("./src/configNew.js", "const config = " + this.data + ";", function (err, data) {
        if (err) console.log(err);
        console.log(this.data);
    });
};

// CREATES NEW PROPERTIES INSIDE OBJECT
var addroms = function (rom) {
    for (x in rom) {
        romName = 'rom-' + rom[x];
        config.ROMS[romName] = {
            name: rom[x],
            url: romsfolder + rom[x]
        };
    };
};

// READS ROMS FOLDER AND CREATES A LIST OF ITS CONTENTS
var makeromslist = function () {
    fs.readdir(extraroms, (e, rom) => {
        if (e !== null) {
            console.log(e);
        } else {
            addroms(rom);
            writeromslist(JSON.stringify(config, false, ''));
        }
    });
};
makeromslist();
