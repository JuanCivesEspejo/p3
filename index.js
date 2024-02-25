
/*PASO 1: Puesto que la API que recoga las imágenes de los símbolos, es diferente 
a los símbolos del juego otiginal, procedo a crealos de forma "manual". Para ello: */

/* 1.1. Defino los títulos de cada elemento y creo un url base del que se irán 
 extrayendo la mayoría de los símbolos.*/

const titles = [
    "Dynamite", "Tornado", "Quicksand", "Pit", "Chain",
    "Gun", "Law", "Whip", "Sword", "Rock", "Death", "Wall",
    "Sun", "Camera", "Fire", "Chainsaw", "School", "Scissors",
    "Poison", "Cage", "Axe", "Peace", "Computer", "Castle",
    "Snake", "Blood", "Porcupine", "Vulture", "Monkey", "King",
    "Queen", "Prince", "Princess", "Police", "Woman", "Baby",
    "Man", "Home", "Train", "Car", "Noise", "Bicycle", "Tree",
    "Turnip", "Duck", "Wolf", "Cat", "Bird", "Fish", "Spider",
    "Cockroach", "Brain", "Community", "Cross", "Money", "Vampire",
    "Sponge", "Church", "Butter", "Book", "Paper", "Cloud", "Airplane",
    "Moon", "Grass", "Film", "Toilet", "Air", "Planet", "Guitar",
    "Bowl", "Cup", "Beer", "Rain", "Water", "TV", "Rainbow", "UFO",
    "Alien", "Prayer", "Mountain", "Satan", "Dragon", "Diamond",
    "Platinum", "Gold", "Devil", "Fence", "Video Game", "Math",
    "Robot", "Heart", "Electricity", "Lightning", "Medusa", "Power",
    "Laser", "Nuke", "Sky", "Tank", "Helicopter"
  ];
  
const base_url = "https://www.umop.com/rps101/symbols/";
let image_url;
const elementosObj = {};

/* 1.2. Creo un objeto que contendrá como clave el número del elemento y como
valor un array con: 1) el nombre del elemento y 2) el link del que se obtiene 
su símbolo. Hay
*/

for(let i=1; i<102; i++)
{
    /*1.3. Genero los URL de las imágenes que se van a mostrar. Doy un tratamiento 
    especial a aquellos objetos que no tienen símbolos asociados, sino gifs. */

    if (i === 19) 
    {
        // Elemento POISON
        image_url = 'https://www.umop.com/rps101/symbols/19.gif';
    } 
    else if (i === 36) 
    {
        // Elemento BABY
        image_url = 'https://www.umop.com/rps101/symbols/36.gif';
    } 
    else if (i === 40) 
    {
        // Elemento CAR
        image_url = 'https://www.umop.com/rps101/symbols/40.gif';
    } 
    else if (i === 49) 
    {
        // Elemento FISH
        image_url = 'https://www.umop.com/rps101/symbols/49.gif';
    } 
    else if (i === 55) 
    {
        // Elemento MONEY
        image_url = 'https://www.umop.com/rps101/symbols/55.gif';
    } 
    else if (i === 76) 
    {
        // Elemento TV
        image_url = 'https://www.umop.com/rps101/symbols/76.gif';
    } 
    else if (i === 85) 
    {
        // Elemento PLATINUM
        image_url = 'https://www.umop.com/rps101/symbols/85.gif';
    } 
    else if (i === 86) 
    {
        // Elemento GOLD
        image_url = 'https://www.umop.com/rps101/symbols/86.gif';
    }
    else if (i === 89) 
    {
        // Elemento VIDEO GAME
        image_url = 'https://www.umop.com/rps101/symbols/89.gif';
    }
    else if (i === 91) 
    {
        // Elemento ROBOT
        image_url = 'https://www.umop.com/rps101/symbols/91.gif';
    }
    else
    {
        image_url = `${base_url}${i}.png`;
    }

    //Creo la clave y el valor de cada elemento del diccionario
    const elementoKey = `elemento_${i}`;
    const elementoValue = [titles[i-1], image_url];
    //Asigno cada elemento al diccionario
    elementosObj[elementoKey] = elementoValue;
}

/* 1.4. Creo n=101 contenedores con la etiqueta 'figure' */

const contenedor_imagenes = document.getElementById('every_element');
const contenedor_resultados = document.getElementById('game_results');
const article_resultados = document.getElementById('Titulos_del_resultado');
const contenedor_insulto = document.getElementById('mensaje_insulto');

