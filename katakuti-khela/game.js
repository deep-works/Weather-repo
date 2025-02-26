let buttons = document.querySelectorAll(".gamebox > button");//selects all the button 
// Now you can access the buttons as an array
let reset = document.getElementById("reset");
let turn = 0;
let tapped = Array(9).fill(false);
console.log(tapped);
let xor0 = ['O', 'X'];

console.log(buttons); // This will log an array of button elements

for (let index = 0; index < buttons.length; index++) {
    buttons[index].onclick = function () {
        console.log("clicked " + buttons[index].innerHTML.toString());
        if (!tapped[index]) {
            buttons[index].innerHTML = xor0[turn++ % 2]; //whos turn?
            tapped[index] = true;
        }
        console.log("turn is " + turn);
        console.log("after " + buttons[index].innerHTML.toString());
        console.log(gameLogic(buttons)); //apply winer determination
        if (gameLogic(buttons) == 'WIN') {
            setTimeout(() => {
                console.log("performing reset...");
                alert('win');
                gameReset();
            }, 2000);
        }
    };
    // buttons[index].addEventListener("click", () => {
    //     console.log("print " + buttons[index].innerHTML.toString())
    // });
}
reset.onclick = () => gameReset();


// function for resetting the game matrix 
function gameReset() {
    turn = 0;
    tapped.fill(false);
    for (let index = 0; index < buttons.length; index++) {
        buttons[index].innerHTML = ' ';
    }
}

// the main function logic to determine winner..
/*
0 1 2
3 4 5
6 7 8
*/
function gameLogic(arr) {
    //  x 1 2    //  0 x 2     //  0 1 x
    //  x 4 5    //  3 x 5     //  3 4 x
    //  x 7 8    //  6 x 8     //  6 7 x
    for (var i = 0; i < 9; i += 3) {
        if (arr[i].innerHTML == arr[i + 1].innerHTML &&
            arr[i + 1].innerHTML == arr[i + 2].innerHTML &&
            arr[i].innerHTML != ' ') {
            return "WIN";
        }
    }
    //  x x x    //  0 1 2     //  0 1 2
    //  3 4 5    //  x x x     //  3 4 5
    //  6 7 8    //  6 7 8     //  x x x
    for (var i = 0; i < 3; i++) {
        if (arr[i].innerHTML == arr[i + 3].innerHTML &&
            arr[i + 3].innerHTML == arr[i + 6].innerHTML &&
            arr[i].innerHTML != ' ') {
            return "WIN";
        }
    }
    //  x 1 2
    //  3 x 5
    //  6 7 x
    if (arr[0].innerHTML == arr[4].innerHTML &&
        arr[4].innerHTML == arr[8].innerHTML && arr[0].innerHTML != ' ') {
        return "WIN";
    }
    //  0 1 x
    //  3 x 5
    //  x 7 8
    if (arr[2].innerHTML == arr[4].innerHTML &&
        arr[4].innerHTML == arr[6].innerHTML && arr[2].innerHTML != ' ') {
        return "WIN";
    }
    return "nothing ";

}