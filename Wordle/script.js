const Wordleword = "hello"
let currentRow = 1;
const dictionary_API = "https://api.dictionaryapi.dev/api/v2/entries/en/"

async function nextrow() {

    const row = document.querySelector(`.row${currentRow}`);
    const inputs = row.querySelectorAll("input");

    for (const input of inputs) {
        if (input.value.length !== 1) {
            alert('5 letters needed');
            return; 
        }
    }

    let word = "";

    inputs.forEach(input => {
        word += input.value;
    });

    word = word.toLowerCase();

    try {
        const response = await fetch(dictionary_API + word);

        if (!response.ok) {
            alert("Not a valid English word");
            return;
        }

        await response.json();

    } catch (err) {
        alert("Network error. Try again.");
        return;
    }

    const solution = Wordleword.split("");
    const guess = word.split("");

    let feedback = ['gray', 'gray', 'gray', 'gray', 'gray'];

    for (let i = 0; i < 5; i++) {
        if (guess[i] === solution[i]) {
            feedback[i] = "green";
        }
    }

    for (let i = 0; i < 5; i++) {
        if (feedback[i] === "green") continue;
        if (solution.includes(guess[i]) && feedback[i] !== "green") {
            feedback[i] = "yellow";
        }
    }

    inputs.forEach((input, index) => {
        if (feedback[index] === "green") {
            input.style.backgroundColor = "green";
        } else if (feedback[index] === "yellow") {
            input.style.backgroundColor = "yellow";
        } else {
            input.style.backgroundColor = "gray";
        }
    });

    inputs.forEach(input => {
        input.disabled = true;
    });

    if (feedback.every(color => color === 'green')) {
        alert("You win");
        return;
    }

    currentRow++;

    if (currentRow > 6) {
        alert("You lose! The word was " + Wordleword + "!");
        return;
    }

    const nextrow = document.querySelector(`.row${currentRow}`);
    const nextinputs = nextrow.querySelectorAll("input");

    nextinputs.forEach(input => {
        input.disabled = false;
    });

    nextinputs[0].focus();
}

document.addEventListener("input", (e) => {
    const input = e.target;

    if (input.tagName !== "INPUT") return;

    if (input.value.length === 1) {
        const next = input.nextElementSibling;
        if (next && next.tagName === "INPUT" && !next.disabled) {
            next.focus();
        }
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key !== "Backspace") return;

    const input = e.target;
    if (input.tagName !== "INPUT") return;

    if (input.value === "") {
        const prev = input.previousElementSibling;
        if (prev && prev.tagName === "INPUT" && !prev.disabled) {
            prev.focus();
        }
    }
});

document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        nextrow();
    }
});