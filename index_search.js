const input = document.getElementById("myinput");

const search_movie = (data, type) => {
  const list = document.getElementById(type);

  document.getElementById("movie_result_title").style.display = "block";

  for (let i = 0; i < data.results.length; i++) {
    console.log(data.results[i].original_title);
    console.log(data.results[i].release_date);

    var card = document.createElement("div");
    card.className = "movie_list-card";

    var vote_container = document.createElement("div");
    vote_container.className = "movie-vote-container";

    var p1 = document.createElement("img");
    p1.className = "movie_list-image";
    if (data.results[i].poster_path == null) {
      p1.setAttribute(
        "src",
        "not-found-image.jpg"
      );
      p1.style.height = 170;
    }
    else {
      p1.setAttribute(
        "src",
        "https://image.tmdb.org/t/p/w500/" + data.results[i].poster_path
      );
    }
    vote_container.appendChild(p1);

    var vote = document.createElement("div");
      vote.className = "movie_list-vote";

      vote.innerHTML = "<span>&#11088;</span> " + data.results[i].vote_average + "/10";
      vote_container.appendChild(vote);
      
      card.appendChild(vote_container);

    var p2 = document.createElement("p");
    p2.className = "movie_list-title";
    if (data.results[i].original_title.length > 20) {
      for (var a = 0; a < 20; a++) {
        p2.innerHTML += data.results[i].original_title[a];
      }
      p2.innerHTML += '...';
    }

    else {
      p2.innerHTML = data.results[i].original_title;
    }

    card.appendChild(p2);

    var p3 = document.createElement("p");
    p3.className = "movie_list-year";
    if (data.results[i].release_date == '') {
      p3.innerHTML = '';
    }
    else {
      for (var j = 0; j < 4; j++) {
        p3.innerHTML += data.results[i].release_date[j];
      }
    }
    card.appendChild(p3);

    list.appendChild(card);

  }
};

const search_tv = (data, type) => {
    const list = document.getElementById(type);

    document.getElementById("tvshow_result_title").style.display = "block";

    for (let i = 0; i < data.results.length; i++) {
      console.log(data.results[i].original_name);
      console.log(data.results[i].first_air_date);
  
      var card = document.createElement("div");
      card.className = "movie_list-card";

      var vote_container = document.createElement("div");
      vote_container.className = "movie-vote-container";

      var p1 = document.createElement("img");
      p1.className = "movie_list-image";
      if (data.results[i].poster_path == null) {
        p1.setAttribute(
          "src",
          "not-found-image.jpg"
        );
      }
      else {
        p1.setAttribute(
          "src",
          "https://image.tmdb.org/t/p/w500/" + data.results[i].poster_path
        );
      }
      vote_container.appendChild(p1);

      var vote = document.createElement("div");
      vote.className = "movie_list-vote";

      vote.innerHTML = "<span>&#11088;</span> " + data.results[i].vote_average + "/10";
      vote_container.appendChild(vote);
      
      card.appendChild(vote_container);

      var p2 = document.createElement("p");
      p2.className = "movie_list-title";
      if (data.results[i].original_name.length > 20) {
        for (var a = 0; a < 20; a++) {
          p2.innerHTML += data.results[i].original_name[a];
        }
        p2.innerHTML += '...';
      }
  
      else {
        p2.innerHTML = data.results[i].original_name;
      }
      card.appendChild(p2);

      var p3 = document.createElement("p");
      p3.className = "movie_list-year";
      for (var j = 0; j < 4; j++) {
        p3.innerHTML += data.results[i].first_air_date[j];
      }

      card.appendChild(p3);

      list.appendChild(card);

    }
};

const getDataFromApi_search = async () => {
  //const input = document.getElementById("myinput").value;
    let url_search = 
    ["https://api.themoviedb.org/3/search/movie?api_key=86e1929147898523c764072b1412eed4&language=en-US&query=" 
    + input.value + "&page=1&include_adult=false",
    "https://api.themoviedb.org/3/search/tv?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1&query="
    + input.value + "&include_adult=false"
    ];

  const responses = await Promise.all(url_search.map((url) => fetch(url)));
  const [movie, tvshow] = await Promise.all(
    responses.map((response) => response.json())
  );
  console.log(input);
  console.log(movie);
  console.log(tvshow);
  
  search_movie(movie, "Movie_Results");
  search_tv(tvshow, "TV_Show_Results");
};

function search_click(event) {
    if (event.keyCode == 13 || event.which == 13){
      getDataFromApi_search();
    }
}

input.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
  getDataFromApi_search();
  }
});

