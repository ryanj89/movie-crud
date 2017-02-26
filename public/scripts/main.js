$(document).ready(function() {
  var movies = [];
  var $movieList = $('.movie-list');

  $.get('/movies')
  .then(getMovieData)
  .then(createMovieList)
  .catch(getMovieDataRejected);

  function getMovieData(data) {
    data.forEach(movie => {
      movies.push(movie);
    });
    return movies;
  }

  function getMovieDataRejected() {
    console.log(err);
  }

  function createMovieList(movies) {
    movies.forEach(function(movie) {
      console.log(movie);
      // Create elements for movie data
      var $currentMovie = $('<tr>').addClass('movie-list-item');
      var $title = $('<td>').text(movie.title);
      var $director = $('<td>').text(movie.director);
      var $year = $('<td>').text(movie.year);
      var $rating = $('<td>').text(movie.rating);

      // Buttons
      var $deleteBtn = $('<button>').addClass('btn btn-danger').text('Delete Movie');
      var $delTd = $('<td>').append($deleteBtn);
      var $editBtn = $('<button>').addClass('btn btn-info').text('Edit');
      var $editTd = $('<td>').append($editBtn);

      // Add data to table
      $currentMovie.append($title, $director, $year, $rating, $delTd, $editTd);
      $movieList.append($currentMovie);
    });
  }

  // Event Handlers
  $('#add-movie').click(function(event) {
    // event.preventDefault();
    var movieData = {};
    // Get user input values
    var $title = $('#movie-title').val();
    var $director = $('#movie-director').val();
    var $year = $('#movie-year').val();
    var $rating = $('#movie-rating').val();
    var $url = $('#movie-poster').val();

    // Create data object to be added to db
    movieData.title = $title;
    movieData.director = $director;
    movieData.year = $year;
    movieData.rating = $rating;
    movieData.url = $url;

    // POST data to db
    // var data = JSON.stringify(movieData);
    // console.log(data);
    $.post('/movies', movieData)
    .then(alert('SUCCESS!'));
  });

});
