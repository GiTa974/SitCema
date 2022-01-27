
function DisplayOneTopRatedMovie(apiUrl) { // recupere les donnees du meilleur film
  displayLoader(true);
  let pathFilmsSortedByScore = '?sort_by=-imdb_score'
  fetch(apiUrl + pathFilmsSortedByScore).then(response => {
    return response.json();
  }).then(data => {
    let current_div = document.getElementById('bestMovie');
    let div = document.createElement("DIV");
    div.setAttribute("class", "titleOne");
    current_div.appendChild(div);
    div.innerHTML = data.results[0].title + ' (' + data.results[0].year + ')';
    movieURL = data.results[0].url;
    fetch(movieURL).then(response => {
      return response.json();
    }).then(data => {
      current_div = document.getElementById('description');
      current_div.addEventListener("click", function () {
        feed_modal(apiUrl, id)
      });
      current_div.innerHTML = data.long_description;
    }).catch(err => {
      console.log('error', err);
    });
    src = data.results[0].image_url,
    img = document.createElement('img');
    let id = data.results[0].id + '';
    img.addEventListener("click", function () {
      feed_modal(apiUrl, id)
    });
    img.src = src;
    current_div = document.getElementById('illustration');
    current_div.appendChild(img)
    displayLoader(false);
  }).catch(err => {
    console.log('error', err);
  });
}

// la liste des sections a enchirir d un caroussel avec 7 films
listOfCategories = ['categorie01Section', 'categorie02Section', 'categorie03Section', 'categorie04Section']

function DisplayCategory(apiUrl, filter, div) { // rempli le caroussel
  displayLoader(true);
  fetch(apiUrl + filter).then(response => {
    return response.json();
  }).then(data => {
    listOfMovies = data.results;
    currentQuantityOfMovies = prepareData(listOfMovies, div, 0, 7); // je recupere 7 films max (en fait 5 dispo sur la page)
    let apiUrlNextPage = data.next;
    if (apiUrlNextPage) {
      fetch(apiUrlNextPage).then(response => {
        return response.json();
      }).then(data => {
        listOfMoviesNextPage = data.results;
        prepareData(listOfMoviesNextPage, div, currentQuantityOfMovies, 7) // je recupere le reste pour arriver a 7 films si nécessaire
      }).catch(err => {
        console.log('error no next page', err);
      });
    };
    createButtons(div);
    placeButton(div);
    displayLoader(false);
  }).catch(err => {
    // log error
    console.log('error', err);
  });
};

function prepareData(listOfMovies, div, currentQuantity, quantityMax) { // prepare les donnees des elements du caroussel ou du titre a la une
  for (let i = 0; i < listOfMovies.length; i++) {
    currentQuantity++;
    if (currentQuantity <= quantityMax) {
      let current_div = document.getElementById(div)
      let contenaire = document.createElement("contenair");
      contenaire.setAttribute('class', 'contenair')
      current_div.appendChild(contenaire);
      // title
      let div_title = document.createElement("DIV");
      div_title.setAttribute("class", "titleSmall");
      contenaire.appendChild(div_title);
      div_title.innerHTML = listOfMovies[i].title;
      // image
      let div_img = document.createElement("DIV");
      contenaire.appendChild(div_img)
      let id = listOfMovies[i].id + '';
      contenaire.addEventListener("click", function () {
        feed_modal(apiUrl, id);
      });
      if (i == 10) {
        contenaire.style.display = "none";
      }
      src = listOfMovies[i].image_url;
      img = document.createElement('img');
      img.src = src;
      div_img.appendChild(img);
    } else {
      // console.log('reach the end with : ' + currentQuantity); // check du nombre de film 
      break;
    };
  };
  return currentQuantity;
};

function feed_modal(apiUrl, id) { // rempli la fenetre modal avec les infos a la demande
  feed_loading();
  fetch(apiUrl + id).then(response => {
    return response.json();
  }).then(data => {
    description_div = document.getElementById('description');
    let head = document.getElementById('modal_header');
    head.removeChild(head.childNodes[0]);
    var title = document.createTextNode(data.title + ' (' + data.year + ')');
    head.insertBefore(title, document.getElementsByClassName('closeBtn')[0]);
    // recuperation des informations d un film
    let body = document.getElementById('modal_body');
    let sep = '<BR>';
    let genre = 'genre(s) : ' + data.genres + sep;
    let date = 'date de sortie : ' + data.year + sep;
    let rated = 'rated : ' + data.rated + sep;
    let score = 'imdb_score : ' + data.imdb_score + sep;
    let directors = 'realisateur(s) : ' + data.directors + sep;
    let actors = 'acteur(s) : ' + data.actors + sep;
    let duration = 'duree : ' + data.duration + " min" + sep;
    let countries = 'pays : ' + data.country + sep;
    let boxOffice = 'box office : ' + data.usa_gross_income + ' USD' + sep;
    let resume = 'Resume : ' + data.long_description + sep;
    infos = document.createElement('DIV');
    infos.setAttribute("class", "infosModal");
    body.innerHTML = ''; // erase default text in modal
    body.appendChild(infos);
    infos.innerHTML = genre + date + rated + score + directors + actors + duration + countries +
      boxOffice + resume;
    // image
    src = data.image_url;
    img = document.createElement('img');
    img.src = src;
    try {
      infos.replaceChild(img, body.img);
    } catch (error) {
      // console.error(error);
      infos.appendChild(img);
    };
  }).catch(err => {
    console.log('error', err);
  });
  openModal();
};