for (const key in elementosObj) 
{
    //Creo el contenedor figure
    const figure = document.createElement('figure');
    figure.classList.add('element_play');
    figure.id = elementosObj[key][0];
    figure.onclick = (event) => meHanPulsado(event);

    //Creo la imagen, extrayendo con parseint el indice del elemento 
    //para los gifs
    const img = document.createElement('img');
    //Los otros elementos
    img.src = elementosObj[key][1];
    
    //Creo los atributos de img y de p
    img.alt = elementosObj[key][0]; 
    const p = document.createElement('p');
    p.textContent = elementosObj[key][0];
    //Agrego img y p a figure y figure a section
    figure.appendChild(img);
    figure.appendChild(p);
    contenedor_imagenes.appendChild(figure);
}





/*PASO 2: cuando presionen sobre una de las "figure" quiero obtener su id.
Este ID será el del elemento con el que el jugador intentará ganar. */

/* 2.1. La variable objeto_uno almacenará el ID. */
let objeto_uno = ""; 
const meHanPulsado = (event) =>
{
    /* 2.2. Almaceno el ID del objeto pulsado */
    objeto_uno = event.currentTarget.id;

    /* 2.3. Para dar un efecto visual, se cambiará el color del fondo 
    del elemento pulsado. Para ello creo una clase 'active' que se 
    aplicará al elemento 'activado' por el jugador para la partida.
    Elimino de la clase active los elementos presionados previamente. */
    const elementos_jugables = document.querySelectorAll('.element_play');
    for(const elemento_jugable of elementos_jugables)
        elemento_jugable.classList.remove('presionado');

    /* 2.4.Añado a la clase active el elemento pulsado */
    event.currentTarget.classList.add('presionado');
}






/* PASO 3 Defino la lógica de los botones Jugar y Resetear y selecciono 
una figura distinta del usuario de forma aleatoria.*/

/* 3.1. Creo una variable para el objeto del ordenador y una constante 
para el botón.*/
let objeto_dos;
const botonJugar = document.getElementById('play_game_button');

/* 3.2. Implemento la función iniciaPartica que hará lo siguiente */
const iniciaPartida = (event) => 
{
    if(objeto_uno)
    {
        /* 3.2.1. Elige un elemento aleatorio */
        objeto_dos = obtenerIndiceAleatorio();
        /* 3.2.1. Oculta el menú de selección de elementos */
        document.getElementById("Menu_play").style.display = "none";
        document.getElementById("every_element").style.display = "none";
        /* 3.2.2. Muestra el menú de resultados */
        document.getElementById("Menu_reset").style.display = "flex";
        document.getElementById("game_results").style.display = "grid";
        article_resultados.style.display = "flex";
        /* 3.2.2. Obtiene el resultado de la partida */
        obtenerResultado(objeto_uno, objeto_dos);
    }
    else
        alert("No ha seleccionado ningún elemento");
}
botonJugar.onclick = iniciaPartida;

/* 3.3. Implemento la función reinicioPartida que hará lo siguiente */
const botonResetear = document.getElementById('reset_game_button');
const reinicioPartida = (event) => 
{
    /* 3.3.1. Muestra el menú de selección */
    document.getElementById("Menu_play").style.display = "flex";
    document.getElementById("every_element").style.display = "grid";
    /* 3.3.2. Oculta el menú de resultados*/
    document.getElementById("Menu_reset").style.display = "none";
    document.getElementById("game_results").style.display = "none";
    article_resultados.style.display = "none";
    contenedor_insulto.style.display = "none";
}
botonResetear.onclick = reinicioPartida;

/* 3.4. Creo una función que me devuelva un elemento aleatorio. Tiene 
que ser distinro del que escoja el usuario */
const obtenerIndiceAleatorio = () => 
{
    let objeto_dos_copia = "";
    let randomIndex;
    do 
    {
        randomIndex = Math.floor(Math.random() * titles.length);
    } 
    while (titles[randomIndex] === objeto_uno);
    objeto_dos_copia = titles[randomIndex];
    return objeto_dos_copia;
    ;
};






/*PASO 4: Defino la lógica del resultado de la partida */

let wins = 0;
let losses = 0;

