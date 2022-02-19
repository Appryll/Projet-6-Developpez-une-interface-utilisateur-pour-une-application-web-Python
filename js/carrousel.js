const ligne = document.querySelector('.container-carrousel');
const movie = document.querySelectorAll('.movie');

const flecheGauche = document.getElementById('angle-left');
const flecheDroite = document.getElementById('angle-right');

//--------------------- Event Listener fleche Droite-------------------//

flecheDroite.addEventListener('click', () => {
    ligne.scrollLeft += ligne.offsetWidth;

    const indicateurActive = document.querySelector('.indicators .activo');
    if (indicateurActive.nextSibling){
        indicateurActive.nextSibling.classList.add('activo');
        indicateurActive.classList.remove('activo');
    }
});

//--------------------- Event Listener fleche Gauche-------------------//

flecheGauche.addEventListener('click', () => {
    ligne.scrollLeft -= ligne.offsetWidth;

    const indicateurActive = document.querySelector('.indicators .activo');
    if (indicateurActive.previousSibling){
        indicateurActive.previousSibling.classList.add('activo');
        indicateurActive.classList.remove('activo');
    }
});

//--------------------- Pagination -----------------------//

const nomberPage = Math.ceil(movie.length / 7); //nomber entier
for(let i = 0; i < nomberPage; i++){
    const indicateur = document.createElement('button');

    if(i === 0){
        indicateur.classList.add('activo');
    }

    document.querySelector('.indicators').appendChild(indicateur);
    indicateur.addEventListener('click', (e) =>{
        ligne.scrollLeft = i * ligne.offsetWidth; // * el ancho de la fila

        document.querySelector('.indicators .activo').classList.remove('activo');
        e.target.classList.add('activo');
    });
}

//--------------------------- hover ---------------//
movie.forEach((film) => {
    film.addEventListener('mouseenter', (e) => {
        const element = e.currentTarget;
        setTimeout(() =>{
            movie.forEach(film => film.classList.remove('hover'));
            element.classList.add('hover');
        }, 300);
    });
});

ligne.addEventListener('mouseleave', () => {
    movie.forEach(film => film.classList.remove('hover'));
});