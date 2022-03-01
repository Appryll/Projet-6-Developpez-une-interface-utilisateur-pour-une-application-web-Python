import { ouvrirModal } from './modal.js';

export let urlRacine = 'http://localhost:8000/api/v1/titles/';

//-------Meilleur film-------//
const chargerMeilleurMovie = async() => {
    try {
        /// Fx
        const response = await fetch (urlRacine + '?sort_by=-imdb_score');
        if (response.status === 200) {
            const data = await response.json();
        /// fin Fx
           
            let titreMeilleurMovie = data.results[0].title;
            let photoMeilleurMovie = data.results[0].image_url;

            // Donées Meilleur Film
                //id Meilleur Film
                let idMeilleurMovie = data.results[0].id;

                 /// Fx
                const urlMeilleurMovie = await fetch (urlRacine + idMeilleurMovie);
                if (urlMeilleurMovie.status === 200) {
                    const url = await urlMeilleurMovie.json();
                /// fin Fx
                    
                    let meilleurFilmPhoto = document.querySelector('.meilleur_film_photo');
                    let meilleurFilmDescription = document.querySelector('.meilleur_film_description')

                    meilleurFilmPhoto.innerHTML= `<img src="${photoMeilleurMovie}" alt="${titreMeilleurMovie}">` 
                    meilleurFilmDescription.innerHTML= `<h1 class="title">${titreMeilleurMovie}</h1>
                                                        <p class="resume-meilleur-film">${url.description}</p>

                                                        <button role="button" id="${url.id}">+ Plus d'info</button>` 

                const button = document.getElementsByTagName('button')[0];

                button.addEventListener('click', () => {
                    const id = button.getAttribute('id');
                    console.log (id);
                
                    console.log(button);

                    ouvrirModal(id);
                });

                // // id Movie
                // let idMeilleurMovie = url.id;
                // //console.log(idMeilleurMovie);
 
                // // Get id Movie
                // const ouvrir = document.getElementById(idMeilleurMovie);
                // //console.log(ouvrir);

                // // if event click->fxouvrir modal
                
                // ouvrir.addEventListener('click', () => {
                //     console.log("ourvir");
                    
                //     ouvrirModal(idMeilleurMovie);  //recuperation des donnes selon id + gerer modal + ouvrir modal
                // })

                }else{
                    return false;
                }
        
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

                

            // // id Movie
            // let idMovieMieuxNotees = i.id;
            // //console.log(idMovieMieuxNotees);

            // // Get id Movie
            // const ouvrir = document.getElementById(idMovieMieuxNotees);
            // //console.log(ouvrir);

            // // if event click->fxouvrir modal
            
            // ouvrir.addEventListener('click', () => {
            //     console.log("ourvir");
                
            //     ouvrirModal(idMovieMieuxNotees);  //recuperation des donnes selon id + gerer modal + ouvrir modal
            // })
            }
            const img = document.getElementsByTagName('img');
            console.log (img);

            for (let i of img) {
                i.addEventListener('click', () => {
                    console.log("coucou");
                    const id = i.getAttribute('id');
                    console.log (id);
                
                    ouvrirModal(id);
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

                    const img = document.getElementsByTagName('img');
                    console.log (img);
        
                    for (let i of img) {
                        i.addEventListener('click', () => {
                            console.log("coucou");
                            const id = i.getAttribute('id');
                            console.log (id);
                        
                            ouvrirModal(id);
                        })
                    }


                    // // id Movie
                    // let idMovieCategories = j.id;
                    // //console.log(idMeilleurMovie);

                    // // Get id Movie
                    // const ouvrir = document.getElementById(idMovieCategories);
                    // //console.log(ouvrir);

                    // // if event click->fxouvrir modal
                    
                    // ouvrir.addEventListener('click', () =>{
                    //     console.log("ourvir");
                        
                    //     ouvrirModal(idMovieCategories);  //recuperation des donnes selon id + gerer modal + ouvrir modal
                    // })
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
