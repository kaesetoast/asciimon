(function(root, factory) {
    if (typeof define === 'function' && define.amd) define(factory);
    else if (typeof exports === 'object') module.exports = factory();
    else root.asciimon = factory();
}(this, function() {

    function asciimon(stage, monsterFile) {
        'use strict';

        var monster,
            currentFrame = 0,
            lastTimestamp;

        function init() {
            getMonster();
        }

        function draw(timestamp) {
            var progress;
            if (typeof lastTimestamp === 'undefined') {
                lastTimestamp = timestamp;
            }
            progress = timestamp - lastTimestamp;
            if (progress > 150) {
                stage.innerHTML = monster[currentFrame];
                currentFrame = (currentFrame + 1) % monster.length;
                lastTimestamp = timestamp;
            }
            window.requestAnimationFrame(draw);
        }

        function parseMonster(monsterData) {
            monster = monsterData.split('===\n');
            window.requestAnimationFrame(draw);
        }

        function getMonster() {
            var xmlhttp;
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
            }

            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    parseMonster(xmlhttp.responseText);
                }
            };

            xmlhttp.open('GET', monsterFile, true);
            xmlhttp.send();
        }

        init();
    }

    return asciimon;
}));
