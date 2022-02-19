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

            document.getElementById('meilleur_film').innerHTML= `<div class="container">
                                                                    <h1 class="title">${titreMeilleurMovie}</h1>
                                                                    <img src="${photoMeilleurMovie}" alt="${titreMeilleurMovie}">
                                                                </div>
                                                                `   
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

        if(response.status === 200){
            const data = await response.json();

            let moviesResp = ``;
            data.results.forEach(moviesResp => {    
                moviesResp += `<div class="movie">
                                    <img src="${moviesResp.image_url}" alt="">
                               </div>`;      
            document.getElementById('carrousel').innerHTML = moviesResp
            console.log(moviesResp)
            });
            
        }else {
            return false;
        };
    }
    catch(err){
        console.log(err);
    };

};

chargerMovies();
chargerMeilleurMovie();

// console.log("salut");
// const genres = 'http://127.0.0.1:8000/api/v1/genres/'
// const titles = 'http://localhost:8000/api/v1/titles/'
 
// function traer() {
//     fetch(titles)
//     .then(res => res.json())
//     .then(data => {
//         let pages = data.next; 
//         let resultados = data.results;

//         console.log(resultados);
//         console.log(pages);

//         for (let i of resultados) {
//             let images_url = i.image_url
//             console.log(images_url);

//             carrousel.innerHTML = `<div class="movie">
//                                         <img src="${images_url}" alt="">
//                                     </div>`; 
//         };
        
//     })
// }

// meilleur_film.innerHTML = 
//             `<img src="${data.results[1].image_url}" alt="">
 //            <p class="description">"${data.results[1].description}"</p>`

            
// for (let indice of nombredelarraydeobjetos){console.log(indice.nombredelobjeto)}
// document.querySelector('#nombredelboton).addEventListener('click',function(){
  //  nuevaVentana();
// });
// function nuevaVentana(){

// }
// for (let i of data){
 //   console.log(i.next)
//};
