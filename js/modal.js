const fermer = document.querySelector('.close');
const ouvrir = document.querySelector('.movie');
const modal = document.querySelector('.modal');
const modalC = document.querySelector('.modal-container');

ouvrir.addEventListener('click', function (e){
    e.preventDefault();
    modalC.style.opacity = "1";
    modalC.style.visibility = "visible";
    modal.classList.toggle("modal-close");
});

fermer.addEventListener('click', function (e) {
    modal.classList.toggle("modal-close");
    
    setTimeout(function () {
        modalC.style.opacity = "0";
        modalC.style.visibility = "hidden";
    }, 800)
});

window.addEventListener('click', function (e) {
    if(e.target == modalC){
        modal.classList.toggle("modal-close");

        setTimeout(function () {
            modalC.style.opacity = "0";
            modalC.style.visibility = "hidden";
        }, 800)
    }

});