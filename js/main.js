const grid = document.querySelector("div[class='grid']");
const animateButton = document.getElementById("animate-button");
const stopAnimateButton = document.getElementById("stop-animate-button");
const cycleAnimateButton = document.getElementById("cycle-animate-button");
const changeAnimateSpeedButton = document.getElementById("change-animate-speed-button");
const coll = document.getElementsByClassName("collapsible");
const gridItems = grid.getElementsByClassName("grid-item");

var colors = ["white", "orange", "red"];
var colorsLoopCount = 0;

function send_num_tiles() {
    console.log(`There are ${gridItems.length} tiles in this grid!`);
}

function assign_color_ids_to_grid_elements() {
    for (var i = 0; i < gridItems.length; i++) {
        var gridItem = gridItems[i];
        gridItem.id = colors[colorsLoopCount];
        colorsLoopCount++;
        if (colorsLoopCount >= 3) {
            colorsLoopCount = 0;
        }
        console.log(`Tile #${i + 1}'s color id: ${gridItem.id}`);
        console.log(gridItem);
    }
}

function animate() {
    for (var i = 0; i < gridItems.length; i++) {
        var gridItem = gridItems[i];
        switch (gridItem.id) {
            case "white":
                gridItem.id = "orange";
                break;
            case "orange":
                gridItem.id = "red";
                break;
            case "red":
                gridItem.id = "white";
                break;
            default:
                console.log(`ERROR: Element ${gridItem} has no ID!`)
        }
    }
}

var animationInterval = null;

function startAnimationInterval() {
    animationInterval = setInterval(animate, 1000);
}

function stopAnimationInterval() {
    clearInterval(animationInterval);
}

function toggleCollapse() {
    this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
}

function changeAnimationSpeed(newAnimationSpeed) {
    clearInterval(animationInterval);
    animationInterval = setInterval(animate, newAnimationSpeed);
}

function getNewAnimationSpeed() {
    var newSpeed = prompt("What will the new speed be? (Enter how many milliseconds it should take to load each frame. 1 second = 1000 Milliseconds)");
    changeAnimationSpeed(newSpeed);
}

(function() {
    send_num_tiles();
    assign_color_ids_to_grid_elements();
    animateButton.addEventListener("click", startAnimationInterval);
    stopAnimateButton.addEventListener("click", stopAnimationInterval);
    cycleAnimateButton.addEventListener("click", animate);
    changeAnimateSpeedButton.addEventListener("click", getNewAnimationSpeed);
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", toggleCollapse);
    }
}())
