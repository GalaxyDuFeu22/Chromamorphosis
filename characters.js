const params = new URLSearchParams(window.location.search);
const characterId = params.get("id");

let currentIndex = 0;
let imagesPerView = window.innerWidth <= 768 ? 1 : 3;

function loadCharacter() {
    const lang = localStorage.getItem("lang") || "fr";

    fetch("characters.json")
        .then(res => res.json())
        .then(data => {
            const char = data[characterId];
            if (!char) return;

            document.title = `${char.name}`;
            document.getElementById("charProfil").src = char.profil;
            document.getElementById("charName").textContent = char.name;
            document.getElementById("charTitle").textContent = char.title[lang];
            document.getElementById("charFullname").textContent = char.fullname;
            document.getElementById("charAge").textContent = char.age[lang];
            document.getElementById("charBirthday").textContent = char.birthday[lang];
            document.getElementById("charGender").textContent = char.gender[lang];
            document.getElementById("charOrientation").textContent = char.orientation[lang];
            document.getElementById("charHeight").textContent = char.height[lang];
            document.getElementById("charWeight").textContent = char.weight[lang];
            document.getElementById("charSituation01").textContent = char.situation01[lang];
            document.getElementById("charSituation02").textContent = char.situation02[lang];
            document.getElementById("charDescription").textContent = char.description[lang];

            document.getElementById("charBackground").style.backgroundColor = char.bgBase;

            const bg = document.getElementById("bg");
            bg.style.setProperty("--dot-color", char.dotColor);
            bg.style.setProperty("--bg-base", char.bgBase);

            document.getElementById("identity").style.backgroundColor = char.thirdcolor;
            document.getElementById("description").style.backgroundColor = char.thirdcolor;
            document.getElementById("gallery").style.backgroundColor = char.thirdcolor;
            document.getElementById("galleryTitle").style.backgroundColor = char.secondcolor;

            document.querySelectorAll(".nav").forEach(btn => {
                btn.style.color = char.secondcolor;
            });

            document.getElementById("charOrigin").textContent = char.origin[lang];
            document.getElementById("origins").style.backgroundColor = char.thirdcolor;
            document.getElementById("powers").style.backgroundColor = char.thirdcolor;

            const powers = document.getElementById("powers");
            const charPowers = document.getElementById("charPowers");

            if (char.powers?.[lang]) {
                powers.style.display = "";
                charPowers.textContent = char.powers[lang];
            } else {
                powers.style.display = "none";
            }

            document.getElementById("charIcon").src = char.icon;

            const track = document.getElementById("galleryTrack");
            track.innerHTML = "";

            const totalImages = char.gallery.length;

            imagesPerView = window.innerWidth <= 767
                ? 1
                : Math.min(totalImages, 3);

            track.style.setProperty("--images-per-view", imagesPerView);

            const prevBtn = document.querySelector(".prev");
            const nextBtn = document.querySelector(".next");

            const shouldHideNav =
                window.innerWidth > 767 &&
                totalImages <= 3;

            prevBtn.style.display = shouldHideNav ? "none" : "block";
            nextBtn.style.display = shouldHideNav ? "none" : "block";

            char.gallery.forEach(src => {
                const img = document.createElement("img");
                img.src = src;
                img.alt = char.name;

                img.addEventListener("click", () => {
                    openLightbox(src);
                });

                track.appendChild(img);
            });

            currentIndex = 0;

            // Évite d'ajouter plusieurs fois les événements
            prevBtn.onclick = () => {
                const maxIndex = getMaxIndex(char.gallery.length);

                currentIndex--;

                if (currentIndex < 0) {
                    currentIndex = maxIndex;
                }

                updateCarousel();
            };

            nextBtn.onclick = () => {
                const maxIndex = getMaxIndex(char.gallery.length);

                currentIndex++;

                if (currentIndex > maxIndex) {
                    currentIndex = 0;
                }

                updateCarousel();
            };

            updateCarousel();
        });
}

loadCharacter();

function updateCarousel() {
    const offset = -(currentIndex * (100 / imagesPerView));
    galleryTrack.style.transform = `translateX(${offset}%)`;

}


function getMaxIndex(totalImages) {
    return totalImages - imagesPerView;
}

window.addEventListener("resize", () => {
    const totalImages = document.querySelectorAll("#galleryTrack img").length;

    imagesPerView = window.innerWidth <= 767
        ? 1
        : Math.min(totalImages, 3);

    document
    .getElementById("galleryTrack")
    .style
    .setProperty("--images-per-view", imagesPerView);

    updateCarousel();
});


const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = "flex";
}

function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";
}

lightbox.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeLightbox();
    }
});



