





const lines = document.querySelectorAll(".line")
let currentLine = 0;


function isVisibleToUser(elem) {
    const rect = elem.getBoundingClientRect();
    return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= window.innerHeight &&
        rect.left <= window.innerWidth
    );
}


setInterval(()=> {
    lines.forEach(line => {
        line.classList.remove("active")
    })
    lines[currentLine].classList.add("active")
    currentLine = (currentLine + 1) % lines.length;
},400);













//#region Incorrect Example Movement CodeNote: This code uses keydown/keyup events which can lead to missed inputs
const demoLines_w = document.querySelectorAll(".line_w");
const demoLines_s = document.querySelectorAll(".line_s");
const demoLines_d = document.querySelectorAll(".line_d");
const demoLines_a = document.querySelectorAll(".line_a");

const redPoint = document.getElementById("red_point_to_move");
const step = 0.2;
const point_coords = document.getElementById("point_location");

const svg_wrong = document.getElementById("Moving_Graph");
const svgRect_wrong = svg_wrong.getBoundingClientRect();

const minX_wrong = 0;
const maxX_wrong = 12;
const minY_wrong = 0;
const maxY_wrong = 12;


let x = parseFloat(redPoint.getAttribute("cx"));
let y = parseFloat(redPoint.getAttribute("cy"));

function clearDemo() {
    demoLines_w.forEach(l => l.classList.remove("active"));
    demoLines_s.forEach(l => l.classList.remove("active"));
    demoLines_d.forEach(l => l.classList.remove("active"));
    demoLines_a.forEach(l => l.classList.remove("active"));
}

//  keep track of current key to block repeats and multiple keys
let activeKey = null;

document.addEventListener("keydown", (event) => {
    //  ignore if a key is already being processed
    if (!isVisibleToUser(red_point_to_move)) return;
    if (activeKey) return;

    activeKey = event.key; // lock in this key

    clearDemo();

    if(activeKey === "w") {
        y -= step;
        demoLines_w[0].classList.add("active");
        setTimeout(() => demoLines_w[1].classList.add("active"), 100);
        setTimeout(clearDemo, 400);
    }
    else if(activeKey === "s") {
        y += step;
        demoLines_s[0].classList.add("active");
        setTimeout(() => demoLines_s[1].classList.add("active"), 100);
        setTimeout(clearDemo, 400);
    }
    else if(activeKey === "d") {
        x += step;
        demoLines_d[0].classList.add("active");
        setTimeout(() => demoLines_d[1].classList.add("active"), 100);
        setTimeout(clearDemo, 400);
    }
    else if(activeKey === "a") {
        x -= step;
        demoLines_a[0].classList.add("active");
        setTimeout(() => demoLines_a[1].classList.add("active"), 100);
        setTimeout(clearDemo, 400);
    }
    x = Math.min(Math.max(x, minX_wrong), maxX_wrong);
    y = Math.min(Math.max(y, minY_wrong), maxY_wrong);


    // update dot position
    redPoint.setAttribute("cx", x);
    redPoint.setAttribute("cy", y);
    point_coords.textContent = "(" + (x-1).toFixed(2) + ", " + (y-1).toFixed(2) + ")";
});

// ❌ release the key lock only when key is lifted
document.addEventListener("keyup", (event) => {
    if(event.key === activeKey) activeKey = null;
});
//#endregion Incorrect Example Movement Code


//#region Move Up Text Elements
const details_of_code_example = document.getElementById("code_example_summary"); 
details_of_code_example.style.position = "relative";
details_of_code_example.style.top = "-40vh";

const pseudocodeProblems = document.getElementById("Pseudocode_problems_to_move_up");
pseudocodeProblems.style.position = "relative";
pseudocodeProblems.style.top = "-40vh";
//#endregion Move Up Text Elements



//#region Correct Example Movement Code

const red_point_to_move_correct = document.getElementById("red_point_to_move_correct");
const point_location_of_correct_eg = document.getElementById("point_location_of_correct_eg");
let x_right = parseFloat(red_point_to_move_correct.getAttribute("cx"));
let y_right = parseFloat(red_point_to_move_correct.getAttribute("cy"));
const step_correct = 0.1;
const svg = document.getElementById("Moving_Graph_right"); // replace with your SVG's ID
const svgRect = svg.getBoundingClientRect();


const minX_correct = 0;
const maxX_correct = 12;
const minY_correct = 0;
const maxY_correct = 12;


const keysCorrect = {};
document.addEventListener("keydown", (event) => {
    keysCorrect[event.key] = true;
});
document.addEventListener("keyup", (event) => {
    keysCorrect[event.key] = false;
});

function gameLoopCorrect() {
    updateCorrectMovement();
    requestAnimationFrame(gameLoopCorrect);
}

requestAnimationFrame(gameLoopCorrect);





function updateCorrectMovement() {

    if (!isVisibleToUser(red_point_to_move_correct)) return;
    if (keysCorrect["w"]) y_right -= step_correct;
    if (keysCorrect["s"]) y_right += step_correct;
    if (keysCorrect["a"]) x_right -= step_correct;
    if (keysCorrect["d"]) x_right += step_correct;

x_right = Math.min(Math.max(x_right, minX_correct), maxX_correct);
y_right = Math.min(Math.max(y_right, minY_correct), maxY_correct);





    red_point_to_move_correct.setAttribute("cx", x_right);
    red_point_to_move_correct.setAttribute("cy", y_right);

    point_location_of_correct_eg.textContent =
        "(" + (x_right - 1).toFixed(2) + ", " + (y_right - 1).toFixed(2) + ")";
}

//#endregion Correct Example Movement Code
