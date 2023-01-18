//attempt at writting loading message for task 1.7 bonus task -- doesn't work

/* function showLoadingMessage(){
    let messageBox = document.querySelector(".message");
    let loadingMessage = document.createElement("p");
    loadingMessage.innertext = "Loading Pokemon...please wait...";
    loadingMessage.classList.add("loading-message");
    messageBox.appendChild(loadingMessage);
    showLoadingMessage;
};
showLoadingMessage();
*/

// pokemonRepository uses external API and isvwrapped in IIFE to eliminate code from global use

let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
// function to add pokemon to list via .push() with conditions 
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
    
// add pokemon to list in <button> format
    function addListItem(item) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        listItem.classList.add("group-list-item")
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
          // item details
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.weight = details.weight
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }
      
// getAll function to return all of the items in the pokemonList array
    function getAll() {
        return pokemonList;
    }

// function to show details
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          showModal(pokemon);
        });
      }

//MODAL

function showModal(pokemon){
  let modalContainer = document.querySelector("#modal-container");
  modalContainer.classList.add("is-visable");

  //clear existing modal content
  modalContainer.innerHTML = "";

  let modal = document.createElement("div");
  modal.classList.add("modal");

  // modal content
  let closeButton = document.createElement("button");
  closeButton.classList.add("modal-close");
  closeButton.innerText = "Close"
  closeButton.addEventListener("click", hideModal);

  let titleElement = document.createElement("h1");
  titleElement.classList.add("modal-title");
  titleElement.innerText = `${displayName(pokemon.name)}`;

  let modalImageBlock = document.createElement("div");
  modalImageBlock.classList.add("modal-image-block");

  let imgElement = document.createElement("img");
  imgElement.classList.add("modal-image");
  imgElement.src =  pokemon.imageUrl;

  let modalDetailsBlock = document.createElement("div");
  modalDetailsBlock.classList.add("modal-details-block");

  let typeElement = document.createElement("p");
  typeElement.textContent = `Type: ${displayType(pokemon.type)}`;

  let heightElement = document.createElement("p");
  heightElement.textContent = `Height: ${displayHeight(pokemon.height)}`;

  let weightElement = document.createElement("p");
  weightElement.textContent = `Weight: ${displayWeight(pokemon.weight)}`;

  //append all modal content to document
  modal.appendChild(closeButton);
  modal.appendChild(titleElement);
  modal.appendChild(modalImageBlock);
  modal.appendChild(modalDetailsBlock);

  modalImageBlock.appendChild(imgElement);

  modalDetailsBlock.appendChild(typeElement);
  modalDetailsBlock.appendChild(heightElement);
  modalDetailsBlock.appendChild(weightElement);

  modalContainer.appendChild(modal);

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
}

// ***functions for pokemon details displayStrings***

function displayName (value) {
  let name = value;
  return `${name}`
}

function displayType(value) {
  let type = value;
  return `${type}`
}

//pokedex API is based in metric and multiplied by 10
function displayHeight(value) {
  let meterHeight = value/10;
  return `${meterHeight}m`;
}

//pokedex API is based in metric and multiplied by 10 
function displayWeight(value) {
  let kgWeight = value/10;
  return `${kgWeight}kg`;
}

// *** hide modal ***
function hideModal() {
  let modalContainer = document.querySelector("#modal-container")
  modalContainer.classList.remove("is-visable");
}

window.addEventListener("keydown", (e) => {
  let modalContainer = document.querySelector("#modal-container");
  if (
    e.key === "Escape" &&
    modalContainer.classList.contains("is-visable")
  ) {
    hideModal();
  }
});

// returned data from defined functions
    return {
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      getAll: getAll,
      showDetails: showDetails
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
