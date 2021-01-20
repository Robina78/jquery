
 const movies = []
        
 $(function() {
      
  // Event: Add a Movie
  $('#movie-form').on('submit', (e) => {
      e.preventDefault();
            
      let title = $('#title').val();
      let rate = $('#rate').val(); 
      const movieData = {title, rate};
      if(title.length > 1){
        const HtmlToAppend = addMovieToList(movieData);      
     
      movies.push(movieData);

      $('#movie-list').append(HtmlToAppend);
      $('#movie-form').trigger("reset");  
     
      } else {
        alert('Title should has at least two charachters');
      }
      
  }); 

  // sorting with arrow
    $('.fas').on('click', function(e) {
      //console.log(e.target);
      let sorting = $(e.target).hasClass('fa-sort-down') ? 'down' : 'up';
      let keyToSortBy = $(e.target).attr("id");
      console.log(keyToSortBy);
      const sortedMovies = sortBy(movies,keyToSortBy,sorting);
      
      $('#movie-list').empty();


    // loop over the sortedMovies and append a new row

     for (let movie of sortedMovies) {
         const HtmlToAppend = addMovieToList(movie);
         $('#movie-list').append(HtmlToAppend);
     }


    // toggel the arrow
     $(e.target).toggleClass('fa-sort-down');
     $(e.target).toggleClass('fa-sort-up')
})

    //Event: Remove a movie
    $("tbody").on("click", ".btn.btn-danger", function(evt) {
   
        
    if((evt.target).classList.contains('delete')) {    
     $(evt.target).closest('tr').remove();
     }
    });


 }); 

   function addMovieToList(movieData) {
        return `
          <tr>
            <td>${movieData.title}</td>
            <td>${movieData.rate}</td>
            <td><a href="#" class="btn btn-danger delete">Delete</a></td>               
         </tr>          
        ` ;           
   };

   
   /* accepts an array of objects and a key and sorts by rate */

function sortBy(array, keyToSortBy, sorting) {
    return array.sort(function(a, b) {
      
      if (keyToSortBy === "rate") {        
        a[keyToSortBy] = +a[keyToSortBy];//convert string to number
        b[keyToSortBy] = +b[keyToSortBy];//convert string to number
      }
      if (a[keyToSortBy] > b[keyToSortBy]) {
        return sorting === "up" ? 1 : -1;
      } else if (b[keyToSortBy] > a[keyToSortBy]) {
        return sorting === "up" ? -1 : 1;
      }
      return 0;
    });
  }
  

  




