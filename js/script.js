const personajesLista = document.getElementById('character-list'); // es un <ul>
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');


// función para obtener datos de la API
function fetchFunction (page){
    return fetch('https://rickandmortyapi.com/api/character/?page=' + page) 
        .then ((response)=>{
            if (!response.ok) {
                throw new Error ('La solicitud no fue exitosa');
            }
            return response.json(); 
        })
        .catch((error) => {
            personajesLista.innerText = 'Error: No se pudo obtener información.'
        });
}


// función para mostrar personajes
function mostrarPersonajes(personajes) {
    personajesLista.innerHTML = ''; // necesario para limpiar el contenido cada vez
    personajes.forEach(personaje => {
        const lista = document.createElement('li');
        lista.innerHTML = `
        <img src= "${personaje.image}" alt="${personaje.name}">
        <h2><span>Name:</span> ${personaje.name}</h2>
        <p><span>Species:</span> ${personaje.species}</p>`;
        
        personajesLista.appendChild(lista); })};

// funcion para actualizar la página
function pagina(page) {
    fetchFunction(page)
    .then ((data) => {
        if(data){ 
            mostrarPersonajes(data.results);}})}



// eventos de los botones siguiente y anterior página
nextPageBtn.addEventListener('click', function() {
    paginaActual++;
    pagina(paginaActual);
  });

prevPageBtn.addEventListener('click', function() {
    if (paginaActual > 1) {
        paginaActual--;
        pagina(paginaActual);
    }
});


// llamo a la función
let paginaActual = 1; 
pagina(paginaActual);