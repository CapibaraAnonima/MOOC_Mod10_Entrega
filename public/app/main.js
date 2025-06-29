// Las funciones que tienes que rellenar están más abajo
// Mucha suerte :)



// Contenedor de instancia del juego y de swiper (no tocar nada)
let game;
let swiper;

// Valores constantes para tamaños, imágenes de caracteres del juego, opciones de juego (tocar lo necesario)
const OPPONENT_HEIGHT = 5,
    OPPONENT_PICTURE = "assets/img/malo.png",
    OPPONENT_PICTURE_DEAD = "assets/img/malo_muerto.png",
    OPPONENT_SPEED = 5,
    OPPONENT_WIDTH = 5,
    GAME_OVER_PICTURE = "assets/img/game_over.png",
    KEY_LEFT = "LEFT",
    KEY_RIGHT = "RIGHT",
    KEY_SHOOT = "SHOOT",
    MIN_TOUCHMOVE = 20,
    PLAYER_HEIGHT = 5,
    PLAYER_PICTURE = "assets/img/bueno.png",
    PLAYER_PICTURE_DEAD = "assets/img/bueno_muerto.png",
    PLAYER_SPEED = 20,
    PLAYER_WIDTH = 5,
    SHOT_HEIGHT = 1.5,
    SHOT_SPEED = 20,
    SHOT_PICTURE_PLAYER = "assets/img/shot1.png",
    SHOT_PICTURE_OPPONENT = "assets/img/shot2.png",
    SHOT_WIDTH = 1.5;

// Selectores DOM para las diferentes funcionalidades
const GAME_UI = {
    app: document.querySelector(".layout"),
    gameBoard: document.querySelector(".game_container .game_holder"),
    pauseButton: document.querySelector(".pause .btn_link"),
    cancelButton: document.querySelector(".btn_secondary"),
    modalWindow: document.querySelector(".modal_window"),
    bigScores: document.querySelector(".big_scores"),
    leaderBoardItems: document.querySelectorAll(".leaderboard_item"),
};

// Lanzamiento de funciones basadas en la página en la que nos encontremos (no tocar nada)
window.addEventListener("load", () => {
    const isGamePage = document
        .querySelector(".layout")
        .classList.contains("game");
    const isHomePage = document
        .querySelector(".layout")
        .classList.contains("home");
    const isHighScores = document
        .querySelector(".layout")
        .classList.contains("highscores");

    if (isGamePage) {
        startGame();
        startEvents();
        makePlayerDraggable();
    }
    if (isHomePage) {
        animateHomePage();
    }
    if (isHighScores) {
        animateStaggerScores();
        initScoreSwiper();
    }
});

// Algunos eventos necesarios de nuestro proyecto
function startEvents() {
    GAME_UI.pauseButton.addEventListener("click", () => {
        game.pauseOrResume();
        if (game.paused) {
            openModalWindow();
        } else {
            closeModalWindow();
        }
    });
    GAME_UI.cancelButton.addEventListener("click", () => {
        game.pauseOrResume();
        if (!game.paused) {
            closeModalWindow();
        }
    });
}

// ======================================================================
// ======================================================================
// ENUNCIADOS
// ======================================================================
// ======================================================================

// Fase 4 – Animación de entrada en la página home con AnimeJS.
function animateHomePage() {
    // Elemnetos
    const elements = [
        ".home header",
        ".home main",
        ".home .main_navigation",
        ".home .secondary_navigation"
    ];

    // Eleccion aleatoria del array de elementos
    const shuffled = elements
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    // Duracin
    anime.timeline({
        duration: 800,
        easing: "easeInSine",
    });

    shuffled.forEach((selector, idx) => {
        anime({
            targets: document.querySelector(selector),
            opacity: [0, 1],
            translateX: [20, 0],
            translateY: [-20, 0],
            delay: 400 + idx * 200,
        });
    });

}

