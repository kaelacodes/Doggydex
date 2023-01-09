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
    
    return {
        add: add,
        getAll: getAll
      };
})();

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

// UPDATED: forEach() loop with code cooresponding with IIFE around pokemonList

pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height < 0.5) {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - Wow! That's a tiny pokemon! <br>")
    } else if (pokemon.height > 1.0) {
          document.write(pokemon.name + " (height: " + pokemon.height + "m) - Wow! That's a big pokemon! <br>")
    } else {
          document.write(pokemon.name + " (height: " + pokemon.height + "m) <br>")
    }
})








