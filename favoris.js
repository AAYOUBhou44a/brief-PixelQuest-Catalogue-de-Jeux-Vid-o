const filtrageImg = document.querySelector(".filtrageImg");
const accueil = document.querySelector(".accueil");
const burgerMenu = document.querySelector(".burgerMenu");
const main = document.querySelector("main");

let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

if(favoris.length === 0){
    main.innerText = "aucun jeux dans les favoris";
}

favoris.forEach(jeu => {
            const carte = document.createElement("div");

            const imgDiv = document.createElement("div");
            imgDiv.className = `relative h-[250px] w-10/12 bg-cover bg-no-repeat bg-center rounded-lg border-2 border-white mt-[20px]`;
            imgDiv.style.backgroundImage = `url(${jeu.background_image})`;

            const supprimer = document.createElement("i");
            supprimer.dataset.id = `${jeu.id}`;
            supprimer.className = "fa-solid fa-trash absolute top-[10px] left-[10px] h-[35px] text-[30px] text-white hover:text-red-500 hover:scale-110 cursor-pointer absolute top-[10px] left-[10px] h-[35px] cursor-pointer ";
            imgDiv.appendChild(supprimer);
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

            supprimer.addEventListener("click", ()=>{
                let favoris = JSON.parse(localStorage.getItem("favoris"))||[];
                favoris = favoris.filter(fav => fav.id!= supprimer.dataset.id);
                localStorage.setItem("favoris", JSON.stringify(favoris));
                carte.remove();
            })


})

accueil.addEventListener("click", ()=>{
    window.location.href = "index.html";
    
})

// carte.addEventListener("click", () => {
//     gsap.to(carte, {
//         duration: 0.3,
//         scale: 1.1,
//         rotation: 5,
//         yoyo: true,
//         repeat: 1,
//         ease: "power1.inOut"
//     });
// });