// Fase 5 - Animaciones más complejas en highscores.html y game.html.
function openModalWindow() {
    GAME_UI.modalWindow.classList.add("opened");
    anime({
        targets: GAME_UI.modalWindow,
        opacity: [0, 1],
        scale: [0.8, 1.05, 1],
        translateY: [-10, 10, 0],
        borderRadius: ['50%', '20px'],
        duration: 1000,
        easing: "easeInSine"
    });
}

function closeModalWindow() {
    anime({
        targets: GAME_UI.modalWindow,
        opacity: [1, 0],
        scale: [1, 0.7],
        translateY: [0, -70],
        borderRadius: ['20px', '50%'],
        duration: 600,
        easing: "easeInCubic",
        complete() {
            GAME_UI.modalWindow.classList.remove("opened");
        }
    });
}
/*
// Highscores
*/ 
function animateStaggerScores() {

    // Elemnetos[]
    const elements = [
        ".single_page header",
        ".single_page h3",
        ".single_page main .big_scores",
        ".single_page main section",
        ".single_page main section .itemsH3",
    ];

    // Eleccion aleatoria del array de elementos
    const shuffled = elements
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    // Duracion
    anime.timeline({
        duration: 800,
        easing: "easeInSine",
    });

    shuffled.forEach((selector, idx) => {
        anime({
            targets: document.querySelector(selector),
            opacity: [0, 1],
            translateX: [20, 0],
            translateY: [-20, 0],
            delay: 400 + idx * 200,
        });
    });

    anime({
        targets: GAME_UI.leaderBoardItems,
        translateX: [-30, 0],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(200, {
            start: 1000,
                from: 0,
                reversed: false,
                ease: 'outQuad',
        }),
        easing: "easeOutCubic"
    });
}
/*
// GAME
*/

// Elementos[]
    const elements = [
        ".game .ui",
        ".game_container",
    ];

    // Eleccion aleatoria del array de elementos
    const shuffled = elements
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    // Duracion
    anime.timeline({
        duration: 800,
        easing: "easeInSine",
    });

    shuffled.forEach((selector, idx) => {
        anime({
            targets: document.querySelector(selector),
            opacity: [0, 1],
            translateX: [20, 0],
            translateY: [-20, 0],
            delay: 400 + idx * 200,
        });
    });

// Fase 6 - Practiquemos Swiper
function initScoreSwiper() {
    let reverse = false;
    swiper = new Swiper(GAME_UI.bigScores, {
        initialSlide: 0,
        loop: false,
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
        },
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
            reverseDirection: false,
        },
        on: {
            reachEnd: function () {
                reverse = true;
                this.autoplay.stop();
                this.params.autoplay.reverseDirection = true;
                this.autoplay.start();
            },
            reachBeginning: function () {
                reverse = false;
                this.autoplay.stop();
                this.params.autoplay.reverseDirection = false;
                this.autoplay.start();
            }
        }
    });
}


// Fase 7 - Hacer el jugador en game.html draggable con interact
function makePlayerDraggable(player) {
    // Variable de pantalla para movimiento vertical
    let gameHeight = document.getElementsByClassName("game_holder")[0].offsetHeight;
    if (typeof player != "undefined") {
        
        // empieza aquí con interact
        // player es la instancia del jugador, tiene algunas propiedades como player.dragging o player.x que te pueden ayudar
        
        interact(player.myImageContainer).draggable({
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: "parent",
                    endOnly: false,
                }),
            ],
            listeners: {
                start: (ev) => {
                    player.dragging = true;
                    document.getElementsByTagName("body")[0].style.cursor = "grab";
                },
                move: (ev) => {
                    document.getElementsByTagName("body")[0].style.cursor = "grab";
                    player.x += ev.delta.x;
                    
                    /* Código que agrega complejidad innecesaria, de la entrega en Módulo 9
                    if (player.y < gameHeight && player.y > (gameHeight * 0.9 ))
                        player.y += ev.delta.y;

                    else if (player.y > gameHeight) player.y = (gameHeight * 0.95);

                    else player.y = (gameHeight * 0.9) + 1;
                    */
                },
                end: (ev) => {
                    player.dragging = false;
                    document.getElementsByTagName("body")[0].style.cursor = "auto";
                },
            },
        });
    }
}