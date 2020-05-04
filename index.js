const displayMovies = (data, type) => {
    const list = document.getElementById(type);
    for (let i = 0; i < data.results.length; i++) {
      console.log(data.results[i].title);
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
      p2.innerHTML = data.results[i].title;
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

  const displayShows = (data, type) => {
    const list = document.getElementById(type);
    for (let i = 0; i < data.results.length; i++) {
      console.log(data.results[i].title);
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
      p2.innerHTML = data.results[i].title;
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
  
  const getDataFromApi = async () => {
    let urls = [
      "https://api.themoviedb.org/3/movie/now_playing?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1",
      "https://api.themoviedb.org/3/movie/upcoming?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1",
      "https://api.themoviedb.org/3/movie/popular?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1",
      "https://api.themoviedb.org/3/tv/top_rated?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1",
      "https://api.themoviedb.org/3/tv/popular?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1",
      "https://api.themoviedb.org/3/tv/airing_today?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1"
    ];
  
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const [now_playing, upcoming, popular, Top_Rated_Shows, Popular_Shows, Airing_Today] = await Promise.all(
      responses.map((response) => response.json())
    );
    console.log(now_playing);
    console.log(upcoming);
    console.log(popular);
    displayMovies(now_playing, "now_playing");
    displayMovies(upcoming, "upcoming");
    displayMovies(popular, "popular");

    console.log(Top_Rated_Shows);
    console.log(Popular_Shows);
    console.log(Airing_Today);
    displayShows(Top_Rated_Shows, "Top_Rated_Shows");
    displayShows(Popular_Shows, "Popular_Shows");
    displayShows(Airing_Today, "Airing_Today");
  };
  
  function buttonClick() {
      const button = document.getElementById("category--tv");
      button.addEventListener("click", getDataFromApi);
  }

  function search() {
      const input = document.getElementById("myinput").value;
      const url_search = "https://api.themoviedb.org/3/search/" + input + "?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1&include_adult=false";

      fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
      console.log(data);
      console.log(data.name);
      console.log(data.main.temp);
      console.log(data.weather[0].icon);
      console.log(data.weather[0].main);
      });
      
  }
  
  window.onload = function () {
    getDataFromApi();
  };