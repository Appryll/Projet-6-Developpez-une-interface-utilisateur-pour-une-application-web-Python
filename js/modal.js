 import { urlRacine } from './script.js';

// ouvrir modal
export async function ouvrirModal (idMovie) {
    //recuperation de donnes selon ID

     const responseModal = await fetch (urlRacine + idMovie); 
     console.log ("responseModal");
     
     if(responseModal.status === 200) {
         const dataResponseModal = await responseModal.json();
         console.log ("dataResponseModal");
         let photoMovie = dataResponseModal.image_url;
         let title = dataResponseModal.title;
         let genre = dataResponseModal.genres;
         let date_sortie = dataResponseModal.date_published;
         let rated = dataResponseModal.rated;
         let imdb_score = dataResponseModal.imdb_score;
         let director = dataResponseModal.directors;
         let actors = dataResponseModal.actors;
         let duration = dataResponseModal.duration;
         let countries = dataResponseModal.countries;
         let avg_vote = dataResponseModal.avg_vote;
         let long_description = dataResponseModal.long_description;
         
         let modalText = document.getElementById('modal-text');
         console.log("modalText");
         modalText.innerHTML= `<h1>"${title}"</h1>
                                 <div class="title-modal">
                                 <h6>Genre:</h6> <p>${genre}</p>
                                 </div>
 
                                 <div class="title-modal">
                                 <h6>Date de sortie:</h6> <p>${date_sortie}</p>
                                 </div>
                                 
                                 <div class="title-modal">
                                 <h6>Rated:</h6> <p>${rated}</p>
                                 </div>
 
                                 <div class="title-modal">
                                 <h6>Score Imdb:</h6> <p>${imdb_score}</p>
                                 </div>
                                
                                 <div class="title-modal">
                                 <h6>Réalisateur:</h6> <p>${director}</p>
                                 </div>
 
                                 <div class="title-modal">
                                 <h6>Acteurs:</h6> <p>${actors}</p>
                                 </div>
 
                                 <div class="title-modal">
                                 <h6>Durée:</h6> <p>${duration} minutes</p>
                                 </div>
 
                                 <div class="title-modal">
                                 <h6>Pays d’origine:</h6> <p>${countries}</p>
                                 </div>
                                
                                 <div class="title-modal">
                                 <h6>Résultat au Box Office:</h6> <p>${avg_vote}</p>
                                 </div>
                                 
                                 <div class="title-modal">
                                 <h6>Résumé:</h6> <p>${long_description}</p>
                                 </div>`
         console.log("modalText.innerHTML");
         let modalPhoto = document.getElementById('modal-photo');
         modalPhoto.innerHTML = `<img src="${photoMovie}" alt="${title}">` 
 
         console.log("modalPhoto.innerHTML");
 
         console.log ("dataresponseModal");
     }
 
    // visibility / opacity modal
    document.querySelector('.modal-container').style.opacity = "1";
    document.querySelector('.modal-container').style.visibility = "visible";
    document.querySelector('.modal').classList.toggle("modal-close"); //translate -200
    console.log("queryselector modal/modalcontainer");       
} 

// fermer modal
const fermer = document.querySelector('.close');
const modal = document.querySelector('.modal');
const modalC = document.querySelector('.modal-container');

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