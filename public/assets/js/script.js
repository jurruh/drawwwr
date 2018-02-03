// draw function
var mousePressed = false;
var lastX, lastY;
var ctx;

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");
    document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });

    ctx.canvas.width = window.visualViewport.width - 40;
    ctx.canvas.height = window.visualViewport.height - 40;

    $('#myCanvas').on('mousedown touchstart',(function (e) {
        mousePressed = true;
        var pos_x, pos_y, touch;
        touch = void 0;
        if (e.originalEvent.touches) {
        touch = e.originalEvent.touches[0];
        }
        pos_x = e.pageX || touch.pageX;
        pos_y = e.pageY || touch.pageY;
        Draw(pos_x - $(this).offset().left, pos_y - $(this).offset().top, false);
    }));

    $('#myCanvas').on('mousemove touchmove',(function (e) {
        if (mousePressed) {
            var pos_x, pos_y, touch;
            touch = void 0;
            if (e.originalEvent.touches) {
            touch = e.originalEvent.touches[0];
            }
            pos_x = e.pageX || touch.pageX;
            pos_y = e.pageY || touch.pageY;
            Draw(pos_x - $(this).offset().left, pos_y - $(this).offset().top, true);
        }
    }));

    $('#myCanvas').on('mouseup touchend',(function (e) {
        mousePressed = false;
    }));
    $('#myCanvas').on('mouseleave touchstop',(function (e) {
        mousePressed = false;
    }));
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}


function downloadImage() {
    var image = ctx.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
    window.location.href=image;
}