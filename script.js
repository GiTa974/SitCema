
function get_entete(apiUrl){
    var pathFilmsSortedByScore = '?sort_by=-imdb_score'
    fetch(apiUrl + pathFilmsSortedByScore).then(response => {
        return response.json();
      }).then(data => {
        current_div = document.getElementById('tete2');
        // current_div.innerHTML = data.results[0].title + '<BR>';
        var div = document.createElement("DIV");
        current_div.appendChild(div);
        div.innerHTML = data.results[0].title + "lolilol";
        src = data.results[0].image_url,
        img = document.createElement('img');
        img.src = src;
        current_div.appendChild(img)
        const id = data.results[0].id + '';
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
            }).catch(err => {
                // Do something for an error here
                console.log('error', err);
            }); 
            var btn = document.createElement("BUTTON");
            btn.innerHTML = "More Info"; 
            // btn.onclick = showAlert()
            btn.addEventListener("click", function () {
                let head = document.getElementById('modal_header');
                head.innerHTML = data.results[0].title;
                let body = document.getElementById('modal_body');
                body.innerHTML = 'lol'
                // alert(data.results[0].title);
                openModal();
              });
            current_div.appendChild(btn);
    }).catch(err => {
        // Do something for an error here
        console.log('error', err);
    }); 
}


function categoryBestRated(apiUrl){
    var rating = '?sort_by=-imdb_score'
    fetch(apiUrl + rating).then(response => {
        return response.json();
      }).then(data => {
        console.log(data.results)
        listOfMovies = data.results
        for (i=0; i<listOfMovies.length;i++){
            current_div = document.getElementById('categorie')
            let node = document.createTextNode (data.results[i].title);
            current_div.appendChild(node);
            console.log(i);
            src = data.results[i].image_url,
            img = document.createElement('img');
            img.src = src;
            current_div.appendChild(img)
        }
    }).catch(err => {
        // Do something for an error here
        console.log('error', err);
    }); 
}

function detail(apiUrl){
    userAction = async () => {
        response = await fetch(apiUrl);
        data = await response.json();
        console.log(data);
        current_div = document.getElementById('tete')
        current_div.innerHTML = data.results[0].title + '<BR>';
        src = data.results[0].image_url,
        img = document.createElement('img');
        img.src = src;
        current_div.appendChild(img)
        const id = data.results[0].id + '/';
        console.log(id);
        return id;
    }
}

    userAction = async (apiUrl) => {
        response = await fetch(apiUrl);
        data = await response.json();
        current_div = document.getElementById('tete')
        current_div.innerHTML = data.results[0].title + '<BR>';
        src = data.results[0].image_url,
        img = document.createElement('img');
        img.src = src;
        current_div.appendChild(img)
        // id = data.results[0].id + '/';
        // console.log(id);
        // return id;
    }

// MODAL TRIGGER
