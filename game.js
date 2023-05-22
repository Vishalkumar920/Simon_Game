let level = 0;
let start = false;
let sequence = []
let humanSequence = []

const title = document.querySelector('#level-title')

const btnPressed = document.querySelectorAll('.btn')
btnPressed.forEach((element, i) => {
    btnPressed[i].addEventListener('click', () => {
        humanSequence.push(btnPressed[i].id)
        handleClick(btnPressed[i].id)
    })
});

nextLevel = () => {
    level++
    title.innerHTML = "level " + level
    sequence.push(nextColor())

    computerPlay(sequence)

    setTimeout(() => {
        humanPlay(level)
    }, level * 600 + 1000);
}

// Computer chance
computerPlay = (sequence) => {
    btnPressed.forEach((element, i) => {
        btnPressed[i].classList.add('unclickable');
    })
    sequence.forEach((color, i) => {
        setTimeout(() => {
            activateColor(color)
        }, (i + 1) * 600);
    });
}

// human chance
humanPlay = (level) => {
    btnPressed.forEach((element, i) => {
        btnPressed[i].classList.remove('unclickable');
    })

}

/*  Helping functions    */

handleClick = (color) => {
    const index = humanSequence.length - 1;
    activateColor(color)

    if (humanSequence[index] !== sequence[index]) {
        title.innerHTML = "You loose";
        var audio = new Audio("sounds/wrong.mp3");
        audio.play()
        setTimeout(() => {
            reset();
        }, 1000);
        return
    }
    if (humanSequence.length === sequence.length) {
        humanSequence = [];
        setTimeout(() => {
            nextLevel()
        },  1000)
       
        return
    }
}


nextColor = () => {
    let tiles = ['green', 'red', 'yellow', 'blue']
    let random = tiles[Math.floor(Math.random() * 4)]
    return random
}

activateColor = (color) => {
    const btnChoose = document.querySelector(`.${color}`);
    btnChoose.classList.add("pressed");
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play()
    setTimeout(() => {
        btnChoose.classList.remove("pressed");
    }, 300);
}


reset = () => {
    level = 0
    sequence = []
    humanSequence = []
    start=false;
    title.innerHTML="Press A Key to Start";
    btnPressed.forEach((element, i) => {
        btnPressed[i].classList.add('unclickable');
    })
}

/* -------------- */

startGame = () => {
    nextLevel();
}

document.addEventListener('keypress', (e) => {
    if (start == false) {
        if (e.code === "KeyA") {
            start = true;
            startGame();
        }
    }
})