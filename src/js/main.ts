document.addEventListener("DOMContentLoaded", function(){
  if(window.location.hash)
    openPage(window.location.hash)();

  var pageLinks = document.querySelectorAll("a.page");
  // console.log(pageLinks);

  function openPage(link: string){
    return function(){
      // console.log(link)
      var current = document.querySelector(".content.current");
      if(current.getAttribute('id') !== link ){
        document.querySelector(".content.current").classList.remove('current');
        document.querySelector(link).classList.add('current');
      }
    }
  }
  var element;
  for (var i = 0; i < pageLinks.length; i++) {
    element = pageLinks[i];
    element.addEventListener('click', openPage(element.getAttribute('href')), false);
    // element.onclick = openPage(element.getAttribute('href'));
  }
})