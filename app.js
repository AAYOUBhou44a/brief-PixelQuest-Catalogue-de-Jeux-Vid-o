const goToFavoris = document.querySelector(".goToFavoris");
const search = document.querySelector(".search");
const footer = document.querySelector("footer");
const goDown = document.querySelector(".goDown");
const filtrageImg = document.querySelector(".filtrageImg");
const triSelect = document.querySelector(".triSelect");
const main = document.querySelector("main");
const voirPlus = document.querySelector(".voirPlus");
const loader = document.getElementById("loader");
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
    console.log(tranche);
    tranche.forEach((jeu)=>{
            const carte = document.createElement("div");

            const imgDiv = document.createElement("div");
            imgDiv.className = `relative h-[250px] w-10/12 bg-cover bg-no-repeat bg-center rounded-lg border-2 border-white mt-[20px]`;
            imgDiv.style.backgroundImage = `url(${jeu.background_image})`;

            const imageFavorite = document.createElement("i");
            imageFavorite.className = "fa-solid fa-star absolute text-[30px] top-[10px] left-[10px] hover:scale-110 cursor-pointer absolute top-[10px] left-[10px] cursor-pointer text-white";
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
            
            // carte.addEventListener("click", () => {
            //     gsap.to(carte, {
            //         duration: 0.3,
            //         scale: 1.1,
            //         rotation: 1000,
            //         yoyo: true,
            //         repeat: 1,
            //         ease: "power1.inOut"
            //     });
            // });

            

            imageFavorite.addEventListener("click", ()=>{
                let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
                const existe = favoris.some(fav => fav.id === jeu.id);
                if(!existe){
                    imageFavorite.classList.toggle("text-white");
                    imageFavorite.classList.add("text-yellow-400");
                    favoris.push(jeu);
                    localStorage.setItem("favoris", JSON.stringify(favoris));
                }
            })
        });

}

async function getAllGames() {
loader.classList.remove("hidden"); 

    const reponse = await fetch(lien);
    const data = await reponse.json();
    toutJeux = data.results.slice(0, 64);
    loader.classList.add("hidden");
    displayPage(pageActuelle);
}

getAllGames();


voirPlus.addEventListener("click", () => {
    if (pageActuelle * jeuxParPage < toutJeux.length) {
        pageActuelle++;
        displayPage(pageActuelle);
    }
    else{
        pageActuelle = 1;
        displayPage(pageActuelle);
    }
});

burgerMenu.addEventListener("click", function(){
    burgerMenu.innerHTML = `
        <div class=" fixed top-0 right-0 h-[180px] w-[70%] flex flex-col items-center text-white bg-[#0D1137] justify-evenly z-50 pt-[10px] pb-[10px]">
        <div class="w-full flex items-center justify-center pb-[20px] border-b border-white"><a href="index.html">Explorer les jeux</a></div>
        <div class="w-full flex items-center justify-center pb-[20px] border-b border-white"><a href="favoris.html">Gérer mes favoris</a></div>
        <div class="pageSuivante w-full flex items-center justify-center pb-[20px]  cursor-pointer">voir la page suivante</div>
        </div>
    `
    const pageSuivante = document.querySelector(".pageSuivante");
    pageSuivante.addEventListener("click",()=>{
        footer.scrollIntoView({behavior:"smooth"});
    })
})

// filtrage par nom 
// filtrageImg.addEventListener("click", ()=> {
//     toutJeux.sort((jeu1, jeu2)=> jeu1.name.localeCompare(jeu2.name));
//     displayPage(pageActuelle);
// })

filtrageImg.addEventListener("click", ()=> {
    triSelect.classList.toggle("hidden");
    filtrageImg.classList.toggle("hidden");
})

triSelect.addEventListener("change", ()=>{
    const valeur = triSelect.value;
    if(valeur === "genre"){
        toutJeux.sort((jeu1, jeu2)=> jeu1.genres[0].name.localeCompare(jeu2.genres[0].name));
    }
    else if(valeur === "platforme"){
        toutJeux.sort((jeu1, jeu2) => jeu1.platforms[0].name.localeCompare(jeu2.platforms[0].name))
    }
    else{
        toutJeux.sort((jeu1, jeu2) => jeu2.rating - jeu1.rating);
    }
    displayPage(pageActuelle);
})
//  genre, plateforme ou note. 

goDown.addEventListener("click", ()=>{
    footer.scrollIntoView({behavior: "smooth"});
})

search.addEventListener("input", ()=>{
    main.innerHTML = "";
    const input = search.value.toLowerCase();
    const jeuxFiltres = toutJeux.filter(jeu => jeu.name.toLowerCase().includes(input));
    jeuxFiltres.forEach((jeu)=>{
            const carte = document.createElement("div");

            const imgDiv = document.createElement("div");
            imgDiv.className = `relative h-[250px] w-10/12 bg-cover bg-no-repeat bg-center rounded-lg border-2 border-white mt-[20px]`;
            imgDiv.style.backgroundImage = `url(${jeu.background_image})`;

            const imageFavorite = document.createElement("i");
            imageFavorite.className = "fa-solid fa-star text-white absolute top-[10px] left-[10px] text-3xl hover:scale-110 cursor-pointer";
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

            imageFavorite.addEventListener("click", ()=>{
                let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
                const existe = favoris.some(fav => fav.id === jeu.id);
                if(!existe){
                    imageFavorite.classList.toggle("text-white");
                    imageFavorite.classList.add("text-yellow-400");
                    favoris.push(jeu);
                    console.log(favoris);
                    localStorage.setItem("favoris", JSON.stringify(favoris));
                }
            })
        });
    })