/**
 * Monstruo al que tenemos que destruir
 */
class Opponent extends Character {
    /**
     * @param game {Game} La instancia del juego al que pertenece el personaje
     */
    constructor(game) {
        const height = (OPPONENT_HEIGHT * game.width) / 100,
            width = (OPPONENT_WIDTH * game.width) / 100,
            x = getRandomNumber(game.width - width / 2),
            y = 0,
            speed = OPPONENT_SPEED,
            myImage = OPPONENT_PICTURE,
            myImageDead = OPPONENT_PICTURE_DEAD;

        super(game, width, height, x, y, speed, myImage, myImageDead);
        this.direction = "R"; // Dirección hacia la que se mueve el oponente
        setTimeout(() => this.shoot(), 1000 + getRandomNumber(2500));
    }

    /**
     * Crea un nuevo disparo
     */
    shoot() {
        if (!this.dead && !this.game.ended) {
            if (!this.game.paused) {
                this.game.shoot(this);
            }
            setTimeout(() => this.shoot(), 1000 + getRandomNumber(2500));
        }
    }

    /**
     * Actualiza los atributos de posición del oponente
     */
    update() {
        if (!this.dead && !this.game.ended) {
            this.y += this.speed;
            if (this.y > this.game.height) {
                this.y = 0;
            }
            if (this.direction === "R") {
                // Hacia la derecha
                if (this.x < this.game.width - this.width - this.speed) {
                    this.x += this.speed;
                } else {
                    this.horizontalMov = 0;
                }
            } else if (this.x > this.speed) {
                this.x -= this.speed;
            } else {
                this.horizontalMov = 0;
            }
            this.horizontalMov -= this.speed;
            if (this.horizontalMov < this.speed) {
                this.horizontalMov = getRandomNumber(this.game.width / 2);
                this.direction = this.direction === "R" ? "L" : "R"; // Cambia de sentido
            }
        }
    }

    /**
     * Mata al oponente
     */
    async die() {
        if (!this.dead) {
            setTimeout(() => {
                this.game.removeOpponent();
            }, 2000);
            super.die();

            // Agrega la clase a oponente para animacion de score
            document.getElementsByClassName("Opponent")[0].classList.add("estrella");
            document.getElementsByClassName("Opponent")[0].classList.remove("Opponent");

            // Actualiza el score una vez acaba la animation
            await sleep(2500); 
            let points = document.getElementsByClassName("score")[0].getElementsByClassName("amount")[0];
            if (points) {
                points.innerHTML = +points.innerHTML + 1;
            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}