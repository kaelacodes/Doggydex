/*  --Original Repository--

let pokemonRepository = (function () {
    let pokemonList = [
    {name:"Butterfree", type:["bug", "flying"], height: 1.1},
    {name:"Caterpie", type:"Bug", height: 0.3},
    {name: "Jigglypuff", type:["Fairy", "Normal"], height: 0.5}
    ];

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon,
            "type" in pokemon,
            "height" in pokemon
        ) {
            pokemonList.push(pokemon);
        }
        else {
            console.log("pokemon is not correct");
          }
      }
    
    function getAll() {
        return pokemonList;
    }
    
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let itemButton = document.createElement("button");
        itemButton.innerText = pokemon.name;
        itemButton.classList.add("pokemon-button");
        listItem.appendChild(itemButton);
        pokemonList.appendChild(listItem);
        //added event listener: returns all pokemon info to console when button is clicked
        itemButton.addEventListener("click", function(event){
            showDetails(pokemon);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
      };
})();
*/

let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    function add(item) {
        if (
            typeof item === "object" &&
            "name" in item
        ) {
            pokemonList.push(item);
        }
        else {
            console.log("pokemon is not correct");
          }
      }
    
    function getAll() {
        return pokemonList;
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          console.log(pokemon);
        });
      }

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

/* --prints a list pokemon names and their respective heights from pokemonList using for() loop--

for (let i=0; i < pokemonList.length; i++){
    if (pokemonList[i].height < 0.5){
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + "m) - Wow! That's a tiny pokemon! <br>")
        }
    else if (pokemonList[i].height > 1.0){
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + "m) - Wow! That's a big pokemon! <br>")
        }
    else {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + "m) <br>")
        }
    }
*/

/* --changes previously written for() loop into a forEach() function in order to print pokemonList--
pokemonList.forEach(function(pokemon) {
    if (pokemon.height < 0.5) {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - Wow! That's a tiny pokemon! <br>")
    } else if (pokemon.height > 1.0) {
          document.write(pokemon.name + " (height: " + pokemon.height + "m) - Wow! That's a big pokemon! <br>")
    } else {
          document.write(pokemon.name + " (height: " + pokemon.height + "m) <br>")
    }
})
*/

/* forEach() loop with code cooresponding with IIFE around pokemonList

pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height < 0.5) {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - Wow! That's a tiny pokemon! <br>")
    } else if (pokemon.height > 1.0) {
          document.write(pokemon.name + " (height: " + pokemon.height + "m) - Wow! That's a big pokemon! <br>")
    } else {
          document.write(pokemon.name + " (height: " + pokemon.height + "m) <br>")
    }
})
*/

// UPDATED: forEach() loop - DOM manipulation
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
})