function feed_loading() { // rempli la fenetre modal avec des elements pour indiquer le chargement des donnees
  let head = document.getElementById('modal_header');
  var loadingText = document.createTextNode('(LOADING ...)');
  head.removeChild(head.childNodes[0]);
  head.insertBefore(loadingText, document.getElementsByClassName('closeBtn')[0]);
  document.getElementById('modal_body').innerHTML = loadingText;
  src = './images/loading.png';
  img = document.createElement('img');
  img.src = src;
  try {
    document.getElementById('modal_body').replaceChild(img, document.getElementById('modal_body').img);
  } catch (error) {
    // console.error(error);
    document.getElementById('modal_body').appendChild(img);
  };
};

function placeButton(sectionName) { // placement des boutons de part et d autre du caroussel
  let mydiv = document.getElementById(sectionName);
  let button_previous = mydiv.nextSibling;
  let button_next = mydiv.nextSibling.nextSibling;
  let witdh_button_next = button_next.offsetWidth;
  let height_button_next = button_next.offsetHeight;
  let displayX = document.body.offsetWidth;
  let height_button_previous = button_previous.offsetHeight;
  let positionXButtonNext = displayX - witdh_button_next;
  let positionYButtonNext = 318 / 2 + height_button_next / 2;
  button_next.style.marginLeft = positionXButtonNext;
  let positionXButtonPrevious = 0;
  let positionYButtonPrevious = 318 / 2 + height_button_previous / 2;;
  button_next.style.position = 'absolute';
  button_next.style.marginTop = '-' + positionYButtonNext;
  button_previous.style.marginLeft = positionXButtonPrevious;
  button_previous.style.position = 'absolute';
  button_previous.style.marginTop = '-' + positionYButtonPrevious;
};

function previous(sectionName) { // fonctionnement du bouton previous caroussel en arriere
  let divToImpact = document.getElementById(sectionName);
  let elementToReplace = divToImpact.removeChild(divToImpact.lastChild);
  divToImpact.insertBefore(elementToReplace, divToImpact.firstChild);
};
function next(sectionName) { // fonctionnement du bouton suivant caroussel en avant
  let divToImpact = document.getElementById(sectionName);
  let elementToReplace;
  if (divToImpact.firstChild.textContent.indexOf('\n')>-1) { // j ai un element qui se cale en premier avant les films je ne sais pas pourquoi ...
    divToImpact.firstChild.remove();
    elementToReplace = divToImpact.removeChild(divToImpact.firstChild);
    console.log('element foireux detected');
  } else {
    elementToReplace = divToImpact.removeChild(divToImpact.firstChild);
  };
  divToImpact.appendChild(elementToReplace);
};

function createButtons(sectionName) { // creation des boutons
  // button next 
  button_next = document.createElement("button");
  section = document.getElementById(sectionName);
  section.append(button_next);
  button_next.setAttribute('id', 'button_next_' + sectionName);
  button_next.setAttribute('class', 'button_next');
  button_next.addEventListener('click', function () { next(sectionName); })
  button_next.textContent = ''
  section.parentNode.insertBefore(button_next, section.nextSibling);
  // button previous
  button_previous = document.createElement("button");
  section = document.getElementById(sectionName);
  section.append(button_previous);
  button_previous.setAttribute('id', 'button_previous' + sectionName);
  button_previous.setAttribute('class', 'button_previous');
  button_previous.addEventListener('click', function () { previous(sectionName); })
  button_previous.textContent = ''
  section.parentNode.insertBefore(button_previous, section.nextSibling);
  return { button_next, button_previous };
};

window.onresize = function () { // appelle le placement des boutons au redimensionnement de la page
  for (let i = 0; i < listOfCategories.length; i++) {
    placeButton(listOfCategories[i]);
  };
};

function displayLoader(display) { // affiche ou pas le loader ou le corps du html
  if (display === true) {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
  } else {
    document.querySelector("#loader").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};

// Fonctionnement de la Fenetre Modal
  var modal = document.getElementById('simpleModal');
  var modalBtn = document.getElementById('modalBtn');
  var closeBtn = document.getElementsByClassName('closeBtn')[0];
  modalBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', outsideClick);
  // ouvrir la modal
  function openModal() {
    modal.style.display = 'block';
  };
  // fermer la modal
  function closeModal() {
    modal.style.display = 'none';
  };
  // cliquer en dehors de la modal
  function outsideClick(e) {
    if (e.target == modal) {
      modal.style.display = 'none';
    };
  };