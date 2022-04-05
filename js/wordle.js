const DELAY = 500;

let guess_idx = 0;
let secret = "BORED";

// TODO: Make checker animations cooler.
function handle_submit_guess() {
    let guess = $("#wordle-guesser").val().toUpperCase();

    if (guess.length !== 5) {
        alert("Your guess must be 5 letters long");
        return;
    }
    
    let counts = {};
    let matched = [];

    // Initialize the counter
    for (let i = 0; i < secret.length; i++) {
        if (!(secret[i] in counts))
            counts[secret[i]] = 0;
        counts[secret[i]]++;
    }

    // Handle correct guesses
    for (let i = 0; i < guess.length; i++) {
        let letter = guess[i];
        let actual = secret[i];
        let cell = $("#wdl-" + guess_idx + "-" + i);
        if (letter === actual) {
            setTimeout(function() {
                cell.addClass("correct");
            }, DELAY * i);
            counts[secret[i]]--;
            matched.push(i);
        }
    }

    // Handle close guesses.
    // We do this in a second loop because, in my head, 
    // if the word is ARSON and someone plays ASSET, the 
    // first S is not "almost" because we know that no
    // more Ses remain.
    for (let i = 0; i < guess.length; i++) {
        // Skip cells that are graded
        if (matched.includes(i)) continue;

        let letter = guess[i];
        let cell = $("#wdl-" + guess_idx + "-" + i);

        if (secret.includes(letter) && counts[letter] > 0) {
            setTimeout(function() {
                cell.addClass("almost");
            }, DELAY * i);
        } else {
            setTimeout(function() {
                cell.addClass("wrong");
            }, DELAY * i);
        }
    }

    guess_idx++;
    $("#wordle-guesser").val("");
}

$(document).ready(function() {
    $(window).resize(function() {
        // Autoresize the title text to make it as big as possible
        let height = $(".animated-title").height();
        $(".animated-title").css({
            "font-size": height + "px",
            "line-height": height + "px"
        })
    }).trigger("resize");

    // Clear the text area between soft refreshes
    $("#wordle-guesser").val("");

    $("#wordle-guess-btn").click(function() {
        handle_submit_guess();
    });
    $("#wordle-guesser").keyup(function(event) {
        if (event.key === "Enter") {
            handle_submit_guess();
            return;
        }

        let guess = $(this).val();
        
        for (let i = 0; i < guess.length; i++) {
            let letter = guess[i];
            console.log(i, letter, guess, guess_idx);
            $("#wdl-" + guess_idx + "-" + i).html(letter.toUpperCase());
        }
        for (let i = guess.length; i < 5; i++) {
            $("#wdl-" + guess_idx + "-" + i).html("-");
        }
    });
});