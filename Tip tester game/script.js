// define my words
const words = [
    [
        "start",
        "actual",
        "resist",
        "paint",
        "divide",
        "double",
        "reveal",
        "resort",
        "real",
        "reveal",
        "rest",
        "resort",
        "rapid",
        "river",
        "party"
    ]
    ,
    [
        "distribution",
        "devote",
        "dramatic",
        "equally",
        "enough",
        "expect",
        "exercise",
        "engineer",
        "enhance",
        "familiar",
        "eliminate",
        "factory",
        "friendly",
        "director",
        "everything"
    ]
    ,
    [
        "grandmother",
        "immediately",
        "investigation",
        "knowledge",
        "necessarily",
        "nonetheless",
        "literature",
        "collection",
        "grandfather",
        "significance",
        "biological",
        "atmosphere",
        "assessment",
        "background",
        "collection"
    ]
    ,
    [
        "imagination",
        "independence",
        "intelligence",
        "manufacturing",
        "measurement",
        "recommendation",
        "transformation",
        "championship",
        "approximately",
        "administration",
        "transportation",
        "communication",
        "manufacturer",
        "comprehensive",
        "correspondent"
    ]
]


// global variables
let interval,
    j = 0, //=> the score
    s = 0, //=> the level
    i = 0, //=> the time
    chechMemo = localStorage.getItem(0);



// DOM element
const inputField = document.querySelector("#input");// define my input field
const screen = document.querySelector(".word");// my screen words
const conter = document.querySelector(".status");// my Conter + Score
const resetSection = document.querySelector(".reset-section");// reset section
const radioBtn = document.querySelector(".choose-level").getElementsByTagName("input");




screen.textContent = words[s][0];//== set the first word in the screen


// check the value of each Radio button
for (let x = 0; x < radioBtn.length; x++) { //=> loop throw the radio button to get th right value
    radioBtn[x].addEventListener("click", (e) => {
        if (radioBtn[x].checked) {
            i = Number(radioBtn[x].value); //=> get the value
            localStorage.setItem("0", i); //=> set the value to local storage
            clearInterval(interval); //=> stop the timer
            inputField.value = ""; //=> clear the input field
        }
        s = 0;//=> return to the first level
        screen.textContent = words[s][0];
        wordArea.innerHTML = "";
        conter.lastElementChild.style.color = "white";
        conter.children[1].textContent = `Score: 0 `;
        conter.firstElementChild.textContent = `TimeLeft : ${i}` //=>change the DOM element value
        document.getElementById("show-time").textContent = ` ${i}` //=>change the DOM element value
    });
};


// add focus event to input field
inputField.addEventListener("focus", (e) => {
    e.preventDefault();
    if ((!chechMemo && i) || (i && chechMemo)) {
        i;
    } else if (!i && chechMemo) {
        i = Number(localStorage.getItem(0));
    } else {
        i = 5;
    }

    interval = setInterval(timer, 1000)//==> run the function every 1 second
});

console.log(interval);

// run the timer 
function timer() { //====>PROBLEM FOR RAPIDE DECREMENT<========//
        i--;
    if (i <= 0) {
        resetSection.classList.add("show");
        clearInterval(interval);
        i = 0;
    };
    conter.firstElementChild.textContent = `TimeLeft:  ${i}`
};

let wordArea = document.querySelector(".status-words");//=> field to show the written word
// compare between [input] + [screenContent]
inputField.addEventListener("keyup", () => {
    if (inputField.value === screen.textContent && !resetSection.classList.contains("show")) {
        if (chechMemo !== null) {
            i = Number(localStorage.getItem(0)) + 1;
            wordArea.innerHTML += `<li>${inputField.value}</li>`
        } else {
            i = 6;
        }

        // transfer to the next level
        j += 20;
        if (j === 100) {
            s++; //===> increase the number of word level
            conter.lastElementChild.textContent = `Level : ${s}` //=> change the level conter
            wordArea.innerHTML += `<p>------------- More Difficulte Words </p>`;

            conter.lastElementChild.style.color = "green";

            j = 0; //=>return the score againe
        }

        conter.children[1].textContent = `Score:${j} `
        inputField.value = "";

        // change the word ======== get a rundom number 
        if (s !== words.length) {
            let rundom = parseInt(Math.floor(Math.random() * words[s].length));
            screen.textContent = words[s][rundom];
        } else {
            //prompt for win this level
            let theDiv = document.createElement("div"); //=> make a DIV
            theDiv.className = "winning";
            let p = document.createElement("p");//=> make a P
            p.textContent = "Congatulation you won this Level... Try in more advanced level"; //==> paragraphe
            let rButton = document.createElement("button");//=> reset button
            rButton.className = "reset";
            rButton.innerHTML = "Restart Now";
            theDiv.appendChild(p);
            theDiv.appendChild(rButton)
            screen.appendChild(theDiv);
        }
        // reset button 
        document.querySelectorAll(".reset").forEach(b => {
            b.addEventListener("click", reset)
        });
    };
});

// reset button
document.querySelectorAll(".reset").forEach(b => {
    b.addEventListener("click", reset)
});

// function for reset buttons
function reset(e) {
    e.preventDefault();

    resetSection.classList.remove("show");
    // in case the player won the game
    if (document.querySelector(".winning")) document.querySelector(".winning").remove();

    // get the i number from local storage
    if (localStorage.getItem(0) !== null) {
        i = Number(localStorage.getItem(0));
    } else if (chechMemo === null) {
        i = 5;
    }

    s = 0;//=> return to the first level
    screen.textContent = words[s][0]; //==> return the first word

    conter.lastElementChild.style.color = "white";

    clearInterval(interval); //=> stop the timer

    //change the DOM element value
    conter.firstElementChild.textContent = `TimeLeft : ${i}`
    document.getElementById("show-time").textContent = `${i}`

    conter.children[1].textContent = `Score: 0 `;
    conter.lastElementChild.textContent = `Level : 0`;

    wordArea.innerHTML = "";
    inputField.value = "";

}

/*************local storage***************/
if (chechMemo !== null) {
    conter.firstElementChild.textContent = `TimeLeft : ${localStorage.getItem(0)}`
    document.getElementById("show-time").textContent = ` ${localStorage.getItem(0)}`
    i = localStorage.getItem(0);
}