async function obtenerResultado(objeto_uno, objeto_dos) 
{
    try 
    {
        /* 4.1. Hago la llamada al API que me devuelve el ganador entre dos elementos y guardo la respuesta */
        contenedor_resultados.innerHTML = "";
        article_resultados.innerHTML = "";
        contenedor_insulto.innerHTML = "";
        const respuesta = await fetch(`https://rps101.pythonanywhere.com/api/v1/match?object_one=${objeto_uno.toLowerCase()}&object_two=${objeto_dos.toLowerCase()}`);
        
        if (!respuesta.ok) 
        {
            throw new Error(`Se ha producido un error en la solicitud: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        const winner = datos["winner"];
        const outcome = datos["outcome"];
        const loser = datos["loser"];
        const resultado = document.createElement('h1');

        /* 4.2. Si el usuario gana: */
        let emoji;
        if(objeto_uno === winner)
        {
            /* 4.2.1. Se suma 1 al contador de victorias y se oculta el insulto */
            wins++;
            resultado.textContent = "You win";
            contenedor_insulto.style.display = "none";
            /* 4.2.2. Se obtiene un emoji positivo */
            emoji = await obtenerEmojiPositivo();
        }
        /* 4.3. Si el usuario pierde: */
        else
        {
            /* 4.3.1. Se suma 1 al contador de derrotas */
            losses++;
            resultado.textContent = "You loose"; 
            /* 4.3.2. Se muestra un insulto */
            const insulto = await obtenerInsulto();
            const titulo_insulto = document.createElement('p');
            titulo_insulto.textContent = insulto;
            contenedor_insulto.appendChild(titulo_insulto);
            contenedor_insulto.style.display = "flex";
            /*4.3.3. Se obtiene un emoji negativo*/
            emoji = await obtenerEmojiNegativo();
        }
        /* 4.4. Se muestra el emoji */
        const contenedor_emoji = document.createElement('div');
        document.getElementById('contadorVictoria').textContent = `Wins: ${wins}`;
        document.getElementById('contadorDerrota').textContent = `Losses: ${losses}`;
        contenedor_emoji.innerHTML = emoji;
        resultado.appendChild(contenedor_emoji);

        /* 4.5. Se muestra el resultado (victoria o derrota y justificación) por pantalla */
        article_resultados.appendChild(resultado);
        const titulo = document.createElement('h2');
        titulo.textContent = `${winner} ${outcome} ${loser}`;
        article_resultados.appendChild(titulo);

        /* 4.6. Se añade la figura que había seleccionado el usuario */
        const figure_usuario = document.createElement('figure');
        figure_usuario.classList.add('imagenes_resultado');
        figure_usuario.id = objeto_uno;
        const img_usuario = document.createElement('img');
        img_usuario.alt = objeto_uno; 
        const clave = `elemento_${titles.indexOf(objeto_uno)+1}`;
        img_usuario.src = elementosObj[clave][1];
        const p_usuario = document.createElement('p');
        p_usuario.textContent = objeto_uno;
        figure_usuario.appendChild(img_usuario);
        figure_usuario.appendChild(p_usuario);
        contenedor_resultados.appendChild(figure_usuario);

        /* 4.7. Se añade la figura que había seleccionado el ordenador */
        const figure_ordenador = document.createElement('figure');
        figure_ordenador.classList.add('imagenes_resultado');
        figure_ordenador.id = objeto_dos;
        const img_ordenador = document.createElement('img');
        img_ordenador.alt = objeto_dos; 
        const clave_2 = `elemento_${titles.indexOf(objeto_dos)+1}`;
        img_ordenador.src = elementosObj[clave_2][1];
        const p_ordenador = document.createElement('p');
        p_ordenador.textContent = objeto_dos;
        figure_ordenador.appendChild(img_ordenador);
        figure_ordenador.appendChild(p_ordenador);
        contenedor_resultados.appendChild(figure_ordenador);
    } 
    catch (error) 
    {
        console.error(`Ocurrió el siguiente error: ${error.message}`);
    }
}






/* PASO 5: Obtengo el insulto y el emoji de las APIs correspondientes */

/* 5.1. Llamada al API de los insultos para el caso en el que se pierda */
async function obtenerInsulto() 
{
    try 
    {
        const respuesta = await fetch(`https://insult.mattbas.org/api/en/insult.json`);
        if (!respuesta.ok) 
        {
            throw new Error(`Se ha producido un error en la solicitud: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        const insulto = datos["insult"];
        return insulto;
    } 

    catch (error) 
    {
        console.error(`Ocurrió el siguiente error: ${error.message}`);
    }
}

/* 5.2. Llamada al API de los emojis para el caso en el que se gane */
async function obtenerEmojiPositivo() 
{
    try 
    {
        const respuesta = await fetch(`https://emojihub.yurace.pro/api/random/group/face-positive`);
        if (!respuesta.ok) 
        {
            throw new Error(`Se ha producido un error en la solicitud: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        const emojiPositivo = datos["htmlCode"][0];
        return emojiPositivo;
    } 

    catch (error) 
    {
        console.error(`Ocurrió el siguiente error: ${error.message}`);
    }
}

/* 5.3. Llamada al API de los emojis para el caso en el que se pierda */
async function obtenerEmojiNegativo() 
{
    try 
    {
        const respuesta = await fetch(`https://emojihub.yurace.pro/api/random/group/face-negative`);
        if (!respuesta.ok) 
        {
            throw new Error(`Se ha producido un error en la solicitud: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        const emojiNegativo = datos["htmlCode"][0];
        return emojiNegativo;
    } 

    catch (error) 
    {
        console.error(`Ocurrió el siguiente error: ${error.message}`);
    }
}
