






// 1.IMPORTS
const prompt = require("prompt-sync")();

// 2.GLOBEL VERIBLAS.
const ROWS = 3;
const COLS = 3;

// 3.SYMBOLS.
// a. symbol amount.
const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}
// b. symbols value.
const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}






// 1.Deposit money.

const deposit = () => {

    while (true) {
         const depositamount = prompt ("enter an amount: ");
         const numberdepositamount = parseFloat(depositamount);

        if(isNaN(numberdepositamount) || numberdepositamount <= 0) {
        console.log("this is not a valid number , plz try again.");
        } else {
            return numberdepositamount;
        }
    }
};

// 2.determine num of lines to bet.

const linenumbers = () => {
    while (true) {
        const lines = prompt ("enter an number of lines to bet on(1-3): ");
        const numberoflines = parseFloat(lines);

       if(isNaN(numberoflines) || numberoflines <= 0 || numberoflines > 3) {
       console.log("this is not a valid number of lines , plz try again.");
       } else {
           return numberoflines;
       }
   }
};

// 3.coll bet.
const getbet = (balance , lines) => {
    while (true) {
        const bet = prompt ("enter an bet amount per lines: ");
        const numberofbet = parseFloat(bet);

       if(isNaN(numberofbet) || numberofbet <= 0 || numberofbet > balance / lines) {
       console.log("this is not a valid amount of bet , plz try again.");
       } else {
           return numberofbet;
       }
    }

};

// 4.spin the mac.

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i=0; i < count; i++){
            symbols.push(symbol)
        }
        
    }
    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelsymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomindex = Math.floor(Math.random() * reelsymbols.length);
            const selectedsymbol = reelsymbols[randomindex];
            reels[i].push(selectedsymbol);
            reelsymbols.splice(randomindex, 1);


        }
    }
    return reels;

};


// 5.check if won.

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])

        }
    }
    return rows;


};


// to print our ROWS

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};
// 6.give winning.
const getWinning = (rows, bet , lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allsame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allsame = false;
                break;
            }
        } 
        if (allsame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
};


// 7.play again.
const game = () => {
    let balance = deposit();
    while (true) {
        console.log("you have a balanc of $" + balance);
        const numberoflines = linenumbers();
        const bet = getbet(balance, numberoflines);
        balance -= bet * numberoflines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinning(rows, bet , numberoflines);
        balance += winnings;
        console.log("you won, $" + winnings.toString());
        if (balance <= 0) {
            console.log("you ran out of money!");
            break;
        }
        const playagain = prompt("Do you wanna play again (y/n)? ");
        if (playagain != "y") break;
    }
};

game();

