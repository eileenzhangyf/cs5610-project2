console.log("client side code running")
//console.log(session.user);
const button = document.getElementsByClassName("carrot-button");

button[0].addEventListener('click', function(e) {
  console.log('button was clicked');
 // const nickname = document.getElementById("nickname").value;
 // console.log(nickname);
  fetch('/buy', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        //console.log(response.json())
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then(function(data){
      let today = new Date();
      var ul = document.getElementById("shopping-list-ul");
      //console.log(ul.getElementsByTagName("li").length);
      //console.log(ul.getElementsByTagName("li")[0].innerText);
      if(ul.getElementsByTagName("li").length===0){
        if(data.length===0){
          alert("Seems like you just finished grocery shopping!");
        }
        const set = new Set();
        for(let i = 0;i<data.length;i++){
          var name = data[i]['buy'];
          var item = data[i]['buy'];
         // var date = data[i]['curr_date'];
         // var old_date = new Date(date);
          //if(name === nickname){
            if(!set.has(item)){
            //if(old_date>today - (1000 * 60 * 60 * 24 * 7)){
              var li = document.createElement("li");
              li.setAttribute('id','shopping-list-li')
              li.appendChild(document.createTextNode(item));
              ul.appendChild(li);
           // }
            }
          set.add(item);
        //}
        }
      }else{
        var children = ul.getElementsByTagName("li");
        if(data.length===0){
          alert("Seems like you just finished grocery shopping!");
          for(let i=0;i<children.length;i++){
            children[i].innerHTML= '';
          }
        }
        //console.log(ul.getElementsByTagName("li").length);
        const set2 = new Set();
        console.log(ul.getElementsByTagName("li")[0].innerText);
        for(let i=0;i<children.length;i++){
          set2.add(children[i].innerText);
        }
        for(let j = 0;j<data.length;j++){
          var item = data[j]['buy'];
         // var date = data[i]['curr_date'];
         // var old_date = new Date(date);
          //if(name === nickname){
            if(!set2.has(item)){
            //if(old_date>today - (1000 * 60 * 60 * 24 * 7)){
              var li = document.createElement("li");
              li.setAttribute('id','shopping-list-li')
              li.appendChild(document.createTextNode(item));
              ul.appendChild(li);
           // }
            }
          set2.add(item);
        //}
        }

      }
    })
    .catch(function(error) {
      console.log(error);
    });
});

const done_button = document.getElementsByClassName('done-button');
done_button[0].addEventListener('click',function(e){
  console.log('done button clicked');
  fetch('/buy',{method:'DELETE'})
  .then(function(response){
    //alert("Good job finishing your grocery shopping!");
    //console.log(response.json());
    if(response.ok){
      alert("Good job finishing your grocery shopping!");
     // console.log(response.json());
    }
  })
});



