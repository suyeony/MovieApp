  const displayTVshows = (data, type) => {
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
      p2.innerHTML = data.results[i].original_name;
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

  const getDataFromApi_2 = async () => {
    let urls = [
      "https://api.themoviedb.org/3/tv/top_rated?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1",
      "https://api.themoviedb.org/3/tv/popular?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1",
      "https://api.themoviedb.org/3/tv/airing_today?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1"
    ];
  
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const [top_rated, popular, airing_today] = await Promise.all(
      responses.map((response) => response.json())
    );
    console.log(top_rated);
    console.log(popular);
    console.log(airing_today);
    displayTVshows(top_rated, "Top_Rated_Shows");
    displayTVshows(popular, "Popular_Shows");
    displayTVshows(airing_today, "Airing_Today");
  };

  
  window.onload = function () {
    getDataFromApi_2();
  };