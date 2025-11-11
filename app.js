const main = document.querySelector("main");
const voirPlus = document.querySelector(".voirPlus");
const lien = "https://api.rawg.io/api/games?key=b1e47857f0c347f69a38b38626d82d65";
const burgerMenu = document.querySelector(".burgerMenu");
let toutJeux = [];
let debut = 0;
const jeuxParPage = 12;

let pageActuelle = 1;

// async function getCards(debut, fin) {
//     try {
//         const reponse = await fetch(lien);
//         if (!reponse.ok) throw new Error("Erreur lors du fetch");
//         const data = await reponse.json();
//         toutJeux = data.results.slice(0, 64); 
//         const jeux = toutJeux.slice(debut, fin);

//     } catch (error) {
//         console.error(error);
//     }
// }


function displayPage(pageActuelle){
    main.innerHTML = "";
    const debut = (pageActuelle - 1)*jeuxParPage;
    const fin = debut + jeuxParPage;
    const tranche = toutJeux.slice(debut,fin);
    tranche.forEach((jeu)=>{
            const carte = document.createElement("div");

            const imgDiv = document.createElement("div");
            imgDiv.className = `relative h-[250px] w-10/12 bg-cover bg-no-repeat bg-center rounded-lg border-2 border-white mt-[20px]`;
            imgDiv.style.backgroundImage = `url(${jeu.background_image})`;

            const imageFavorite = document.createElement("img");
            imageFavorite.src = "img/Star Filled.png";
            imageFavorite.alt = "favorite";
            imageFavorite.className = "absolute top-[10px] left-[10px] h-[35px] text-yellow-400";
            imgDiv.appendChild(imageFavorite);

            carte.className = `hover:scale-105 transition-transform duration-1000 text-sm carte w-11/12 md:w-[43%] lg:w-[30%] flex flex-col items-center justify-center min-h-[500px] rounded-lg border-white border-2 bg-gradient-to-b from-[#0D1137] to-[#030B5D]`;

            const textDiv = document.createElement("div");
            textDiv.innerHTML = `
                <div class="titre flex justify-center">
                    <div class="flex justify-center items-center">
                        <h1 class="text-xl">${jeu.name}</h1>
                    </div>
                </div>
                <hr>
                <div class="date flex justify-between">
                    <h4 class="text-white opacity-75">date de sortie</h4>
                    <h4>${jeu.released}</h4>
                </div>
                <hr>
                <div class="date flex justify-between">
                    <h4 class="text-white opacity-75">genre</h4>
                    <h4>${jeu.genres.map(genre => genre.name).join(", ")}</h4>
                </div>
                <hr>
                <div class="date flex justify-between">
                    <h4 class="text-white opacity-75 pr-[8px]">platforme</h4>
                    <h4>${jeu.platforms.map(p => p.platform.name).join(", ")}</h4>
                </div>
                <hr>
                <div class="date flex justify-between">
                    <h4 class="text-white opacity-75">note</h4>
                    <h4>${jeu.rating}</h4>
                </div>
            `;
            textDiv.className = `h-1/2 w-11/12  md:text-sm text-white flex flex-col gap-[10px] m-[30px]`;

            carte.appendChild(imgDiv);
            carte.appendChild(textDiv);
            main.appendChild(carte);
        });

}

async function getAllGames() {
    const reponse = await fetch(lien);
    const data = await reponse.json();
    toutJeux = data.results.slice(0, 64);
    displayPage(pageActuelle);
}

getAllGames();


voirPlus.addEventListener("click", () => {
    if (pageActuelle * jeuxParPage < toutJeux.length) {
        pageActuelle++;
        displayPage(pageActuelle);
    }
});

burgerMenu.addEventListener("click", function(){
    burgerMenu.innerHTML = `
        <div class=" fixed top-0 right-0 h-[180px] w-[70%] flex flex-col items-center text-white bg-[#0D1137] justify-evenly z-50 pt-[10px] pb-[10px]">
        <div class="w-full flex items-center justify-center pb-[20px] border-b border-white"><a href="">Explorer les jeux</a></div>
        <div class="w-full flex items-center justify-center pb-[20px] border-b border-white"><a href="">Gérer mes favoris</a></div>
        <div class="w-full flex items-center justify-center pb-[20px]  "><a href="">Filtrer les jeux</a></div>
        </div>
    `
})