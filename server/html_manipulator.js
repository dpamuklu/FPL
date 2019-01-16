 $(document).ready(function(){

   $("#results").click(function(){
      document.getElementById("displayOutput").innerHTML = "Result is to be displayed here!";
   });

   $("#fixture").click(function(){
      document.getElementById("displayOutput").innerHTML = "Fixture is to be displayed here!";
   });

   $("#standings").click(function(event){
      var list = '<%-JSON.stringify(event) %>';
      console.log(list);
      var contentStandings = getStandings();
      document.getElementById("displayOutput").innerHTML = contentStandings;
   });

 });

window.onload = refresh_page();

function refresh_page() {
  setTimeout(function () {
      location.reload()
  }, 1000000);
};

 function getStandings() {
     var result = "<div class='table-responsive'>";
     // result +=
     result += "Standings is to be displayed here!</div>"
     return result;
 };

 // var contentStandings =
 //  "<div class='table-responsive'>
 //     <caption>
 //        <%= league_name  %>
 //        <small class="text-muted"> Lapa Kadir Sezonu </small>
 //     </caption>
 //     <table class='table table-bordered'>
 //        <thead>
 //           <tr>
 //              <th scope='col'>#</th>
 //              <th scope='col'>Takim</th>
 //              <!-- <th scope='col'>Isim</th> -->
 //              <th scope='col'>Toplam Skor</th>
 //              <th scope='col'>Puan</th>
 //              <th scope='col'>Ödül(TL)</th>
 //              <th scope='col'>Ödül($)</th>
 //           </tr>
 //        </thead>
 //        <tbody>
 //           <% teams.forEach(function(team){ %>
 //           <tr class='table-danger'>
 //           <tr>
 //              <th scope='row'><%= team.rank   %></th>
 //              <td><%= team.entry_name   %></td>
 //              <!-- <td><%= team.player_name  %></td> -->
 //              <td><%= team.points_for   %></td>
 //              <td><%= team.points_total %></td>
 //              <td id='prize_tl'><%= team.prize_tl	  %></td>
 //              <td><%= team.prize_usd    %></td>
 //           </tr>
 //           <% }) %>
 //        </tbody>
 //     </table>
 //  </div> ";
