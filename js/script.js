import { ouvrirModal } from './modal.js';

export let urlRacine = 'http://localhost:8000/api/v1/titles/';

//-------Meilleur film-------//
const chargerMeilleurMovie = async() => {
    try {
        const response = await fetch (urlRacine + '?sort_by=-imdb_score');
        if (response.status === 200) {
            const data = await response.json();
           
            let titreMeilleurMovie = data.results[0].title;
            let photoMeilleurMovie = data.results[0].image_url;

            // Donées Meilleur Film
            //id Meilleur Film
            let idMeilleurMovie = data.results[0].id;

            const urlMeilleurMovie = await fetch (urlRacine + idMeilleurMovie);
            if (urlMeilleurMovie.status === 200) {
                const url = await urlMeilleurMovie.json();
                
                let meilleurFilmPhoto = document.querySelector('.meilleur_film_photo');
                let meilleurFilmDescription = document.querySelector('.meilleur_film_description')

                meilleurFilmPhoto.innerHTML= `<img src="${photoMeilleurMovie}" alt="${titreMeilleurMovie}">` 
                meilleurFilmDescription.innerHTML= `<h1 class="title">${titreMeilleurMovie}</h1>
                                                    <p class="resume-meilleur-film">${url.description}</p>

                                                    <button role="button" id="${url.id}">+ Plus d'info</button>`
            }else{
                return false;
            }
            //Modal
            const button = document.getElementsByTagName('button')[0];

            button.addEventListener('click', () => {
                const id = button.getAttribute('id');
                ouvrirModal(id); //modal.js
            });  
        }else{
            return false;
        }

    } catch(err){
        console.log(err);
    }
};


//-------Les Mieux Notées-------//
const chargerMovies = async() =>{
    try{
        const response = await fetch (urlRacine + '?sort_by=-imdb_score');
        const response_pag_1 = await fetch (urlRacine + '?sort_by=-imdb_score' + '&page=2');
        
        if(response.status && response_pag_1.status === 200){
            const data = await response.json();
            const data_pag_1 = await response_pag_1.json();

            let mieuxNotees_pag_1 = data.results;
            let mieuxNotees_pag_2 = data_pag_1.results;
            let mieuxNoteesAll = mieuxNotees_pag_1.concat(mieuxNotees_pag_2[0]).concat(mieuxNotees_pag_2[1]);

            let movieResp = document.getElementById('carrousel_films_mieux_notees');
            
            movieResp.innerHTML = '';
            for(let i of mieuxNoteesAll){
                        
                movieResp.innerHTML += `<div class="movie" >
                                <img id="${i.id}" src="${i.image_url}" alt="${i.title}">
                              </div>`;
            }

            //Modal
            const img = document.getElementsByTagName('img');
            
            for (let i of img) {
                i.addEventListener('click', () => {
                    const id = i.getAttribute('id');
                
                    ouvrirModal(id); //modal.js
                })
            }
        }else {
            return false;
        };
    }
    catch(err){
        console.log(err);
    };

};

//-------Films Categorie-------//
const chargerFilmCategorie = async() => {
    try{
        categoriesChoice = ["adventure", "action", "comedy"];

        for(let i of categoriesChoice){
            const response = await fetch (urlRacine + '?sort_by=-imdb_score&genre=' + i)
            const response_pag_1 = await fetch (urlRacine + '?sort_by=-imdb_score&genre=' + i + '&page=2');

            if(response.status && response_pag_1.status === 200){
                const data = await response.json();
                const data_pag_1 = await response_pag_1.json();
                
                let mieuxNotees_pag_1 = data.results; 
                let mieuxNotees_pag_2 = data_pag_1.results;                
                let mieuxNoteesAll = mieuxNotees_pag_1.concat(mieuxNotees_pag_2[0]).concat(mieuxNotees_pag_2[1]);                
                let movieResp = document.getElementById('carrousel_' + i);
                
                movieResp.innerHTML = '';
                
                for(let j of mieuxNoteesAll){

                    movieResp.innerHTML += `<div class="movie" >
                                                <img id="${j.id}" src="${j.image_url}" alt="${j.title}">
                                            </div>`;
                    }

                // Modal
                const img = document.getElementsByTagName('img');
        
                for (let i of img) {
                    i.addEventListener('click', () => {
                        const id = i.getAttribute('id');
                    
                        ouvrirModal(id); //modal.js
                    })
                }   
            }else {
             return false;
            };
        };      
    }catch(err){
        console.log(err)
    };

};

window.addEventListener('load', function () {
    chargerMovies();
    chargerMeilleurMovie();
    chargerFilmCategorie();
});
