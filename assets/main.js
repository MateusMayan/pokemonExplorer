const tela = document.getElementById("tela");
const buscar = document.getElementById("buscarButton");
const valorPokemon = document.getElementById("buscaPokemon_inputTxt");
let contador = 0;

const searchPokemon = () => {
    if (valorPokemon.value.length < 1) {
        valorPokemon.value = contador;
    }

    let url = `https://pokeapi.co/api/v2/pokemon/${valorPokemon.value.toLowerCase()}`;
    fetch(url)
        .then((resposta) => resposta.json())
        .then((dados) => {
            contador = dados.id;
            tela.style.gridTemplateColumns = 'repeat(1, 1fr)'
            tela.innerHTML = `
    <div class="info_Basic"><h1>${dados.name}</h1>
    <p>#${dados.id}</p></div>
    <div class="images_Pokemon">
    <img class='pokemon_image' src='
    https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${dados.id}.gif' alt="${dados.name} de costas">       
    <img class='pokemon_image' src='
    https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated//${dados.id}.gif' alt="${dados.name} de frente">       
    </div>`;
            // Aqui faremos a conversão de tipos e usaremos o tipo principal como classe para customizar o fundo

            const types = dados.types.map((typeSlot) => typeSlot.type.name);
            const [type] = types;
            tela.setAttribute("class", `${type}`);
            tela.innerHTML += `<div class="types">
    ${types
        .map(
            (type) => `<input
        type="button"
        value="${type}"
        class="${type}"
        onclick="buscarTipo(${type})"
        />`
        )
        .join(" ")}
    </div>
    <ol class="abilities">
    <strong>Habilidades: </strong>
    ${dados.abilities
        .map(
            (ability) => `
    <li class='ability'>${ability.ability.name}</li>`
        )
        .join("")}
    </ol>
    `;
            valorPokemon.value = "";
        })
        .catch((error) => (tela.innerHTML = "<h1>Pokemon Não Encontrado</h1>"));
};

function pokemon_Previous() {
    if (contador <= 0) {
        tela.innerHTML = "<h1>Pokemon Não Encontrado</h1>";
        tela.style.backgroundColor = "#333";
    }
    contador--;
    searchPokemon();
    valorPokemon.value = "";
}

function pokemon_Next() {
    contador++;
    searchPokemon();
    valorPokemon.value = "";
}

function searchByType(tipoId) {
    const apiUrl = `https://pokeapi.co/api/v2/type/${tipoId}/`;
  
    // Faz uma requisição para a API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        tela.innerHTML = ''
        tela.style.gridTemplateColumns = 'repeat(2, 1fr)'
        tela.setAttribute('class', `${tipoId}`)
        // Obtém os Pokémon do resultado da API
        const pokemons = data.pokemon;

        pokemons.forEach(pokemon => {
          const pokemonId = pokemon.pokemon.url.split('/')[6]; // Obtém o ID do Pokémon a partir do URL
          const pokemonName = pokemon.pokemon.name;

          tela.innerHTML += `
            <div class='pokemon'>
              <img class="pokemon_imageClick" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" onclick="searchPokemonClickinName('${pokemonName}')" alt="${pokemonName}">
              <p class="pokemonByTypes" onclick="searchPokemonClickinName('${pokemonName}')">${pokemonName}</p>
            </div>
          `;
        });
                 
      })
      .catch(error => {
        console.error('Erro ao obter dados da API:', error);
      });
  }
  

  function searchPokemonClickinName(nome) {
    let url = `https://pokeapi.co/api/v2/pokemon/${nome}`;
    fetch(url)
        .then((resposta) => resposta.json())
        .then((dados) => {
            contador = dados.id;
            tela.style.gridTemplateColumns = 'repeat(1, 1fr)'
            tela.innerHTML = `
    <div class="info_Basic"><h1>${dados.name}</h1>
    <p>#${dados.id}</p></div>
    <div class="images_Pokemon">
    <img class='pokemon_image' src='
    https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${dados.id}.gif' alt="${dados.name} de costas">       
    <img class='pokemon_image' src='
    https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated//${dados.id}.gif' alt="${dados.name} de frente">       
    </div>`;
            // Aqui faremos a conversão de tipos e usaremos o tipo principal como classe para customizar o fundo

            const types = dados.types.map((typeSlot) => typeSlot.type.name);
            const [type] = types;
            tela.setAttribute("class", `${type}`);
            tela.innerHTML += `<div class="types">
    ${types
        .map(
            (type) => `<input
        type="button"
        value="${type}"
        class="${type}"
        onclick="searchByType('${type}')"
        />`
        )
        .join(" ")}
    </div>
    <ol class="abilities">
    <strong>Habilidades: </strong>
    ${dados.abilities
        .map(
            (ability) => `
    <li class='ability'>${ability.ability.name}</li>`
        )
        .join("")}
    </ol>
    `;
            valorPokemon.value = "";
        })
        .catch((error) => (tela.innerHTML = "<h1>Pokemon Não Encontrado</h1>"));
};