/* global document, Fuse */
'use strict';

var searchApi = (function(){

  var getItems = function(){
    return Array.prototype.slice.call(document.querySelectorAll('.sassdoc__item')).map(function(item){
      return { name : item.dataset.name, type : item.dataset.type, node : item };
    });
  };

  var options = {
    keys: ['name'],
    threshold : 0.3
  };

  var items = getItems();
  var index = new Fuse(items, options);

  var display = function(prop, item){
    item.node.style.display = prop;
  };

  var displayItem = function(prop, items){
    if ( Array.isArray(items) ){
      items.forEach(display.bind(null, prop));
    } else if (!!items.node) {
      display(prop, items);
    }
  };

  var hide = displayItem.bind(null, 'none');
  var hideAll = hide.bind(null, items);

  var show = displayItem.bind(null, 'block');
  var showAll = show.bind(null, items);


  var search = function(){
    hideAll();
    return index.search.apply(index, arguments);
  };

  return {
    hide : hide,
    hideAll : hideAll,

    show : show,
    showAll : showAll,

    search : search
  };
})();


(function(searchApi){

  var searchInput = document.querySelector('#js-search-input');

  searchInput.addEventListener('keyup', function(){
    if ( searchInput.value.length > 0 ){
      searchApi.show(searchApi.search(searchInput.value));
    } else {
      searchApi.showAll();
    }
  });

})(searchApi);




