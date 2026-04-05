const stories = document.querySelectorAll(".divStory");
const texts = document.querySelectorAll(".seasontext");

stories.forEach((story, index) => {
    story.addEventListener("click", () => {

        const isOpen = texts[index].classList.contains("visible");
        texts.forEach(t => t.classList.remove("visible"));

        if (!isOpen) {
            texts[index].classList.add("visible");
        }

    });
});