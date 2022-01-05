
function DisplayOneTopRatedMovie(apiUrl){
    let pathFilmsSortedByScore = '?sort_by=-imdb_score'
    fetch(apiUrl + pathFilmsSortedByScore).then(response => {
        return response.json();
      }).then(data => {
        current_div = document.getElementById('bestMovie');
        // current_div.innerHTML = data.results[0].title + '<BR>';
        let div = document.createElement("DIV");
        div.setAttribute("class", "titleOne");
        current_div.appendChild(div);
        div.innerHTML = data.results[0].title;
        src = data.results[0].image_url,
        img = document.createElement('img');
        let id = data.results[0].id + '';
        console.log(id);
        img.addEventListener("click", function () {
            feed_modal(apiUrl, id)
            // fetch(apiUrl + id).then(response => {
            //     return response.json();
            //   }).then(data => {
            //       console.log(data.long_description)
            //       console.log(data)
            //       description_div = document.getElementById('description');
            //       console.log(description_div);
            //       let head = document.getElementById('modal_header');
            //       head.innerHTML = data.title;
            //       let body = document.getElementById('modal_body');
            //       body.innerHTML = data.description;
            //     }).catch(err => {
            //         // Do something for an error here
            //         console.log('error', err);
            //     }); 
            // openModal();
          });
        img.src = src;
        current_div.appendChild(img)
            let btn = document.createElement("BUTTON");
            btn.innerHTML = "More Info"; 
            // btn.onclick = showAlert()
    }).catch(err => {
        // Do something for an error here
        console.log('error', err);
    }); 
}
function DisplayOneTopRatedMovieOLD(apiUrl){
    let pathFilmsSortedByScore = '?sort_by=-imdb_score'
    fetch(apiUrl + pathFilmsSortedByScore).then(response => {
        return response.json();
      }).then(data => {
        current_div = document.getElementById('bestMovie');
        // current_div.innerHTML = data.results[0].title + '<BR>';
        let div = document.createElement("DIV");
        div.setAttribute("class", "titleOne");
        current_div.appendChild(div);
        div.innerHTML = data.results[0].title;
        src = data.results[0].image_url,
        img = document.createElement('img');
        img.src = src;
        current_div.appendChild(img)
        let id = data.results[0].id + '';
        console.log(id);
        fetch(apiUrl + id).then(response => {
            return response.json();
          }).then(data => {
              console.log(data.long_description)
              console.log(data)
              description_div = document.getElementById('description');
              console.log(description_div);
              let node = document.createTextNode (data.long_description);
              // description_div.innerHTML = '<strong>Description</strong></BR>' + data.long_description + '<BR>';
              description_div.appendChild(node);
              btn.addEventListener("click", function () {
                  let head = document.getElementById('modal_header');
                  head.innerHTML = data.title;
                  let body = document.getElementById('modal_body');
                  body.innerHTML = 'lol';
                  body.innerHTML = data.long_description;
                  // alert(data.results[0].title);
                  openModal();
                });
              current_div.appendChild(btn);
            }).catch(err => {
                // Do something for an error here
                console.log('error', err);
            }); 
            let btn = document.createElement("BUTTON");
            btn.innerHTML = "More Info"; 
            // btn.onclick = showAlert()
    }).catch(err => {
        // Do something for an error here
        console.log('error', err);
    }); 
}


function DisplayCategory(apiUrl, filter, div){
    // let filter = '?sort_by=-imdb_score'
    fetch(apiUrl + filter).then(response => {
        return response.json();
      }).then(data => {
        console.log(data.results)
        listOfMovies = data.results
        for (let i=0; i<listOfMovies.length;i++){
            current_div = document.getElementById(div)
            let contenaire = document.createElement("contenair");
            contenaire.setAttribute('class', 'contenair')
            current_div.appendChild(contenaire);

            // title
            let div_title = document.createElement("DIV");
            div_title.setAttribute("class", "titleSmall");
            contenaire.appendChild(div_title);
            div_title.innerHTML = data.results[i].title;

            // image
            let div_img = document.createElement("DIV");
            contenaire.appendChild(div_img)
            let id = data.results[i].id + '';
            console.log(id);
            contenaire.addEventListener("click", function () {
                feed_modal(apiUrl, id);
                /*fetch(apiUrl + id).then(response => {
                    return response.json();
                  }).then(data => {
                      console.log(data.long_description)
                      console.log(data)
                      description_div = document.getElementById('description');
                      console.log(description_div);
                      let head = document.getElementById('modal_header');
                      src = data.image_url;
                      img = document.createElement('img');
                      img.src = src;
                      head.appendChild(img);
                    //   head.innerHTML = data.title;
                      let body = document.getElementById('modal_body');
                      body.innerHTML = data.description;
                    }).catch(err => {
                        // Do something for an error here
                        console.log('error', err);
                    }); 
                openModal();*/
              });
            src = data.results[i].image_url;
            img = document.createElement('img');
            img.src = src;
            div_img.appendChild(img);
        }
    }).catch(err => {
        // Do something for an error here
        console.log('error', err);
    }); 
}

function feed_modal(apiUrl, id) {
    fetch(apiUrl + id).then(response => {
        return response.json();
      }).then(data => {
          console.log(data.long_description)
          console.log(data)
          description_div = document.getElementById('description');
          console.log(description_div);
          let head = document.getElementById('modal_header');
          //   head.replaceChild(img, head.lastChild);
          head.innerHTML = data.title;
          // informations
          let body = document.getElementById('modal_body');
          let sep = '<BR>';
          let genre = 'genre(s) : ' + data.genres + sep;
          let date = 'date de sortie : ' + data.year + sep;
          let rated = 'rated : ' + data.rated + sep;
          let score = 'imdb_score : ' + data.imdb_score + sep;
          let directors = 'realisateur(s) : ' + data.directors + sep;
          let actors = 'acteur(s) : ' + data.actors + sep;
          let duration = 'duree : ' + data.duration + sep;
          let countries = 'pays : ' + data.country + sep;
          let boxOffice = 'box office : ' + data.usa_gross_income + ' USD' + sep;
          let resume = 'Resume : ' + data.long_description + sep;
          infos = document.createElement('DIV');
          infos.setAttribute("class", "infosModal");
          body.innerHTML = ''; // erase default text in modal
          body.appendChild(infos);
          infos.innerHTML = genre+date+rated+score+directors+actors+duration+countries+
          boxOffice+resume;
          // image
          src = data.image_url;
          img = document.createElement('img');
          img.src = src;
          try {
            infos.replaceChild(img, body.img);
          } catch (error) {
            console.error(error);
            infos.appendChild(img);
          }
        //   body.innerHTML = data.description;
        }).catch(err => {
            // Do something for an error here
            console.log('error', err);
        }); 
    openModal();
  };