const main = document.querySelector("main");
const nav = document.querySelector("nav");
const lien = "https://api.rawg.io/api/games?key=b1e47857f0c347f69a38b38626d82d65";
let jeux = [];


async function getCards()

{
    try{
        const reponse = await fetch(lien);
        if (!reponse.ok) throw new Error("Erreur lors du fetch");
        const data = await reponse.json();
        jeux = data.results.slice(0,64);
        // console.log(cartes.results.slice(0,2));
        // name, released, background_image, rating, genres, platforms 
        jeux.forEach((jeu) => {
            const carte = document.createElement("div");
            // carte.setAttribute("class", "carte");
            const imgDiv = document.createElement("div");
            imgDiv.className = `h-[250px] w-10/12 bg-cover bg-no-repeat bg-center rounded-lg border-2 border-white mt-[20px]`;
            imgDiv.style.backgroundImage = `url(${jeu.background_image})`;
            carte.className = `carte w-11/12 flex flex-col items-center justify-center min-h-[600px] rounded-lg border-white border-2 bg-gradient-to-b from-[#0D1137] to-[#030B5D]`;
            const textDiv = document.createElement("div");
            textDiv.innerHTML = `
            <div class="titre flex justify-between ml-[30px]">
            <div class="flex justify-center items-center">
            <h1 class="text-xl">Sekiro: Shadows Die Twice</h1></div>
            <div><img src="img/Star Filled.png" alt=""></div>
            </div>
            <hr>
            <div class="date flex justify-between">
                <h4 class="text-white opacity-75">date de sortie</h4>
                <h4>${jeu.released}</h4>
            </div>
            <hr>
            <div class="date flex justify-between">
                <h4 class="text-white opacity-75">genre</h4>
                <h4>${jeu.genres.map(genre => genre.name)}</h4>
            </div>
            <hr>
            <div class="date flex justify-between">
                <h4 class="text-white opacity-75">platforme</h4>
                <h4 class=" w-[40%]" >${jeu.platforms.map(p => p.platform.name)}</h4>
            </div>
            <hr>
            <div class="date flex justify-between">
                <h4 class="text-white opacity-75">note</h4>
                <h4>${jeu.rating}</h4>
            </div>
            `;
            textDiv.className = `h-1/2 w-11/12 text-white flex flex-col gap-[20px] m-[30px]`;
            carte.appendChild(imgDiv);
            carte.appendChild(textDiv);
            main.appendChild(carte);
        })
    }
    catch(error){
        console.error(error);
    }

};
getCards();
