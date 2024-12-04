const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")

const audio = new Audio("../assets/audio.mp3")

const size = 30

const initialPosition = { x: 270, y: 240 }

let snake = [initialPosition]

const incrementScore = () => {
    score.innerText = +score.innerText + 10
}

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

let direction, loopId

const drawFood = () => {
    const { x, y, color } = food

    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

/*-------------------------------------------------------------- */



/* JOSE       JOSE        JOSE       JOSE      JOSE        JOSE          */
const drawSnake = () => {
    ctx.fillStyle = "#ddd"

    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = "white"
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {
    if (!direction) return

    const head = snake[snake.length - 1]

    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }

    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }

    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })
    }

    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })
    }

    snake.shift()
}




/* JOSE  FIM      JOSE   FIM     JOSE   FIM    JOSE   FIM   JOSE    FIM     JOSE      FIMA     */

/*-------------------------------------------------------------- */


const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}

const chackEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        incrementScore()
        snake.push(head)
        audio.play()

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x
        food.y = y
        food.color = randomColor()
    }
}

const checkCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size
    const neckIndex = snake.length - 2

/*-------------------------------------------------------------- */


/* ISAQUE           ISAQUE         ISAQUE        ISAQUE      ISAQUE         ISAQUE           */


/* Aqui, a função verifica se a cabeça da cobrinha ultrapassou os limites
 da tela (as bordas da área do jogo)*/ 
    const wallCollision =
        head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit
/* head.x < 0: A cobrinha foi para a esquerda demais.

head.x > canvasLimit: A cobrinha foi para a direita demais.

head.y < 0: A cobrinha foi para cima demais.

head.y > canvasLimit: A cobrinha foi para baixo demais.

*/


/*-------------------------------------------------------------- */



/*  A função também verifica se a cabeça da cobrinha colidiu com qualquer parte do seu corpo (exceto com a parte do "pescoço",
 que é o segundo segmento mais próximo da cabeça) */
    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })
/*  SNAKE>FIND(): Busca por qualquer parte do corpo da cobrinha que tenha as mesmas coordenadas (posição) que a cabeça.


index < neckIndex: Garantimos que o "pescoço" (o segundo último segmento da cobrinha) não será verificado,
 porque só queremos ver se a cabeça bateu no restante
 
 */
    if (wallCollision || selfCollision) {
        gameOver()
    }
}



/*-------------------------------------------------------------- */


/*Para o movimento da cobra (direction = undefined).

Exibe o menu de fim de jogo (menu.style.display = "flex").

Mostra a pontuação final (finalScore.innerText = score.innerText).

Aplica um efeito de desfoque na tela (canvas.style.filter = "blur(2px)"). */

const gameOver = () => {
    direction = undefined

    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(2px)"
}

/* ISAQUE   FIM        ISAQUE    FIM     ISAQUE    FIM    ISAQUE   FIM   ISAQUE    FIM     ISAQUE      FIMA     */



/*-------------------------------------------------------------- */




/*-------------------------------------------------------------- */

/* JOSE       JOSE        JOSE       JOSE      JOSE        JOSE          */

const gameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    chackEat()
    checkCollision()

    loopId = setTimeout(() => {
        gameLoop()
    }, 150)
}

gameLoop()

document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
})
/* JOSE  FIM      JOSE   FIM     JOSE   FIM    JOSE   FIM   JOSE    FIM     JOSE      FIMA     */
buttonPlay.addEventListener("click", () => {
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"

    snake = [initialPosition]
})
