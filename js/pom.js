'use strict'
var model = [];
let startTime = null;
let now = 0;
let clear = null;
var notification;

window.onload = function() {
    initUI();
    Notification.requestPermission(function(permission) {});
    clear = setInterval(timer, 1000);
}

var timer = function() {
    if (model.length == 0) {
        return 0;
        //console.log("!");
    } else {
        now += 20;
        let card = document.getElementsByClassName("timer");
        let content = Math.floor((model[0] - now) / 60) + ":" + ((model[0] - now) % 60);
        card[0].innerText = content;
        console.log(content, now, model, card[0]);
        //console.log(model);
        if (model[0] <= now + 2) {
            card[0].addEventListener("animationend", function(event) {
                //clearInterval(clear);
                let remove = document.getElementsByClassName("remove");
                let parent = document.getElementById("t");
                parent.removeChild(remove[0]);
                notifyMe("Hi there!" + model[0] / 60);
                model.shift();
                now = 0;
                console.log("!!!");
            }, false);
            card[0].classList.add("remove");
        }
    }
}

function initUI() {
    let button = document.getElementsByClassName("button");
    [].forEach.call(button, function(e) {
        e.onclick = function() {
            console.log(e.innerText.match(/\d+/)[0]);
            addTimer(e.innerText.match(/\d+/)[0]);
            //model.shift();
        };
    });
}

function addTimer(value) {
    let elements = document.getElementById("t");
    let newTimer = document.createElement("div");
    newTimer.setAttribute("class", "timer");
    let text = document.createTextNode(
        value + ":00");
    newTimer.appendChild(text);
    elements.appendChild(newTimer);
    value = value * 60;
    model.push(value);
}

/*
let element = document.getElementById("slidingMenu");
element.addEventListener("transitionend", function(event) {
  element.innerHTML = "Done!";
}, false);
*/

function notifyMe(message) {
    if (Notification.permission === "granted") {
        notification = new Notification(message);
    }
}
