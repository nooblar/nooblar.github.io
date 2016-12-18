//Countdown timer function
    var temp;
    var seconds;
    function countdown()
     {
    seconds = document.getElementById('countdown').innerHTML;
    seconds = parseInt(seconds, 10);
    if (seconds == 0)
    {
      temp = document.getElementById('countdown');
      temp.innerHTML = "";
      return;
    }
    seconds--;
    temp = document.getElementById('countdown');
    temp.innerHTML = seconds;
    timeout = setTimeout(countdown, 1000);
   }


//winner function
    function winner()
    {
    var images = document.getElementsByClassName('heart');
    for (var i =0; i < images.length; i++)
    {
        if(images[i].style.opacity == "0" && seconds == 0)
        {
            document.getElementById('text').innerHTML = "Winner!";
          }

    else if  (images[i].style.opacity !== "0" && seconds == 0)
        {
                document.getElementById('text').innerHTML = "Loser!";
          }
      }
}

//variables to draw canvas & boy image
        var Context = null;
        var blockHeight = 64;
        var blockWidth = 64;
        var boy_x = 700;
        var boy_y = 350;
        var boy_rotate = 0;
        var block1 = new Square("back.png");
        var block2= new Square("back.png");
        var boy = new Square("new.png");
        var spritesheet = new Spritesheet("new.png");
        var boy_is_moving = false;
        var boy_direction = 0;
        var map = [  ];
        var mapIndex = 0;

        //function to collect items on keyDown
          function check() {
          var top = $("#img0").css("top");
          var top1 = $("#img1").css("top");
          var top2 = $("#img2").css("top");
          var top3 = $("#img3").css("top");
          var top4 = $("#img4").css("top");
          var top5 = $("#img5").css("top");
          var left = $("#img0").css("left");
          var left1 = $("#img1").css("left");
          var left2 = $("#img2").css("left");
          var left3 = $("#img3").css("left");
          var left4= $("#img4").css("left");
          var left5 = $("#img5").css("left");
          if(left = 1100 && key.space) {
            if (top = 200 && boy_x  > 1000) {
                document.getElementById('img0').style.opacity = "0";
            }
          }
              if(left1 = 200 && key.space) {
                if(top1 = 650 && boy_x  < 230 && boy_x > 100 ) {
            document.getElementById('img1').style.opacity = "0";
          }
            }
            if(left2 = 430 && key.space) {
               if (top2 = 80 && boy_y  < 100) {
                document.getElementById('img2').style.opacity = "0";
            }
          }

           if(left3 = 630 && key.space) {
            if(top3 = 500 && boy_x  < 680) {
                document.getElementById('img3').style.opacity = "0";
            }
          }

          if(left4 = 900 && key.space) {
            if(top4 = 700 && boy_y  > 600) {
                document.getElementById('img4').style.opacity = "0";
            }
          }

          if(left5 = 100 && key.space) {
            if(top5= 270 && boy_x < 100) {
                document.getElementById('img5').style.opacity = "0";
            }
          }
      }

//a lot of functions for document.ready: delay for text animation before game starts
// draw canvas function,  refresh and initialize keyboard
// set timer and check winner function
        $(document).ready(function() {
            setTimeout(function() {
            $("#countdown").show(1000);

                }, 10000);
            setTimeout(function() {  $('#button1').show(1000); }, 27000); //new game button in the end
            setTimeout(function() { $('#hint2').show(500).hide(500); }, 6000); //"go"
            setTimeout(function() {$('#hint1').show(500).hide(500); }, 8000); //"ready?"
            setTimeout(function() { $('#hint').hide(500); }, 5000); // game instructions
            Context = new Screen ("game", 1450, 1000); //new canvas
           keyControls();
            noScrolls(); //remove scrolling
            countdown();
             winner();
            InitializeAnimationCounters();
        });

        $(window).load(function() {
        });
        setInterval(function() { //interval for animation and map
        ResetAnimation();
        newMap();
        check(); //collect items
        winner();
        //movement for Boy
            boy_is_moving = false;
            boy_direction = 0;
            if (key.left) { boy_x -= 1;  boy_direction |= DIR_W; boy_is_moving = true; }
            if (key.right) { boy_x += 1; boy_direction |= DIR_E; boy_is_moving = true; }
            if (key.up) { boy_y -= 1;    boy_direction |= DIR_N; boy_is_moving = true; }
            if (key.down) { boy_y += 1;  boy_direction |= DIR_S; boy_is_moving = true; }
           //set boy image pictute to first in array
            var boy_seq = 0;
            if (boy_is_moving)
            {
                if (boy_direction & DIR_W) boy_seq = [10,11,12,13,14,15,16,17];
                if (boy_direction & DIR_E) boy_seq = [28,29,30,31,32,33,34,35];
                if (boy_direction & DIR_N) boy_seq = [1,2,3,4,5,6,7,8];
                if (boy_direction & DIR_S) boy_seq = [19,20,21,22,23,24,25,26];
                //drawing boy on the screen
                boy.draw(boy_x, boy_y, boy_seq);
            }
            else
            {
                boy.draw(boy_x, boy_y, 0);
            }
        }, 1);


