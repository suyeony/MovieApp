const input = document.getElementById("myinput");

const search_movie = (data, type) => {
  const list = document.getElementById(type);

  document.getElementById("movie_result_title").style.display = "block";

  for (let i = 0; i < data.results.length; i++) {
    console.log(data.results[i].original_title);
    console.log(data.results[i].release_date);

    var card = document.createElement("div");
    card.className = "movie_list-card";

    var p1 = document.createElement("img");
    p1.className = "movie_list-image";
    p1.setAttribute(
    "src",
    "https://image.tmdb.org/t/p/w500/" + data.results[i].poster_path
    );
    card.appendChild(p1);

    var p2 = document.createElement("p");
    p2.className = "movie_list-title";
    p2.innerHTML = data.results[i].original_title;
    card.appendChild(p2);

    var p3 = document.createElement("p");
    p3.className = "movie_list-year";
    for (var j = 0; j < 4; j++) {
      p3.innerHTML += data.results[i].release_date[j];
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

      var p1 = document.createElement("img");
      p1.className = "movie_list-image";
      p1.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/" + data.results[i].poster_path
      );
      card.appendChild(p1);

      var p2 = document.createElement("p");
      p2.className = "movie_list-title";
      p2.innerHTML = data.results[i].title;
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
  const input = document.getElementById("myinput");
    let url_search = 
    ["https://api.themoviedb.org/3/search/movie?api_key=86e1929147898523c764072b1412eed4&language=en-US&query=" 
    + input + "&page=1&include_adult=false",
    "https://api.themoviedb.org/3/search/tv?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1&query="
    + input + "&include_adult=false"
    ];

  const responses = await Promise.all(url_search.map((url) => fetch(url)));
  const [movie, tvshow] = await Promise.all(
    responses.map((response) => response.json())
  );
  console.log(movie);
  console.log(tvshow);
  
  search_movie(movie_result, "Movie_Results");
  search_tv(tvshow_result, "TV_Show_Results");
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

