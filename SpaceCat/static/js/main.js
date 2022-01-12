function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getTop(t) {
    return (((t = document.documentElement) || (t = document.body.parentNode)) &&
        typeof t.scrollTop == 'number' ? t : document.body).scrollTop
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function disappear(fadeTarget) {
    var fadeEffect = setInterval(function() {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 200);
}

let mainButton = document.querySelector("#mainButton");

let cat = document.getElementById("hero");

var gamearea = document.getElementById("gameArea");

cat.style.marginTop = (gamearea.clientHeight / 2) + "px";
cat.style.marginLeft = (gamearea.clientWidth / 6) + "px";

var returnToPositionInterval = null;

let timerID;
let counter = 0;
let score = 0;

mainButton.addEventListener("mousedown", pressingDown, false);
mainButton.addEventListener("mouseup", notPressingDown, false);
mainButton.addEventListener("mouseleave", notPressingDown, false);

mainButton.addEventListener("touchstart", pressingDown, false);
mainButton.addEventListener("touchend", notPressingDown, false);

function pressingDown(e) {
    requestAnimationFrame(timer);
    e.preventDefault();
}

function notPressingDown(e) {
    cancelAnimationFrame(timerID);
    counter = 0;
    mainButton.style.background = "#ba1e68";
    returnToPositionInterval = setInterval(function() {
        if (parseInt(cat.style.marginTop, 10) < (gamearea.clientHeight / 2)) {
            cat.style.marginTop = parseInt(cat.style.marginTop, 10) + 1.2 + "px";
        }
    }, 70);
}

function timer() {
    timerID = requestAnimationFrame(timer);
    counter++;
    moveCat(counter);
}

function moveCat(counter) {
    if (returnToPositionInterval !== null) {
        clearInterval(returnToPositionInterval);
    }
    mainButton.style.background = "#5643fd";
    cat.style.marginTop = (parseInt(cat.style.marginTop, 10) - 2) + "px";
}

// random asteroids

var asteroids = [];

function createAndMoveAsteroid() {
    var asteroidMovementType = Math.floor(Math.random() * (3 - 1 + 1) + 1);

    function moveThatAsteroid() {
        asteroid.style.marginLeft = (gamearea.clientWidth - initMargin) + "px";
        asteroid.style.marginTop = initMarginTop + "px";
        if ((initMarginTop >= parseInt(gamearea.clientHeight, 10)) || (initMarginTop <= getTop(gamearea))) {
            clearInterval(moveAsteroid);
            disappear(asteroid);
            gamearea.removeChild(asteroid);
            var index = asteroids.indexOf(asteroid);
            if (index > -1) {
                asteroids.splice(index, 1);
            }
            asteroid = null;
            createAndMoveAsteroid()
            return;
        }
        if (asteroidMovementType === 1) {
            initMarginTop = initMarginTop + 5;
        }
        if (asteroidMovementType === 2) {
            initMarginTop = initMarginTop - 5;
        }
        if (asteroidMovementType === 3) {
            initMarginTop = initMarginTop;
        }
        initMargin += 5;
    }
    var asteroid = document.createElement("img");
    asteroid.src = "static/images/asteroid.png";
    asteroid.classList.add("asteroidSprite");
    asteroids.push(asteroid);
    gamearea.appendChild(asteroid);
    var initMargin = 40;
    asteroid.style.marginLeft = (gamearea.clientWidth - 40) + "px";
    asteroid.style.marginTop = (gamearea.clientHeight - getRandomArbitrary(2, gamearea.clientHeight)) + "px";
    var initMarginTop = parseInt(asteroid.style.marginTop, 10);
    var moveAsteroid = setInterval(moveThatAsteroid, 60)
}

async function createAsteroids() {
    createAndMoveAsteroid()
    await sleep(2000);
    if (score > 300) {
        createAndMoveAsteroid()
        await sleep(1000);
    }
    if (score > 1000) {
        createAndMoveAsteroid()
        await sleep(1000);
    }
}

var astroidMaker = setInterval(createAsteroids, 2000);
var collisionChecker = setInterval(function() {
    asteroids.forEach(function(e) {
        var rect1 = cat.getBoundingClientRect();
        var rect2 = e.getBoundingClientRect();
        var overlap = !(rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom)
        if (overlap) {
            document.getElementById("gameEnd").style.display = "block";
            document.getElementById("finalScore").innerText = score;
            for (var i = 1; i < 300; i++) {
                clearInterval(i);
            }
        }
    })
}, 10)

var increaseScoreAccordingToTimeElapsed = setInterval(function() {
    score += 1;
    document.getElementById("score").innerText = score;
}, 4000)


function saveScreenShot() {
    if (navigator.userAgent.indexOf("Firefox") > 0) {
        alert("Hello Firefox friend! You need to allow HTML Canvas for this page to download the score properly! If you have already done this, please ignore ;-;")
    }
    html2canvas(document.body).then(
        function(canvas) {
            let downloadLink = document.createElement('a');
            downloadLink.setAttribute('download', 'spaceCat_' + score + '.png');
            canvas.toBlob(function(blob) {
                let url = URL.createObjectURL(blob);
                downloadLink.setAttribute('href', url);
                downloadLink.click();
            })
        })
}