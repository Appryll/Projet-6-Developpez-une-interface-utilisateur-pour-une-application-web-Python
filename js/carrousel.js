window.addEventListener('load', function () {
    categoriesChoice = ["films_mieux_notees", "adventure", "action", "comedy"];

for (let i of categoriesChoice) {
    console.log(i);
    const ligne = document.getElementById('container-carrousel_' + i);

const flecheGauche = document.getElementById('angle-left_' + i);
const flecheDroite = document.getElementById('angle-right_' + i);


//--------------------- Event Listener fleche Droite-------------------//

flecheDroite.addEventListener('click', () => {
    ligne.scrollLeft += ligne.offsetWidth;
});

//--------------------- Event Listener fleche Gauche-------------------//

flecheGauche.addEventListener('click', () => {
   ligne.scrollLeft -= ligne.offsetWidth;
});

}
});