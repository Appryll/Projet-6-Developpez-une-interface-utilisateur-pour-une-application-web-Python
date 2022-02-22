let urlRacine = 'http://localhost:8000/api/v1/titles/'

//-------Meilleur film-------//
const chargerMeilleurMovie = async() => {
    try {
        const response = await fetch (urlRacine + '?sort_by=-imdb_score');

        if (response.status === 200) {
            const data = await response.json();
            // Titre Meilleur Film
            let titreMeilleurMovie = data.results[0].title;
            //Photo Meilleur Film
            let photoMeilleurMovie = data.results[0].image_url;
            // Resume Meilleur Film
                //id Meilleur Film
                let idMeilleurMovie = data.results[0].id;
                
                const urlMeilleurMovie = await fetch (urlRacine + idMeilleurMovie);

                if (urlMeilleurMovie.status === 200) {
                    const url = await urlMeilleurMovie.json();
                    let resumeMeilleurFilm = url.long_description;

                    document.querySelector('.meilleur_film_photo').innerHTML= `<img src="${photoMeilleurMovie}" alt="${titreMeilleurMovie}">` 
                    document.querySelector('.meilleur_film_description').innerHTML= `<h1 class="title">${titreMeilleurMovie}</h1>

                                                                                        <p class="resume-meilleur-film">${resumeMeilleurFilm}</p>

                                                                                        <div class="titles">
                                                                                        <h6>Genre:</h6> <p>${url.genres}</p>
                                                                                        </div>
                                                                
                                                                                        <div class="titles">
                                                                                        <h6>Actors:</h6> <p>${url.actors}</p>
                                                                                        </div>

                                                                                        <div class="titles">
                                                                                        <h6>Scénariste:</h6> <p>${url.directors}</p>
                                                                                        </div>

                                                                                        <div class="titles">
                                                                                        <h6>Compositeur:</h6> <p>${url.writers}</p>
                                                                                        </div>

                                                                                        <div class="titles">
                                                                                        <h6>Langue:</h6><p>${url.languages} </p>
                                                                                        </div>

                                                                                        <div class="titles">
                                                                                        <h6>Année:</h6><p>${url.year} </p>
                                                                                        </div>

                                                                                        <div class="titles">
                                                                                        <h6>Lieu:</h6><p>${url.countries}</p>
                                                                                        </div>

                                                                                        <div class="titles">
                                                                                        <h6>Duration:</h6> <p>${url.duration} minutes</p>
                                                                                        </div>

                                                                                        <div class="titles">
                                                                                        <h6>Score Imdb:</h6> <p>${url.imdb_score} /</p><p>${url.votes} votes</p>
                                                                                        </div>

                                                                                        ` 
                
                                                         
                }else{
                    return false;
                }
        }else{
            return false;
        }
    }
    catch(err){
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
                
                movieResp.innerHTML += `<div class="movie">
                                <img src="${i.image_url}" alt="${i.title}">
                              </div>`;
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
                    movieResp.innerHTML += `<div class="movie">
                                                <img src="${j.image_url}" alt="${j.title}">
                                            </div>`;
                    };
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


