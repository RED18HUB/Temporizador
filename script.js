const html = document.querySelector('html');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner =document.querySelector('.app__image');
const titulo =document.querySelector('.app__title');
const botonones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const textoIniciarPausar = document.querySelector('#start-pause span');
const  tiempoEnPantalla =document.querySelector('#timer');



const imagenPausarPlay=document.querySelector('.app__card-primary-butto-icon');



const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const musicabeep = new Audio('./sonidos/beep.mp3');
const musicaplay = new Audio('./sonidos/play.wav');
const musicapause = new Audio('./sonidos/pause.mp3');
const botonIniciarPausar = document.querySelector('#start-pause');
let idIntervalo =null;

let tiempoTRanscurridoEnSegundos=1500

musica.loop=true;

inputEnfoqueMusica.addEventListener('change',()=>{
    if(musica.paused){
        musica.play();
    }
    else{
        musica.pause();
    }
})

botonEnfoque.addEventListener('click', () => {
    tiempoTRanscurridoEnSegundo=1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');

});

botonCorto.addEventListener('click', () => {
    tiempoTRanscurridoEnSegundos=300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botonLargo.addEventListener('click', () => {
    tiempoTRanscurridoEnSegundos=900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');

});


function cambiarContexto (contexto) {
    mostrarTiempo();
    botonones.forEach(function(contexto){
        contexto.classList.remove('active'); 
    });
    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`./imagenes/${contexto}.png`);
    switch (contexto)
    {
        case "enfoque":
            titulo.innerHTML=` Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
            break;
        case "descanso-corto":
            titulo.innerHTML=`¿Que tal tomar un respiro?,<br>
            <strong class="app__title-strong">!Haz una pausa corta¡.</strong>`;
            break;
        case "descanso-largo": 
            titulo.innerHTML=` Hora de volver a la superficie,<br>
            <strong class="app__title-strong">!Haz una pausa larga.</strong>`;
            break;
        default:
            break;
    }
}

const cuentaRegresiva = ()=>{
    if(tiempoTRanscurridoEnSegundos <= 0)
    {
        musicabeep.play();
        alert("tiempo final");
        reiniciar();
        return
    }
    textoIniciarPausar.textContent="Pausar";
    tiempoTRanscurridoEnSegundos-=1;
    mostrarTiempo();
}
botonIniciarPausar.addEventListener('click',iniciarPausar);

function iniciarPausar(){
    if(idIntervalo)
    {
        musicapause.play();
        reiniciar();
        return
    }
    musicaplay.play();
    idIntervalo=setInterval(cuentaRegresiva,1000);
    textoIniciarPausar.textContent="Pausar";
    imagenPausarPlay.setAttribute('src',`./imagenes/pause.png`);

}
function reiniciar(){
    clearInterval(idIntervalo);
    idIntervalo=null;
    imagenPausarPlay.setAttribute('src','./imagenes/play_arrow.png');
    textoIniciarPausar.textContent="Comenzar";
}
function mostrarTiempo(){
    const  tiempo = new Date (tiempoTRanscurridoEnSegundos*1000);
    const tiempoFortmateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit',second:'2-digit'});
    tiempoEnPantalla.innerHTML=`${tiempoFortmateado}`
}
mostrarTiempo();