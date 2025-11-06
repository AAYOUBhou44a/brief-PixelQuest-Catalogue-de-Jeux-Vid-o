const main = document.querySelector("main");
const lien = "./filteredGames.json";
let jeux = [];
async function getCards()

{
    try{
        const reponse = await fetch(lien);
        if (!reponse.ok) throw new Error("Erreur lors du fetch");
        const data = await reponse.json();
        jeux = data.slice(0,64);
        console.log(jeux);
        // console.log(cartes.results.slice(0,2));
        jeux.forEach((jeu) => {
            const carte = document.createElement("div");
            // carte.setAttribute("class", "carte");
            carte.classList.add("carte");
            carte.style.backgroundImage = `url(${jeu.background_image})`;
            carte.className = `
            carte
            w-90
            h-72
            bg-center
            bg-no-repeat
            bg-cover
            `;
            main.appendChild(carte);
        })
    }
    catch(error){
        console.error(error);
    }

};
getCards();