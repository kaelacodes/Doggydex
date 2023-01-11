// --UPDATED: Repository using external API--

let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    // function to add pokemon to list via .push()
    function add(item) {
        if (
            typeof item === "object" &&
            "name" in item,
            "detailsUrl" in item
        ) {
            pokemonList.push(item);
        }
        else {
            console.log("pokemon is not correct");
          }
      }
    
    // getAll function to return all of the items in the pokemonList array
    function getAll() {
        return pokemonList;
    }

    // function to show details
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          console.log(pokemon);
        });
      }

    // add pokemon to list in <button> format
    function addListItem(item) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let itemButton = document.createElement("button");
        itemButton.innerText = item.name;
        itemButton.classList.add("pokemon-button");
        listItem.appendChild(itemButton);
        pokemonList.appendChild(listItem);
        //added event listener: returns all pokemon info to console when button is clicked
        itemButton.addEventListener("click", function(event){
            showDetails(item);
        });
    }
  
    // function to load pokemon API List
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    // function to use the detailsUrl to load detailed pokemon data
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }
  
    return {
      add: add,
      getAll: getAll,
      showDetails: showDetails,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
    };
  })();
  
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
    });
  });

  // UPDATED: forEach() loop - DOM manipulation
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
})