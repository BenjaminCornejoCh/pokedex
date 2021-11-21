const pokeContainer = document.querySelector(".poke-container");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const spinner = document.querySelector("#spinner");
const nav = document.querySelector("nav");
const modalTitle = document.querySelector(".modal-title");
const hp = document.getElementById("HP");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const API_POKEMON = "https://pokeapi.co/api/v2/pokemon/";

let offset = 1;
let limit = 11;

const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

const getData = async () => {
  try {
    const response = await fetch(`${API_POKEMON}1/`);
    const datos = await response.json();
    const est = datos.stats;
    for (let i = 0; i < 3; i++) {
      const nstats = est[i];
      console.log(nstats.base_stat);
    }
  } catch (error) {
    console.warn("No hay datos para mostrar: " + error);
  }
};
getData();

const getPokemon = async (id) => {
  try {
    const response = await fetch(`${API_POKEMON}${id}/`);
    const datos = await response.json();
    createPokemon(datos);
    console.log(datos.stats);
    spinner.style.display = "none";
    nav.style.display = "block";
  } catch (error) {
    console.warn("No hay datos para mostrar: " + error);
  }
};

const getPokemons = (offset, limit) => {
  spinner.style.display = "block";
  nav.style.display = "none";
  const loop = () => {
    for (let i = offset; i <= offset + limit; i++) {
      getPokemon(i);
    }
  };
  setTimeout(loop, 600);
};

const dataModal = async (dato, name) => {
  modalTitle.textContent = capitalize(name);
  for (let i = 0; i < 3; i++) {
    const stat = dato[i];

    switch (i) {
      case 0:
        hp.style.width = `${stat.base_stat}%`;
        hp.innerHTML = `${stat.base_stat}%`;
        break;
      case 1:
        hp.style.width = `${stat.base_stat}%`;
        hp.innerHTML = `${stat.base_stat}%`;
        break;
      case 2:
        hp.style.width = `${stat.base_stat}%`;
        hp.innerHTML = `${stat.base_stat}%`;
        break;
    }
  }
};

const createPokemon = (pokemon) => {
  const cardCol = document.createElement("div");
  cardCol.classList.add("col");

  const card = document.createElement("div");
  card.classList.add("card");
  card.style = "border-radius: 20px";

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  const image = document.createElement("img");
  image.classList.add("card-img-top");
  image.src = pokemon.sprites.front_default;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "m-auto");

  const name = document.createElement("h4");
  name.classList.add("card-title");
  name.textContent = capitalize(pokemon.name);

  const number = document.createElement("p");
  number.classList.add("m-auto");
  number.textContent = `N°${pokemon.id.toString().padStart(3, 0)}`;

  cardCol.appendChild(card);
  card.appendChild(imgContainer);
  card.appendChild(cardBody);
  imgContainer.appendChild(image);
  cardBody.appendChild(name);
  cardBody.appendChild(number);
  pokeContainer.appendChild(cardCol);

  // dataModal(pokemon.stats, pokemon.name);
};

const removeChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 12;
    removeChildNodes(pokeContainer);
    getPokemons(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 12;
  removeChildNodes(pokeContainer);
  getPokemons(offset, limit);
});

getPokemons(offset, limit);
