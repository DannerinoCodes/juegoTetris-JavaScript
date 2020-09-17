const PIEZAS = [
    [Z, "#6590a3"],
    [S, "#d4cfcf"],
    [T, "#40798C"],
    [O, "#70A9A1"],
    [L, "#4983ba"],
    [I, "#918ebd"],
    [J, "#854e68"]
];

// La clase pieza
class Pieza {

    constructor(tetromino, color, tablero) {
        // propiedades numeroForma, tetrominioActual, posición x e y en el canvas 
        this.tablero = tablero; // referencia al tablero para dibujar
        this.tetromino = tetromino; // letra de la pieza
        this.color = color;
        this.tetrominoN = 0; // empezamos con la primera forma
        this.activeTetromino = this.tetromino[this.tetrominoN];      // array según la letra de la primera forma  
        this.x = 4;
        this.y = -3;
    }

    // rota la piezaentre las distintas formas del tetrominio
    // de debe controlar que si está muy cerca de las paredes algunas no pueden girar
    rotar = () => {
        let wallkick = 0;
        let siguienteForma = this.tetromino[(this.tetrominoN+1)%this.tetromino.length];
        if (this.colision(0, 0, siguienteForma)) {
            if (this.x > 5) {
                wallkick = -1;
            } else {
                wallkick = 1;
            }
        }

        if (!this.colision(wallkick, 0, siguienteForma)) {
            this.borrar();
            this.x = this.x + wallkick;
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.dibujar();
            this.tablero.caer();
        }
    }


    // rellena el tetromino de la pieza con su color en el canvas
    rellenar = (color) => {
        for (var i = 0; i < this.activeTetromino.length; i++) {
            for (var j = 0; j < this.activeTetromino.length; j++) {
                if (this.activeTetromino[i][j]) {
                    this.tablero.dibujarCasilla(this.x + j, this.y + i, color);

                }
            }
        }
    }

    // dibuja el color de una pieza
    dibujar = () => {
        this.rellenar(this.color);
    }

    // borra una pieza rellenandola de casillas blancas
    borrar = () => { this.rellenar("#2a3958") }

    // mover abajo la pieza, si queda fijada, deberá obtener una nueva
    moverAbajo = () => {

        if (!this.colision(0, 1, this.activeTetromino)) {
            this.borrar();
            this.y++;
            this.dibujar();
        } else {
            this.fijar();
            juego._pieza = juego.piezaAleatoria();
        }
    }

    // mover derecha la pieza hasta chocar con la pared 
    moverDerecha = () => {
        if (!this.colision(1, 0, this.activeTetromino)) {
            this.borrar();
            this.x++;
            this.dibujar();
            this.tablero.caer();
        }
    }

    // mover izquierda la pieza hasta chocar con la pared 
    moverIzquierda = () => {
        if (!this.colision(-1, 0, this.activeTetromino)) {
            this.borrar();
            this.x--;
            this.dibujar();
            this.tablero.caer();
        }
    }

    // fijar pieza cuando choca con el suelo u otra pieza
    // hay que comprobar si se ha formado una o varias lineas para borrarlas 
    fijar = () => {
        for (var r = 0; r < this.activeTetromino.length; r++) {
            for (var c = 0; c < this.activeTetromino.length; c++) {
                if (!this.activeTetromino[r][c]) {
                    continue;
                }
                if (this.y + r < 0) {
                    juego.gameOver = true;
                    alert("Game Over");
                    break;
                }
                this.tablero.tablero[this.y + r][this.x + c] = this.color;
            }
        }
        juego._tablero.eliminarFilasCompletas();
    }

    // Comprueba si se produce una colisión de una pieza con el suelo u otra pieza 
    colision = (x, y, pieza) => {
        for (var f = 0; f < pieza.length; f++) {
            for (var c = 0; c < pieza.length; c++) {
                // si la casilla está vacía la obviamos
                if (!pieza[f][c]) {
                    continue;
                }
                let nuevaX = this.x + c + x;
                let nuevaY = this.y + f + y;
                if (nuevaX < 0 || nuevaX >= this.tablero.columna || nuevaY >= this.tablero.fila) {
                    return true; // sale del tablero
                }
                if (nuevaY < 0) { // para evitar acceder a tablero[-1]
                    continue;
                }
                if (this.tablero.tablero[nuevaY][nuevaX] != "#2a3958") {
                    return true;
                }

            }
        }
        return false;
    }


}