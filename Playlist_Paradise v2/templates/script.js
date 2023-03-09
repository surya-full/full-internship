// script.js

function searchSpotify() {
    try {
      var searchQuery = document.getElementById("search").value;
      var xhr = new XMLHttpRequest();
      var url = "https://spotify81.p.rapidapi.com/search";

      xhr.open("GET", url, true);
      xhr.setRequestHeader("X-RapidAPI-Key","X-RapidAPI-Host");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var tracks = data.tracks.items;
            var trackList = document.getElementById("trackList");
            trackList.innerHTML = "";
            for (var i = 0; i < tracks.length; i++) {
              var track = tracks[i];
              var listItem = document.createElement("li");
              listItem.textContent = track.name;
              trackList.appendChild(listItem);
            }
          } else {
            console.log("Error:", xhr.status);
          }
        }
      };
      xhr.send(`query=${query}`);
    } catch (error) {
      console.log("Error:", error.message);
    }
  }