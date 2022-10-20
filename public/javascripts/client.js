console.log("client side code running")
const button = document.getElementsByClassName("carrot-button");
button[0].addEventListener('click', function(e) {
  console.log('button was clicked');
  fetch('/buy', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        //console.log(response.json());
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then(function(data){
      //console.log(data[0]);
      var ul = document.getElementById("shopping-list-ul");
      for(let i = 0;i<data.length;i++){
        var item = data[i]['name'];
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(item));
        ul.appendChild(li);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});



