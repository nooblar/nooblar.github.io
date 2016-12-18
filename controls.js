var Controls = function() {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.space = false;
};

//key codes
var space = 32;
var keyLeft = 37;
var keyRight = 39;
var keyUp = 38;
var keyDown = 40;

var DIR_E = 1;
var DIR_N = 4;
var DIR_W = 16;
var DIR_S = 64;
window.key = null;

//set and refresh keyboard controls
function keyControls()
{
    window.key = new Controls();
    $(document).keydown(function(e) {
        if (e.keyCode == keyLeft) { key.left = true; }
        if (e.keyCode == keyRight) { key.right = true; }
        if (e.keyCode == keyUp) { key.up = true; }
        if (e.keyCode == keyDown) { key.down = true; }
        if (e.keyCode == space) { key.space= true; }
    });

    $(document).keyup(function(e) {
        if (e.keyCode == keyLeft) { key.left = false; }
        if (e.keyCode == keyRight) { key.right = false; }
        if (e.keyCode == keyUp) { key.up = false; }
        if (e.keyCode == keyDown) { key.down = false; }
        if (e.keyCode == space) { key.space= false; }
    });
}
