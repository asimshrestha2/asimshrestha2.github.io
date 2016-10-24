window.onload = function(){
  var titles = document.getElementsByClassName('sec-title');
  var titlesBottomVal = [0,0,0,0];
  for(var i = 0; i < titles.length; i++){
    titlesBottomVal[i] = titles[i].getBoundingClientRect().bottom;
  }

  document.addEventListener('scroll', function(){

  });
}
