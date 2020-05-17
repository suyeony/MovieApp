const displayMovies = (data, type) => {
    const list = document.getElementById(type);
    for (let i = 0; i < data.results.length; i++) {
      //console.log(data.results[i].title);
      //console.log(data.results[i].release_date);
  
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
    ];
  
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const [now_playing, upcoming, popular] = await Promise.all(
      responses.map((response) => response.json())
    );
    console.log(now_playing);
    console.log(upcoming);
    console.log(popular);
    displayMovies(now_playing, "now_playing");
    displayMovies(upcoming, "upcoming");
    displayMovies(popular, "popular");
  };

  
  window.onload = function () {
    getDataFromApi();
  };