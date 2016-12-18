
var Square = function(fn) {
    this.radiance = Math.PI/180;
    this.image = null;
    this.imPattern = false;
    this.pattern = null;
    this.pattern_x_times = 0;
    this.load = function(filename) { this.image = new Image(); this.image.src = filename; return this; };
    this.to_pattern = function(x_times) { this.pattern_x_times = x_times; this.pattern =
        Context.context.createPattern(this.image, 'repeat'); this.imPattern = true; };
    this.image = null;
    this.spritesheet = null;

    // Load from spritesheet
    if (fn instanceof Spritesheet)
    {
        this.spritesheet = fn;
        this.image = this.spritesheet.image;
    }
    else
    // Load from sprite
    if (fn != undefined && fn != "" && fn != null)
    {
        this.load(fn);

    }
    else
    {
            console.log("qq");
    }

    this.draw = function(x, y, various)
    {
        // Draw regular sprite
        if (various == undefined)
        {
            Context.context.drawImage(this.image, x, y, blockWidth, blockHeight);
        } else

        // If various is a single numeric frame id
        if ($.isNumeric(various) && various >= 0) {
            var res = i2xy(various, 1);
            Context.context.drawImage(this.image, res[0]*64, res[1]*64, 64, 64, x, y, 100, 100);
        } else

        // if various is Animation Sequence - an array like [1,2,3,4,5,6,7,8]
        if (various.length != undefined && various.length > 0)
        {
            if (AnimationCounter[aCounterIndex].aDelay++ >= 5) {
                AnimationCounter[aCounterIndex].aDelay = 0;
                AnimationCounter[aCounterIndex].aCounter++;
                if (AnimationCounter[aCounterIndex].aCounter >= various.length)
                    AnimationCounter[aCounterIndex].aCounter = 0;
                AnimationCounter[aCounterIndex].aCurrentFrame =
                various[AnimationCounter[aCounterIndex].aCounter];
            }
            var res = i2xy(AnimationCounter[aCounterIndex].aCurrentFrame, 9);
            Context.context.drawImage(this.image, res[0]*64, res[1]*64, 64, 64, x, y, 100, 100);
            aCounterIndex++;
        }
    };

};

var Spritesheet = function(filename)
{
    this.image = new Image();
    this.image.src = filename;
};

//function to transform  boy map coordinates(index in array) to x,y coordinates
function i2xy(index, mapWidth)
{
    var x = index % mapWidth;
    var y = Math.floor(index/mapWidth);
    return [x, y];
}

//function to transform x,y coordinates back to array number
function xy2i(x, y, mapWidth)
{
    return y * mapWidth + x;
}

//disable scroll bars
function noScrolls()
{
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
}

//reset animation on window load
function ResetAnimation()
{

}

// draw map 40 blocks by x and 20 blocks by y using png items
function newMap()
{
    mapIndex = 0;
    for (var y = 0; y < 20; y++)
    {
        for (var x = 0; x < 40; x++, mapIndex++)
        {
            var tile_x = x * blockWidth;
            var tile_y = y * blockHeight ;
            var tileType = map[mapIndex];
            if (tileType == 0) block1.draw(tile_x, tile_y);
            else
                block2.draw(tile_x, tile_y);
        }
    }
}


var Animation = function(aDelay, aCounter, aCurrentFrame)
{
    this.aDelay = aDelay; //delay beetwen slides
    this.aCounter = aCounter; //number of icture in array
    this.aCurrentFrame = aCurrentFrame; //current picture on the screen
};

var aCounterIndex = 0; //first picture in array for Boy animation
var AnimationCounter = new Array();

//
function InitializeAnimationCounters()
{
    for (var i = 0; i < 32000; i++) //32000 animated pictures avaliable
        AnimationCounter[i] = new Animation(0, 0, 0);
}

function ResetAnimation()
{
    aCounterIndex = 0;
}
