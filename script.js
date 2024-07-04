const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-button");
const errorRes = document.querySelector(".error-res");

const pokeName = document.querySelector("#pokemon-name");
const pokeId = document.querySelector("#pokemon-id");
const pokeWeight = document.querySelector("#weight");
const pokeHeight = document.querySelector("#height");
const pokePic = document.querySelector("#pic-container");
const pokeType = document.querySelector("#types");

const pokeHp = document.querySelector("#hp");
const pokeAtt = document.querySelector("#attack");
const pokeDef = document.querySelector("#defense");
const pokeSpAtt = document.querySelector("#special-attack");
const pokeSpDef = document.querySelector("#special-defense");
const pokeSpeed = document.querySelector("#speed");

/* Poke fetch */

async function getData(nameOrId) {
    try {
        const pokeUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`;
        const res = await fetch(pokeUrl);
        if (!res.ok) {
            // throw new Error(`Response status: ${res.status}`);
            errorRes.textContent = "Please enter a valid pokemon";
            // alert("Pokémon not found");

            return;
        }
        errorRes.textContent = "";
        const jsonObj = await res.json();

        useData(jsonObj);
    } catch (err) {
        console.error(err.message);
    }
}

async function useData(obj) {
    if (pokePic.hasChildNodes()) {
        while (pokePic.firstChild) {
            pokePic.removeChild(pokePic.firstChild);
        }
    }

    let newImg = document.createElement("img");

    const { height, id, name, weight, sprites, stats, types } = obj;
    const { front_default } = sprites;

    const typeToAdd = await pokeTypeFunc(types);

    if (pokeType.hasChildNodes()) {
        while (pokeType.firstChild) {
            pokeType.removeChild(pokeType.firstChild);
        }
    }

    if (typeToAdd.length > 1) {
        for (let i = 0; i < typeToAdd.length; i++) {
            let newType = document.createElement("p");
            newType.classList = "type";
            newType.classList += ` ${typeToAdd[i]}`;

            newType.textContent = typeToAdd[i];
            pokeType.appendChild(newType);
        }
    } else {
        let newType = document.createElement("p");
        newType.classList = "type";
        newType.classList += ` ${typeToAdd[0]}`;

        newType.textContent = typeToAdd[0];
        pokeType.appendChild(newType);
    }

    let statsArr = [];
    stats.forEach((elem) => {
        const toCheck = Object.entries(elem);
        statsArr.push(toCheck[0][1]);
    });

    pokeHeight.textContent = `Height: ${height}`;
    pokeId.textContent = `#${id}`;
    pokeName.textContent = name.toUpperCase();
    pokeWeight.textContent = `Weight: ${weight}`;

    pokeHp.textContent = statsArr[0];
    pokeAtt.textContent = statsArr[1];
    pokeDef.textContent = statsArr[2];
    pokeSpAtt.textContent = statsArr[3];
    pokeSpDef.textContent = statsArr[4];
    pokeSpeed.textContent = statsArr[5];

    newImg.src = front_default;
    newImg.alt = name;
    newImg.id = "sprite";
    pokePic.appendChild(newImg);
}

/* types */
async function pokeTypeFunc(obj) {
    let typeFound = [];
    obj.forEach((elem) => {
        const toLook = Object.entries(elem);
        typeFound.push(toLook[1][1].name);
    });

    return typeFound;
}

/* search */
searchBtn.addEventListener("click", () => {
    const toSearch = searchInput.value;
    const cleanedSearch = toSearch.split(" ").join("-").toLowerCase();

    getData(cleanedSearch);
});
