function pitch(){
    let divElement = document.getElementById("target");

    let elScale = {width: 1, height: 1}
    let elPos = {x:0, y:0, z:0}

    let posX = 0;
    let posY = 0;
    let prevPosX = 0;
    let prevPosY = 0;

    let el = document.querySelector("#obj_model");

    let baseDistance = 0;
    let baseWidth = 0;
    let baseHeight = 0;

    let timeoutId;

    divElement.addEventListener("touchmove", function(event) {
        event.preventDefault();
        let touches = event.changedTouches;

        if (touches.length > 1) {
            let x1 = touches[0].pageX;
            let y1 = touches[0].pageY;

            let x2 = touches[1].pageX;
            let y2 = touches[1].pageY;

            let distance = Math.sqrt(Math.pow(x2-x1, 2));
            clearTimeout(timeoutId);
        
            if (baseDistance && baseWidth && baseHeight) {
                let scale = distance / baseDistance;

                if (scale && scale != Infinity) {
                    elScale.width = baseWidth = baseWidth * scale;
                    elScale.height = baseHeight = baseHeight * scale;

                    el.setAttribute('scale', {x:elScale.width, y:elScale.height, z:elScale.width});
                }

                timeoutId = setTimeout(function() {
                    baseDistance = 0;
                    baseWidth = 0;
                    baseHeight = 0;
                }, 100);

            } else {
                if (posX == 0) {
                    prevPosX = touches[0].pageX;
                    prevPosY = touches[0].pageY;
                    posX = touches[0].pageX;
                    posY = touches[0].pageY;
                } else {
                    prevPosX = posX;
                    prevPosY = posY;
                    posX = touches[0].pageX;
                    posY = touches[0].pageY;
                }

                let distance = posX - prevPosX;
                let distance = posY - prevPosY;

                let offset = 30;

                elPos.x = elPos.x + distanceX / offset;
                elPos.y = elPos.y + distanceY / offset;

                el.setAttribute('position', {x:elPos.x, y:0, z:elPos.y});

            }
        });
    }
}