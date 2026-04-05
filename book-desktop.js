const PAGE_TRANSITION_DURATION = 500;
const Z_INDEX_DELAY = PAGE_TRANSITION_DURATION / 3;

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");
const paper5 = document.querySelector("#p5");
const paper6 = document.querySelector("#p6");
const paper7 = document.querySelector("#p7");

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;
let numOfPapers = 7;
let maxLocation = numOfPapers + 1;

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function flipNext(paper, zIndex) {
    paper.classList.add("flipped");
    setTimeout(() => {
        paper.style.zIndex = zIndex;
    }, Z_INDEX_DELAY);
}

function flipPrev(paper, zIndex) {
    paper.classList.remove("flipped");
    setTimeout(() => {
        paper.style.zIndex = zIndex;
    }, Z_INDEX_DELAY);
}


function goNextPage() {
    if (currentLocation < maxLocation) {
        switch (currentLocation) {
            case 1:
                openBook();
                flipNext(paper1, 1);
                break;
            case 2:
                flipNext(paper2, 2);
                break;
            case 3:
                flipNext(paper3, 3);
                break;
            case 4:
                flipNext(paper4, 4);
                break;
            case 5:
                flipNext(paper5, 5);
                break;
            case 6:
                flipNext(paper6, 6);
                break;
            case 7:
                flipNext(paper7, 7);
                closeBook(false);
                break;
            default:
                throw new Error("unknown state");
        }
        currentLocation++;
    }
}


function goPrevPage() {
    if (currentLocation > 1) {
        switch (currentLocation) {
            case 2:
                closeBook(true);
                flipPrev(paper1, 7);
                break;
            case 3:
                flipPrev(paper2, 6);
                break;
            case 4:
                flipPrev(paper3, 5);
                break;
            case 5:
                flipPrev(paper4, 4);
                break;
            case 6:
                flipPrev(paper5, 3);
                break;
            case 7:
                flipPrev(paper6, 2);
                break;
            case 8:
                openBook();
                flipPrev(paper7, 1);
                break;
            default:
                throw new Error("unknown state");
        }
        currentLocation--;
    }
}


