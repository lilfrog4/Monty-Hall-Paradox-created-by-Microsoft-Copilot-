document.addEventListener("DOMContentLoaded", function() {
    const doors = document.querySelectorAll(".door");
    const startButton = document.getElementById("start-button");
    const gameTitle = document.getElementById("game-title");

    let prizeDoor;
    let selectedDoor;
    let initialSelectedDoor;
    let gamePhase = 0;

    let totalGames = 0;
    let winsWithoutSwitch = 0;
    let lossesWithoutSwitch = 0;
    let winsWithSwitch = 0;
    let lossesWithSwitch = 0;

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function revealGoat() {
        const goatDoors = Array.from(doors).filter(door => door !== selectedDoor && door !== prizeDoor);
        const revealedGoat = goatDoors[getRandomInt(0, goatDoors.length - 1)];
        revealedGoat.style.backgroundColor = "#FF4136";
    }

    function revealPrize() {
        prizeDoor.style.backgroundColor = "#2ECC40";
    }

    function resetDoors() {
        doors.forEach(door => {
            door.style.backgroundColor = "#ccc";
            door.disabled = false;
        });
    }

    function endGame() {
        totalGames += 1;
        if (selectedDoor === prizeDoor) {
            if (initialSelectedDoor === selectedDoor) {
                winsWithoutSwitch += 1;
            } else {
                winsWithSwitch += 1;
            }
        } else {
            if (initialSelectedDoor === selectedDoor) {
                lossesWithoutSwitch += 1;
            } else {
                lossesWithSwitch += 1;
            }
        }
        document.getElementById("total-games").textContent = "Total games: " + totalGames;
        document.getElementById("wins-without-switch").textContent = "Wins without switching doors: " + winsWithoutSwitch;
        document.getElementById("losses-without-switch").textContent = "Losses without switching doors: " + lossesWithoutSwitch;
        document.getElementById("wins-with-switch").textContent = "Wins with switching doors: " + winsWithSwitch;
        document.getElementById("losses-with-switch").textContent = "Losses with switching doors: " + lossesWithSwitch;

        doors.forEach(door => {
            door.disabled = true;
            if (door !== prizeDoor) {
                door.style.backgroundColor = "#FF4136"; // Red if there's a goat behind the door
            }
        });
        revealPrize(); // Show which option was correct
        startButton.disabled = false;
        gameTitle.textContent = "Game over";
    }

    function doorClickHandler() {
        if (this.style.backgroundColor === "rgb(255, 65, 54)" || this.disabled) {
            return;
        }
        if (gamePhase === 0) {
            selectedDoor = this;
            initialSelectedDoor = this;
            selectedDoor.style.backgroundColor = "#FFD700";
            revealGoat();
            gamePhase = 1;
        } else if (gamePhase === 1) {
            selectedDoor = this;
            if (this === prizeDoor) {
                this.style.backgroundColor = "#2ECC40";
            } else {
                this.style.backgroundColor = "#FF4136";
            }
            endGame();
            doors.forEach(door => {
                door.removeEventListener("click", doorClickHandler);
            });
        }
    }

    function playGame() {
        gameTitle.textContent = "Game in progress";
        prizeDoor = doors[getRandomInt(0, 2)];
        startButton.disabled = true;
        gamePhase = 0;

        doors.forEach(door => {
            door.addEventListener("click", doorClickHandler);
        });
    }

    startButton.addEventListener("click", function() {
        gameTitle.textContent = "Start the game";
        resetDoors();
        playGame();
    });
});

















