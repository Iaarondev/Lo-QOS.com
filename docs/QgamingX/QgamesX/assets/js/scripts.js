// Game Variables
const players = ["You", "AI Player 1", "AI Player 2", "AI Player 3"];
let deck = [];
let hands = [[], [], [], []];
let mode = "team"; // Default mode
let difficulty = "easy"; // Default AI difficulty

// Initialize Deck
function initializeDeck() {
    const suits = ["♠", "♥", "♦", "♣"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push(`${value}${suit}`);
        }
    }
}

// Shuffle Deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Deal Cards
function dealCards() {
    hands = [[], [], [], []];
    for (let i = 0; i < 52; i++) {
        hands[i % 4].push(deck[i]);
    }
}

// Set Game Mode
function setMode(selectedMode) {
    mode = selectedMode;
    document.getElementById("info").textContent = `Mode: ${mode === "team" ? "Team Mode" : "Solo Mode"}`;
}

// Set AI Difficulty
function setDifficulty(selectedDifficulty) {
    difficulty = selectedDifficulty;
    document.getElementById("info").textContent = `AI Difficulty: ${difficulty}`;
}

// Start Game
function startGame() {
    initializeDeck();
    shuffleDeck();
    dealCards();
    renderHands();
    document.getElementById("info").textContent = "Game started! Your turn.";
}

// Render Hands
function renderHands() {
    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = `<div class="info" id="info">Game in progress...</div>`;

    players.forEach((player, index) => {
        const playerDiv = document.createElement("div");
        playerDiv.className = "player";

        const playerName = document.createElement("h3");
        playerName.textContent = player;

        const cardsDiv = document.createElement("div");
        cardsDiv.className = "cards";

        hands[index].forEach((card, cardIndex) => {
            const cardDiv = document.createElement("div");
            cardDiv.className = "card";
            cardDiv.textContent = card;

            if (index === 0) {
                cardDiv.addEventListener("click", () => playCard(index, cardIndex));
            }

            cardsDiv.appendChild(cardDiv);
        });

        playerDiv.appendChild(playerName);
        playerDiv.appendChild(cardsDiv);
        gameArea.appendChild(playerDiv);
    });
}

// Play a Card
function playCard(playerIndex, cardIndex) {
    const playedCard = hands[playerIndex].splice(cardIndex, 1)[0];
    document.getElementById("info").textContent = `${players[playerIndex]} played ${playedCard}`;
    renderHands();
}

// Initialize Deck
initializeDeck();
