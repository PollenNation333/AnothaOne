(function(){
  function isMobile(){
    return window.matchMedia && window.matchMedia('(max-width: 840px)').matches;
  }

  function closeAll(){
    document.querySelectorAll('.nav-dropdown.is-open').forEach(function(drop){
      drop.classList.remove('is-open');
      var btn = drop.querySelector('.nav-trigger');
      if(btn){ btn.setAttribute('aria-expanded', 'false'); }
    });
  }

  function bind(){
    document.querySelectorAll('.nav-dropdown').forEach(function(drop){
      var btn = drop.querySelector('.nav-trigger');
      if(!btn) return;

      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function(e){
        if(!isMobile()) return;
        e.preventDefault();
        e.stopPropagation();
        var isOpen = drop.classList.contains('is-open');
        closeAll();
        if(!isOpen){
          drop.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', function(){
      if(!isMobile()) return;
      closeAll();
    });

    window.addEventListener('resize', function(){
      if(!isMobile()){
        closeAll();
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
