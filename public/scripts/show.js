$(document).ready(function() {
  console.log('Welcome to show page!');
  var url = window.location.pathname;
  var path = url.match(/[^\/]*$/)[0];
  console.log(path);

  $.get('/movies/' + path)
  .then(populateFields);

  function populateFields(movie) {
    $('.movie-title').text(movie.title);
    $('#movie-director').text(movie.director);
    $('#movie-year').text(movie.year);
    $('#movie-rating').text(movie.rating);
    $('#movie-poster').attr('src', movie.url);
  }
});
