var myTime = {};
var myVideo;
var myImage;
var currentTime;
var expirationTime;

var days;
var hours;
var minutes;
var seconds;


var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var playerDefaults = {
    autoplay: 0,
    autohide: 1,
    modestbranding: 0,
    rel: 0,
    showinfo: 0,
    controls: 0,
    disablekb: 1,
    enablejsapi: 0,
    iv_load_policy: 3
};

function calculateRemaingTime() {
    console.log("calculate");
    var currentTime = new Date().getTime();
    console.log("current " + currentTime);
    var expirationTime = new Date(2020,12,01).getTime();
    console.log("expire " + expirationTime)
    var timeLeft = expirationTime-currentTime;

    days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

}

function displayTime() {
    console.log("dispalyTime");

    console.log("calculate");
    var currentTime = new Date().getTime();
    console.log("current " + currentTime);
    var expirationTime = new Date(2020,12,01).getTime();
    console.log("expire " + expirationTime)
    var timeLeft = expirationTime-currentTime;

    days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    display = document.querySelector('#time');
    localStorage.setItem("display", display);

    var myMinutes = minutes;
    var mySeconds = seconds;
    var myHours = hours;
    myImage = localStorage.getItem("myImage");
    var duration = (60 * Number(myMinutes)) + Number(mySeconds);

    localStorage.setItem("duration", duration);

    var timer = duration,
        minutes, seconds;

    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = hours + ":" + minutes + ":" + seconds;

    startTimer(timeLeft, display);
}

function showNuven() {
    var nuvenImage = document.getElementById("nuven");
    var nuvenText = document.getElementById("text");
    nuvenText.style.display ="block";
    nuvenImage.style.display ="inline";

}

function getCssValuePrefix() {
    var rtrnVal = ''; //default to standard syntax
    var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

    // Create a temporary DOM object for testing
    var dom = document.createElement('div');

    for (var i = 0; i < prefixes.length; i++) {
        // Attempt to set the style
        dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';

        // Detect if the style was successfully set
        if (dom.style.background) {
            rtrnVal = prefixes[i];
        }
    }

    dom = null;
    delete dom;

    return rtrnVal;
}

// SETTING BACKGROUND COLORS
var colorGradient = [{
    start: "#ff9a9e",
    end: "#fad0c4"
}, {
    start: "#a18cd1",
    end: "#fbc2eb"
}, {
    start: "#84fab0",
    end: "#8fd3f4"
}, {
    start: "a6c0fe",
    end: "#f68084"
}];
var orientation = "45deg";
var colors = ['#FAE03C', '#59C9D5', '#EF5229', '#86AF49', '#00939A', '#EF5C6E'];

var active = 0;
var b = 1;
var a = 1;
setInterval(function () {
    if (b != 1) {
        b = 1;
        a = 2;
    } else {
        b = 2;
        a = 1;
    }
    var currentBack = ".background" + b;
    // change background color of body
    //document.querySelector('body').style.backgroundimage = colors[active];
    document.querySelector(currentBack).style.backgroundImage = getCssValuePrefix() + 'linear-gradient(' + orientation + ', ' + colorGradient[active].start + ', ' + colorGradient[active].end + ')';
    //change button text hover color
    $("#myStyle").html('.button:hover {color: ' + colorGradient[active].start + '}');
    setTimeout(function () {
        document.querySelector('.background' + b).style.opacity = 1;
        document.querySelector('.background' + a).style.opacity = 0;
    }, 2000);

    active++;
    if (active == colorGradient.length) active = 0;
}, 20000);




// Find the right method, call on correct element

function launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    getTime();
}

function startTimer(duration, display) {
    console.log("StartTimre");
    display = document.querySelector('#time');
    setInterval(function () {
        var currentTime = new Date().getTime();
        var expirationTime = new Date(2020,12,01).getTime();
        var timeLeft = expirationTime-currentTime;
    
        days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
        minutes = minutes < 10 ? "0" + minutes: minutes;
        seconds = seconds <10 ? "0" + seconds: seconds;

        if(timeLeft>0){
            showNuven();
            clearInterval();
            display.textContent = "00" + ":" + "00" + ":" + "00";
        }
        else{
            display.textContent = hours + ":" + minutes + ":" + seconds;
            console.log(minutes + ":" + seconds);
        }

  
    }, 1000);
};

