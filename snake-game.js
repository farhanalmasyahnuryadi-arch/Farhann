/**
 * Snake Game — HTML5 Canvas
 * Ported from snake.c to run inside the portfolio website
 * Controls: WASD / Arrow Keys
 */
(function(){
    'use strict';

    // ─── config ────────────────────────────────────────────────
    const GRID_SIZE   = 20;       // pixels per cell
    const COLS        = 25;
    const ROWS        = 15;
    const CANVAS_W    = COLS * GRID_SIZE;
    const CANVAS_H    = ROWS * GRID_SIZE;
    const TICK_MS     = 130;      // initial speed (ms per frame)

    // ─── DOM refs ──────────────────────────────────────────────
    const container = document.getElementById('snake-game-container');
    if (!container) return;

    const canvas  = document.createElement('canvas');
    canvas.width  = CANVAS_W;
    canvas.height = CANVAS_H;
    canvas.id     = 'snake-canvas';
    container.appendChild(canvas);

    const infoEl = document.createElement('div');
    infoEl.id    = 'snake-info';
    infoEl.innerHTML = '<span class="snake-score">Score: 0</span>' +
                       '<span class="snake-controls">WASD / Arrow Keys</span>';
    container.appendChild(infoEl);

    const ctx = canvas.getContext('2d');

    // ─── game state ────────────────────────────────────────────
    let snake     = [];
    let food      = { x: 0, y: 0 };
    let direction = 'RIGHT';
    let nextDirection = 'RIGHT';
    let score     = 0;
    let gameOver  = false;
    let win       = false;
    let running   = false;
    let timer     = null;

    // ─── helpers ────────────────────────────────────────────────
    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function isOnSnake(x, y, ignoreTail) {
        const len = ignoreTail ? snake.length - 1 : snake.length;
        for (let i = 0; i < len; i++) {
            if (snake[i].x === x && snake[i].y === y) return true;
        }
        return false;
    }

    // ─── food ──────────────────────────────────────────────────
    function spawnFood() {
        let x, y;
        do {
            x = randInt(0, COLS - 1);
            y = randInt(0, ROWS - 1);
        } while (isOnSnake(x, y, false));
        food = { x, y };
    }

    // ─── setup ────────────────────────────────────────────────
    function setup() {
        const midX = Math.floor(COLS / 2);
        const midY = Math.floor(ROWS / 2);

        snake = [
            { x: midX,     y: midY },
            { x: midX - 1, y: midY },
            { x: midX - 2, y: midY },
        ];
        direction     = 'RIGHT';
        nextDirection = 'RIGHT';
        score         = 0;
        gameOver      = false;
        win           = false;
        spawnFood();
        updateScore();
    }

    // ─── draw ──────────────────────────────────────────────────
    const COLORS = {
        bg:         '#0a0a0a',
        grid:       '#1a1a18',
        border:     '#31d0a8',
        head:       '#31d0a8',
        body:       '#1d7a62',
        bodyAlt:    '#238b70',
        food:       '#ff2e93',
        foodGlow:   'rgba(255,46,147,0.35)',
        text:       '#f4f2ec',
        scoreText:  '#ff2e93',
    };

    function draw() {
        // background
        ctx.fillStyle = COLORS.bg;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        // grid lines (subtle)
        ctx.strokeStyle = COLORS.grid;
        ctx.lineWidth   = 0.5;
        for (let c = 0; c <= COLS; c++) {
            ctx.beginPath();
            ctx.moveTo(c * GRID_SIZE, 0);
            ctx.lineTo(c * GRID_SIZE, CANVAS_H);
            ctx.stroke();
        }
        for (let r = 0; r <= ROWS; r++) {
            ctx.beginPath();
            ctx.moveTo(0, r * GRID_SIZE);
            ctx.lineTo(CANVAS_W, r * GRID_SIZE);
            ctx.stroke();
        }

        // border (inside)
        ctx.strokeStyle = COLORS.border;
        ctx.lineWidth   = 2;
        ctx.strokeRect(1, 1, CANVAS_W - 2, CANVAS_H - 2);

        // food glow
        const fx = food.x * GRID_SIZE + GRID_SIZE / 2;
        const fy = food.y * GRID_SIZE + GRID_SIZE / 2;
        const grad = ctx.createRadialGradient(fx, fy, 2, fx, fy, GRID_SIZE);
        grad.addColorStop(0, COLORS.foodGlow);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(food.x * GRID_SIZE - GRID_SIZE / 2,
                     food.y * GRID_SIZE - GRID_SIZE / 2,
                     GRID_SIZE * 2, GRID_SIZE * 2);

        // food
        ctx.fillStyle = COLORS.food;
        ctx.beginPath();
        ctx.arc(fx, fy, GRID_SIZE / 2 - 2, 0, Math.PI * 2);
        ctx.fill();

        // snake body
        for (let i = snake.length - 1; i >= 0; i--) {
            const seg = snake[i];
            const pad = 1;
            const x   = seg.x * GRID_SIZE + pad;
            const y   = seg.y * GRID_SIZE + pad;
            const size = GRID_SIZE - pad * 2;

            if (i === 0) {
                // head
                ctx.fillStyle = COLORS.head;
                ctx.shadowColor = COLORS.head;
                ctx.shadowBlur  = 10;
                roundRect(ctx, x, y, size, size, 4);
                ctx.fill();
                ctx.shadowBlur = 0;

                // eyes
                const eyeSize  = 3;
                const eyeOff   = 5;
                ctx.fillStyle = '#0a0a0a';
                if (direction === 'RIGHT') {
                    ctx.fillRect(x + size - eyeOff - eyeSize, y + 4, eyeSize, eyeSize);
                    ctx.fillRect(x + size - eyeOff - eyeSize, y + size - 4 - eyeSize, eyeSize, eyeSize);
                } else if (direction === 'LEFT') {
                    ctx.fillRect(x + eyeOff, y + 4, eyeSize, eyeSize);
                    ctx.fillRect(x + eyeOff, y + size - 4 - eyeSize, eyeSize, eyeSize);
                } else if (direction === 'UP') {
                    ctx.fillRect(x + 4, y + eyeOff, eyeSize, eyeSize);
                    ctx.fillRect(x + size - 4 - eyeSize, y + eyeOff, eyeSize, eyeSize);
                } else if (direction === 'DOWN') {
                    ctx.fillRect(x + 4, y + size - eyeOff - eyeSize, eyeSize, eyeSize);
                    ctx.fillRect(x + size - 4 - eyeSize, y + size - eyeOff - eyeSize, eyeSize, eyeSize);
                }
            } else {
                // body segments with alternating shade
                ctx.fillStyle = (i % 2 === 0) ? COLORS.body : COLORS.bodyAlt;
                roundRect(ctx, x, y, size, size, 3);
                ctx.fill();
            }
        }

        // win / game over overlay
        if (gameOver || win) {
            ctx.fillStyle = 'rgba(0,0,0,0.65)';
            ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

            ctx.textAlign    = 'center';
            ctx.textBaseline = 'middle';

            if (win) {
                ctx.fillStyle = COLORS.border;
                ctx.font = 'bold 28px "Anton", sans-serif';
                ctx.fillText('YOU WIN!', CANVAS_W / 2, CANVAS_H / 2 - 18);
            } else {
                ctx.fillStyle = COLORS.food;
                ctx.font = 'bold 28px "Anton", sans-serif';
                ctx.fillText('GAME OVER', CANVAS_W / 2, CANVAS_H / 2 - 18);
            }

            ctx.fillStyle = COLORS.text;
            ctx.font = '16px "Space Grotesk", sans-serif';
            ctx.fillText('Tekan R untuk mulai lagi', CANVAS_W / 2, CANVAS_H / 2 + 22);
        }
    }

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    // ─── score ────────────────────────────────────────────────
    function updateScore() {
        const scoreEl = container.querySelector('.snake-score');
        if (scoreEl) scoreEl.textContent = 'Score: ' + score;
    }

    // ─── game logic ────────────────────────────────────────────
    function update() {
        if (gameOver || win || !running) return;

        direction = nextDirection;

        const head = snake[0];
        let newHead = { ...head };

        switch (direction) {
            case 'LEFT':  newHead.x--; break;
            case 'RIGHT': newHead.x++; break;
            case 'UP':    newHead.y--; break;
            case 'DOWN':  newHead.y++; break;
        }

        // wall collision
        if (newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS) {
            gameOver = true;
            draw();
            return;
        }

        // check if eating food
        const grows = (newHead.x === food.x && newHead.y === food.y);

        // check if snake is full (win condition)
        if (grows && snake.length + 1 >= COLS * ROWS) {
            // win!
            snake.unshift(newHead);
            score += 10;
            updateScore();
            win = true;
            draw();
            return;
        }

        // self-collision (ignore tail if not growing)
        const checkLen = grows ? snake.length : snake.length - 1;
        for (let i = 1; i < checkLen; i++) {
            if (snake[i].x === newHead.x && snake[i].y === newHead.y) {
                gameOver = true;
                draw();
                return;
            }
        }

        // move
        snake.unshift(newHead);
        if (!grows) {
            snake.pop();
        } else {
            score += 10;
            updateScore();
            spawnFood();
        }

        draw();
    }

    // ─── input ─────────────────────────────────────────────────
    function handleKey(e) {
        const key = e.key;

        // Restart
        if ((key === 'r' || key === 'R') && (gameOver || win)) {
            resetGame();
            return;
        }

        if (gameOver || win || !running) return;

        const opposites = {
            'LEFT': 'RIGHT',
            'RIGHT': 'LEFT',
            'UP': 'DOWN',
            'DOWN': 'UP',
        };

        let newDir = null;
        switch (key) {
            case 'ArrowUp':    case 'w': case 'W': newDir = 'UP';    break;
            case 'ArrowDown':  case 's': case 'S': newDir = 'DOWN';  break;
            case 'ArrowLeft':  case 'a': case 'A': newDir = 'LEFT';  break;
            case 'ArrowRight': case 'd': case 'D': newDir = 'RIGHT'; break;
        }

        if (newDir && opposites[newDir] !== direction) {
            nextDirection = newDir;
        }

        // prevent page scroll
        if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(key)) {
            e.preventDefault();
        }
    }

    // ─── start / stop / reset ──────────────────────────────────
    function resetGame() {
        if (timer) { clearInterval(timer); timer = null; }
        setup();
        running = true;
        draw();
        timer = setInterval(update, TICK_MS);
    }

    function startGame() {
        if (running) return;
        resetGame();
    }

    // ─── bind ──────────────────────────────────────────────────
    document.addEventListener('keydown', handleKey);

    // auto-start when visible (lazy init)
    const startObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !running) {
                startGame();
            }
        });
    }, { threshold: 0.5 });
    startObs.observe(container);

    // expose reset for external use
    container._resetSnake = resetGame;

    // initial render
    setup();
    draw();
})();

