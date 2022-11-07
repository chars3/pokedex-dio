const pokemonList = document.getElementById("pokemonList");
const pokemonInfoContainer = document.getElementById("pokemonInfoContainer");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtmlPokemonList = pokemons
      .map(
        (pokemon) => `
        <div class="pokemonsListContent">
            <div class="pokemonCard">
                <li class="pokemon ${pokemon.type}" id="${pokemon.number}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>      
                    <span class="name">${pokemon.hp}</span>      
                    
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types
                              .map(
                                (type) =>
                                  `<li class="type ${type}">${type}</li>`
                              )
                              .join("")}
                        </ol>
                        <img src="${pokemon.photo}" 
                            alt="${pokemon.name}">
                    </div>
                    <button class="btnDetails" id="${pokemon.number}">
                        detalhes
                    </button>
                </li>
            </div>
            
            <div class="modal hide">
            
                <div class="modal-container">
                    <div id="pokemonInfoContainer">
                        <li class="info" id="${pokemon.number}">   
                        <div class="info-header ${pokemon.type}">
                            <button class="btn-remove ${
                              pokemon.type
                            }">x</button>
                                <div class="info-title">
                                    <h2>${pokemon.name}</h2>
                                    <p class="number">${pokemon.number}</p>
                                </div>
                                <div class="info-img">
                                    <img src="${pokemon.photo}" alt="${
          pokemon.name
        }">
                                </div>
                            </div>

                            <div class="about-content">
                                <div class="info-type">
                                    <p>${pokemon.type}</p>
                                </div>

                                <div class="info-subtitle">
                                    <h4 class="${pokemon.type}">About</h4>
                                </div>

                                <div class="about-details">
                                    <div class="about-header">
                                        <div>
                                            <h4>Weight</h4>                               
                                            <p>${pokemon.weight}</p>       
                                        </div>                           
                                        <div>                                
                                            <h4>Height</h4>                               
                                            <p>${pokemon.height}kg</p>
                                        </div>
                                        
                                        <div class="moves">
                                            <h4>Moves</h4>
                                            ${pokemon.abilities
                                              .map(
                                                (ability) => `<p>${ability}</p>`
                                              )
                                              .join("")}
                                        </div>
                                            
                                    </div>
                                        
                                </div>

                                <div class="stats-content">
                                    <div class="info-subtitle">
                                        <h4 class="${
                                          pokemon.type
                                        }">Base Stats</h4>
                                    </div>
                                    <div class="stats">
                                        <div class="stat">
                                            <span class="stat-name">HP</span>
                                            <span class="base-stat">${
                                              pokemon.hp
                                            }</span>
                                            <div class="progres-bar">
                                                <div class="hp bar ${
                                                  pokemon.type
                                                }" style="width: ${
          pokemon.hp
        }%"></div>
                                            </div>
                                        </div>

                                        <div class="stat">
                                            <span class="stat-name">ATK</span>
                                            <span class="base-stat">
                                                ${pokemon.attack}
                                            </span>
                                            <div class="progres-bar">
                                                <div 
                                                    class="atk bar ${
                                                      pokemon.type
                                                    }"
                                                    style="width: ${
                                                      pokemon.attack
                                                    }%">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="stat">
                                            <span class="stat-name">DEF</span>
                                            <span class="base-stat">${
                                              pokemon.defense
                                            }</span>
                                            <div class="progres-bar">
                                                <div class="def bar ${
                                                  pokemon.type
                                                }" style="width: ${
          pokemon.defense
        }%"></div>
                                            </div>
                                        </div>

                                        <div class="stat">
                                            <span class="stat-name">SATK</span>
                                            <span class="base-stat">${
                                              pokemon.specialAttack
                                            }</span>
                                            <div class="progres-bar">
                                                <div class="satk bar ${
                                                  pokemon.type
                                                }" style="width: ${
          pokemon.specialAttack
        }%"></div>
                                            </div>
                                        </div>

                                        <div class="stat">
                                            <span class="stat-name">SDEF</span>
                                            <span class="base-stat">${
                                              pokemon.specialDefense
                                            }</span>
                                            <div class="progres-bar">
                                                <div class="sdef bar ${
                                                  pokemon.type
                                                }" style="width: ${
          pokemon.specialDefense
        }%"></div>
                                            </div>
                                        </div>

                                        <div class="stat">
                                            <span class="stat-name">SPD</span>
                                            <span class="base-stat">${
                                              pokemon.speed
                                            }</span>
                                            <div class="progres-bar">
                                                <div class="spd bar ${
                                                  pokemon.type
                                                }" style="width: ${
          pokemon.speed
        }%"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>  
                        </li>
                    </div>
                </div>
            </div>
        </div>
        `
      )
      .join("");

    pokemonList.innerHTML += newHtmlPokemonList;

    const btnDetails = document.querySelectorAll(".btnDetails");

    const btnRemove = document.querySelectorAll(".btn-remove");

    const info = document.querySelectorAll(".info");

    for (i = 0; i < info.length; i++) {
      btnDetails[i].addEventListener("click", (e) => {
        const el = e.target;
        //acessa elemntos no DOM até chegar no modal e define um atributo para exibir modal
        el.parentNode.parentNode.parentNode.lastElementChild.setAttribute(
          "class",
          "show"
        );
      });
      btnRemove[i].addEventListener("click", (e) => {
        const el = e.target;
        //acessa elemntos no DOM até chegar no modal e define um atributo para esconder modal
        el.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute(
          "class",
          "hide"
        );
      });
    }
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
