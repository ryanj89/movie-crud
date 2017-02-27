$(document).ready(function() {
  var url = window.location.pathname.split('/');
  var path = url[url.length - 1];
  // console.log(path);
  $.get('/movies/' + path)
  .then(populateFields);

  function populateFields(movieData) {
    $('#movie-title').val(movieData.title);
    $('#movie-director').val(movieData.director);
    $('#movie-year').val(movieData.year);
    $('#movie-rating').val(movieData.rating);
    $('#movie-poster').val(movieData.url);
  }

  $('#edit-movie').click(function() {
    var updatedMovie = {};
    // Get user input values
    var $title = $('#movie-title').val();
    var $director = $('#movie-director').val();
    var $year = $('#movie-year').val();
    var $rating = $('#movie-rating').val();
    var $url = $('#movie-poster').val();

    // Create data object to be added to db
    updatedMovie.title = $title;
    updatedMovie.director = $director;
    updatedMovie.year = $year;
    updatedMovie.rating = $rating;
    updatedMovie.url = $url;

    $.ajax({
      url: '/movies/' + path,
      type: 'PUT',
      data: updatedMovie,
      success: function() {
        alert('Movie Updated!');
      }
    })
    .then(function(res) {
      window.location.href = '/index.html';
    });
  });
});
