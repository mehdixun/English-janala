// Load lessons
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLessons(json.data))
}

// Load level word
const loadLevelWord = (id) => {
    manageSpinner(true)
    const url = (`https://openapi.programming-hero.com/api/level/${id}`)
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActiveClass();
        const clkBtn = document.getElementById(`lesson-btn-${id}`)
        clkBtn.classList.add("active");
        displayLevelWord(data.data)
    })
}

// Remove active class
const removeActiveClass = () => {
    const lessonbuttons = document.querySelectorAll(".lesson-btn");
    lessonbuttons.forEach(btn => btn.classList.remove("active"));
}

// Load word detail
const loadWordDetail = async (id) => {
    url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json();
    displayWordDetails(details.data);
    
} 

// Display word details
const displayWordDetails = (word) => {
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `<div class="">
        <h2 class="font-bold text-2xl">${word.word} (<i class="fa-solid fa-microphone"></i> : ${word.pronunciation})</h2>
      </div>
      <div class="">
        <h2 class="font-bold">Meaning</h2>
      <p>${word.meaning}</p>
      </div>
      <div class="">
        <h2 class="font-bold">Example</h2>
      <p>${word.sentence}</p>
      </div>
      <div class="">
        <h2 class="font-bold">synonym</h2>
      <div class="">${createElement(word.synonyms)}</div>
      </div>
    </div>`
    document.getElementById("my_modal_5").showModal()
} 

// Creare element
const createElement = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
}

// Display level word
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML="";

    if(words.length == 0){
        wordContainer.innerHTML=`<div class="text-center col-span-full rounded-xl py-10 space-y-5">
        <img class="mx-auto" src="assets/alert-error.png" alt="">
            <p class="text-xl  text-gray-700 font-medium">There are no vocabulary added in this lesson</p>
            <h2 class="text-5xl font-bold">Please go to next lesson</h2>
          </div>`;
          manageSpinner(false);
        return;

    }
    words.forEach((word) => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "No word found"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-medium text-2xl">"${word.meaning ? word.meaning : "Meaning not found"}" / ${word.pronunciation ? word.pronunciation : "Pronunciation not found"}</div>
            <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-low"></i></button>
          </div>
          </div>
        `;
        wordContainer.append(card);
    })
    manageSpinner(false);
}

// Display lessons
const displayLessons = (lessons) => {

    // Get the container
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML="";

    // Get into every lessons
    for (let lesson of lessons){
    
    // Create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}"
    onclick="loadLevelWord(${lesson.level_no
})" 
    class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no
}
    </button>
    `

    // Append into container
    levelContainer.append(btnDiv);
    }

}

// Spinner
const manageSpinner = (status) => {
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else{
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

// Search
document.getElementById("btn-search").addEventListener("click", ()=>{
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue)
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data => {
        const allWords = data.data;
        console.log(allWords)
        const filterWords = allWords.filter((word)=>word.word.toLowerCase().includes(searchValue));
        displayLevelWord(filterWords);
        
    });
    
})

loadLessons();