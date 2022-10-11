const pokeApiNames = "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0";
const pokemonsInfo = "https://pokeapi.co/api/v2/pokemon/";

const listPoke = document.querySelector(".list-pokemons");
const searchPoke = document.querySelector("#search");
const btnSearch = document.querySelector("#btnSearch");

//BUSCA ARRAY DE NOMES
async function fetchPokemonsName() {
  try {
    const result = await fetch(pokeApiNames);
    const data = await result.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

//BUSCA INFORMAÇÕES DOS POKEMONS
async function fetchPokemonsInfo(pokemon) {
  try {
    const result = await fetch(pokemonsInfo + pokemon);
    const data = await result.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

//ADCIONA POKEMONS NA LISTA
async function addPokemonsNames() {
  try {
    //array de nomes
    const dataNames = await fetchPokemonsName();

    //buscando info de todos os pokemons
    for (let i = 0; i <= 50; i++) {
      //pegando nomes do array
      const names = dataNames["results"][i].name;
      //passando nome para requisição das infos
      let dataInfo = await fetchPokemonsInfo(names);

      //add tudo na lista
      createPokemonsItemList(names, dataInfo);
    }
  } catch (error) {
    console.log(error);
  }
}

// CRIA LISTA
function createPokemonsItemList(name, info) {

  const li = document.createElement("li");
  const namePoke = document.createElement("h1");
  const imagePoke = document.createElement("img");
  const divElement = document.createElement("div");
  const statusPoke = document.createElement("h2");
  const type = document.createElement("h3");
  const hp = document.createElement("span");
  const attack = document.createElement("span");
  const defense = document.createElement("span");
  const specialAttack = document.createElement("span");
  const specialDefense = document.createElement("span");
  const speed = document.createElement("span");

  namePoke.innerText = name;
  imagePoke.setAttribute(
    "src",
    info["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
      "front_default"
    ]
  );
  statusPoke.innerText = "Stats";
  hp.innerText = `Hp: ${info["stats"][0]["base_stat"]}`;
  attack.innerText = `Attack: ${info["stats"][1]["base_stat"]}`;
  defense.innerText = `Defense: ${info["stats"][2]["base_stat"]}`;
  specialAttack.innerText = `Special Attack: ${info["stats"][3]["base_stat"]}`;
  specialDefense.innerText = `Special Defense: ${info["stats"][4]["base_stat"]}`;
  speed.innerText = `Speed: ${info["stats"][5]["base_stat"]}`;

  //verificando se tem mais de um timpo
  if (info["types"].length > 1) {
    type.innerText = `Type: ${info["types"][0]["type"]["name"]} + ${info["types"][1]["type"]["name"]}`;
  } else {
    type.innerText = `Type: ${info["types"][0]["type"]["name"]}`;
  }

  li.appendChild(namePoke);
  li.appendChild(imagePoke);
  li.appendChild(statusPoke);

  divElement.appendChild(type);
  divElement.appendChild(hp);
  divElement.appendChild(attack);
  divElement.appendChild(defense);
  divElement.appendChild(specialAttack);
  divElement.appendChild(specialDefense);
  divElement.appendChild(speed);

  li.appendChild(divElement);
  listPoke.appendChild(li);
}

addPokemonsNames();
