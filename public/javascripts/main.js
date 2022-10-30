var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("slides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  if(slideIndex-1>=0 && slideIndex-1<x.length){
    x[slideIndex-1].style.display = "block";
  }
  setTimeout(carousel, 2000); // Change image every 2 seconds
}

var logout_button = document.getElementsByClassName("logout-button");
logout_button[0].addEventListener('click',function(e){
  console.log("log out button clicked");
  fetch('/logout',{method:'GET'})
  .then(function(response){
    //console.log(response.json());
    if(response.ok){
      alert("Successfully logged out.");
    }
  })
});