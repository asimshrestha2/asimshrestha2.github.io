window.onload = function(){
  var titles = document.getElementsByClassName('sec-title');
  var titlesBottomVal = [0,0,0,0];
  for(var i = 0; i < titles.length; i++){
    titlesBottomVal[i] = titles[i].getBoundingClientRect().bottom;
  }

  document.addEventListener('resize', function() {
    for(var i = 0; i < titles.length; i++){
      titlesBottomVal[i] = titles[i].getBoundingClientRect().bottom;
    }
  })

  document.addEventListener('scroll', function(){
    console.log(window.scrollY);
    console.log(titlesBottomVal);
    if(window.scrollY >= titlesBottomVal[0] && window.scrollY < titlesBottomVal[1] ){
      titles[0].classList.add('fixed');
    } else {
      titles[0].classList.remove('fixed');
    }

    if(window.scrollY >= titlesBottomVal[1] && window.scrollY < titlesBottomVal[2] ){
      titles[1].classList.add('fixed');
    } else {
      titles[1].classList.remove('fixed');
    }

    if(window.scrollY >= titlesBottomVal[2] && window.scrollY < titlesBottomVal[3]){
      titles[2].classList.add('fixed');
    } else {
      titles[2].classList.remove('fixed');
    }

    if(window.scrollY >= titlesBottomVal[3]){
      titles[3].classList.add('fixed');
    } else {
      titles[3].classList.remove('fixed');
    }
  });
}
