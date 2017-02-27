$('#add-movie').click(function() {
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
  $.post('/movies', movieData)
  .then(function() {
    alert('Movie Added!');
  })
  .then(function() {
    window.location.href = '/index.html';
  })
  .catch(err => {
    console.log(err);
  });
});
