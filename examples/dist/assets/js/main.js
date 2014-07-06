/* global document, Fuse */
'use strict';

var search = (function(){

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

  return index.search.bind(index);
})();


(function(search){

  var searchInput = document.querySelector('#js-search-input');
  var searchSuggestions = document.querySelector('#js-search-suggestions');

  var fillSuggestions = function(items){
    searchSuggestions.innerHTML = '';
    items.slice(0,10).forEach(function(item){
      var li = document.createElement('li');
          li.innerHTML = '<a href="#'+item.type+'-'+item.name+'"><code>' + item.type + '</code> ' + item.name + '</a>';
      searchSuggestions.appendChild(li);
    });
  };

  var performSearch = function(term){
    var result = search(term);
    fillSuggestions(result);
  };


  searchInput.addEventListener('keyup', function(){
    performSearch(searchInput.value);
  });
})(search);



