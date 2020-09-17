const cvs = document.getElementById("tetris");
var juego = new Juego(cvs);
var audio = document.getElementById("music");
audio.volume = 0.1; 
document.addEventListener("keydown", juego.control);
juego.tablero.dibujarTablero();
juego.caer();














