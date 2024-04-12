let array = 
[
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
];

var points = 0; 
var currentRow = Math.floor(Math.random() * 5); // Nuvarande row
var currentColumn = Math.floor(Math.random() * 5); // Nuvarande column

window.onload = displayArray; 

PiggiesAndZombies(); // Generera piggies and zombies

// Rita upp arrayen
function displayArray() 
{
    var table = "<table>";
    for (var i = 0; i < array.length; i++) 
    {
        table += "<tr>";
        for (var j = 0; j < array[i].length; j++) 
        {
            if (i === currentRow && j === currentColumn) 
            {
                table += "<td class='current-pos'>" + "X" + "</td>"; // Startposition
                var imageName = "images/marsvin.jpg" + (i * array.length + j + 1) // Ritar upp/kopplar en unik bild till varje unik <td> 
                document.querySelector('.gameimage')
            } 
            else if (array[i][j].includes("Z")) 
            {
                table += "<td class='zombie'>" + array[i][j] + "</td>"; // En class till <td> som innehåller en zombie Z
            } 
            else if (array[i][j].includes("P")) 
            {
                table += "<td class='piggy'>" + array[i][j] + "</td>"; // En class till <td> som innehåller en piggy P
            } 
            else 
            {
                var imageName = "images/marsvin.jpg" + (i * array.length + j + 1)// Kopplar en unik bild för varje unik array index
                table += "<td><img src='" + imageName + "' width='100' height='120'></td>";
            }
        }
        table += "</tr>";
    }
    table += "</table>";
    document.getElementById("array-container").innerHTML = table;
    document.getElementById("current-position").innerHTML = "Current position: Row " + (currentRow + 1) + ", Column " + (currentColumn + 1); // Nuvarande koordinater
}


// Uppdatera row och column
function updateCurrentPosition(row, column) 
{

    array[currentRow][currentColumn] = array[currentRow][currentColumn].toString().replace("X", ""); // Suddar ut förra positionen för spelaren X innan det att den flyttat sig 
    currentRow = row;
    currentColumn = column;
    array[currentRow][currentColumn] = "X" + array[currentRow][currentColumn].toString(); // Ritar ut X på nya positionen efter att den städat gamla
    document.getElementById("current-position").innerHTML = "Current Position: Row " + (currentRow + 1) + ", Column " + (currentColumn + 1);

    if (array[currentRow][currentColumn] === "XP") // 1 poäng ifall X går till samma postion som ett P
    { 
        alert("You saved 1 guinea pig, keep it up!");
        array[currentRow][currentColumn] = "X";
        for (let i = 0; i < array.length; i++) 
        {
            for (let j = 0; j < array[i].length; j++) 
            {
                if (array[i][j] === "P" && i === currentRow && j === currentColumn) 
                {
                    array[i][j] = "";
                }
            }
        }
        points++;
        if (points == 5) 
        {
            alert("Great job, you saved the guinea pigs and can call yourself a hero now!"); // Man vinner när man får 5 poäng 
            location.reload() 
        }
        document.getElementById("points").innerHTML = "Score: " + points;
    }
    else if (array[currentRow][currentColumn] === "XPP") // 2 poäng ifall X går till samma postion som två P
    { 
        alert("You saved 2 guinea pigs, way to go!"); 
        array[currentRow][currentColumn] = "X";
        for (let i = 0; i < array.length; i++) 
        {
            for (let j = 0; j < array[i].length; j++) 
            {
                if (array[i][j] === "PP" && i === currentRow && j === currentColumn) 
                {
                    array[i][j] = "";
                }
            }
        }
        points++;
        points++;
        if (points == 5) 
        {
            alert("Fantastic job!"); // Vinst vid 5 poäng 
        }
        document.getElementById("points").innerHTML = "Score: " + points;
    }

    for (let i = 0; i < array.length; i++) 
    {
        for (let j = 0; j < array[i].length; j++) 
        {
            if (array[i][j].includes("Z")) 
            {
                if (Math.random() < 0.4) // % chans att zombien rör sig
                { 
                    continue;
                }
                if (i > currentRow) // Får zombies Z att röra på sig i arrayen baserat på spelarens nuvarande koordinater
                { 
                    if (array[i - 1][j] === "" || array[i - 1][j].includes("P")) 
                    {
                        array[i - 1][j] = "Z";
                        array[i][j] = "";
                    }
                } 
                else if (i < currentRow) 
                {
                    if (array[i + 1][j] === "" || array[i + 1][j].includes("P")) 
                    {
                        array[i + 1][j] = "Z";
                        array[i][j] = "";
                    }
                } 
                else if (j > currentColumn) 
                {
                    if (array[i][j - 1] === "" || array[i - 1][j].includes("P")) 
                    {
                        array[i][j - 1] = "Z";
                        array[i][j] = "";
                    }
                } 
                else if (j < currentColumn) 
                {
                    if (array[i][j + 1] === "" || array[i + 1][j].includes("P")) 
                    {
                        array[i][j + 1] = "Z";
                        array[i][j] = "";
                    }
                }
            }
        }
    }

    const currentSquare = array[currentRow][currentColumn];
    if (currentSquare.includes("Z")) // Möter spelaren en zombie "dör" spelaren
    { 
        alert("You ran into a zombie, game over..."); 
        location.reload()
    }


    displayArray(); // Rita ut arrayen igen efter uppdateringar
}
function PiggiesAndZombies() // Funktion som skapar piggies P och zombies Z till arrayen med slumpmässiga positioner, 3 Z och 5 P
{ 
    for (let z = 0; z <= 2; z++) 
    {
        let zombieRow = Math.floor(Math.random() * 5)
        let zombieColumn = Math.floor(Math.random() * 5)
        array[zombieRow][zombieColumn] = "Z" + array[zombieRow][zombieColumn].toString(); // Sätter in zombies Z i arrayen

    }
    for (let p = 0; p <= 5; p++) 
    {
        let piggyRow = Math.floor(Math.random() * 5)
        let piggyColumn = Math.floor(Math.random() * 5)
        array[piggyRow][piggyColumn] = "P" + array[piggyRow][piggyColumn].toString(); // Sätter in piggies P i arrayen
    }

    displayArray();
}

// Knapp för att gå norrut
function navigateUp() 
{
    if (currentRow > 0) 
    {
        updateCurrentPosition(currentRow - 1, currentColumn);
    }
}

// Knapp för att gå söderut
function navigateDown() 
{
    if (currentRow < array.length - 1) 
    {
        updateCurrentPosition(currentRow + 1, currentColumn);
    }
}

// Knapp för att gå västerut
function navigateLeft() 
{
    if (currentColumn > 0) 
    {
        updateCurrentPosition(currentRow, currentColumn - 1);
    }
}

// Knapp för att gå österut
function navigateRight() 
{
    if (currentColumn < array[currentRow].length - 1) 
    {
        updateCurrentPosition(currentRow, currentColumn + 1); 
    }
}