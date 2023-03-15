function getNews() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  dd = dd-4;
  fetch(
    "https://api.mediastack.com/v1/news?access_key=9d483ad0841d844e90d53c3d3595ce76&keywords=space&categories=-general,-entertainment,-sports,-business,-health&limit=100&date="+yyyy+"-"+mm+"-"+dd+",2030-12-31&sort=popularity&languages=en"
  )
    .then((a) => a.json())
    .then((response) => {
      console.log(response);
      var b = 0;
      while(b < response.data.length) {
                document.getElementById("output").innerHTML +=
          "<a href = href='" + response.data[b].url + "' target='_blank' class='news-entry'>"
        
          "<div>"
        
          "<h2>response.data[b].title</h2>"
        
          "<img onerror=this.style.display='none'; style='max-width: 100%; margin: 0;' src=" + response.data[b].image + "'>"
        
          "<p1 class = "'news-summary'>"+response.data[b].description+"</p1>"
        
          "<p1 class='news-publication'><br>" + response.data[b].source + ", published: " + String(response.data[b].published_at).substring(0, 10) + "</p1>"
        
          "</div>"
        
          "</a>";
          b++;
      }
    });
}

/* put ' onload="getNews()" ' in body 

insert <div id="output"></div> where you want the news

*/
