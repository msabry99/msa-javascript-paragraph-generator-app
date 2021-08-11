// Main Variables
let apiUrl = 'https://baconipsum.com/api/?type=meat-and-filler&paras=100&format=json';
let generatedParagraph = document.querySelector(".paragraph-wrapper");
let numberInput = document.querySelector('.number');
let btn = document.querySelector('.btn');
let pageContent = document.querySelector('.page-content');
let pageLoader = document.querySelector('.page-loader');
let noteMessage = document.querySelector(".note-message");

// Functions For Loading Elements
function isFetchingData() {
  pageContent.style.display = 'none';
  noteMessage.style.display = 'none';
  pageLoader.style.display = 'flex';
};
function beforeGenerateParagraphs() {
  pageContent.style.display = 'block';
  pageLoader.style.display = 'none';
};
function fetchingCompleted() {
  pageContent.style.display = 'block';
  pageLoader.style.display = 'none';
  noteMessage.style.display = 'none';
};

// Function to get API Data
async function getParagraphsCountGenerator() {
  isFetchingData();
  try {
    let response = await fetch(apiUrl);
    let data = await response.json();
    const inputValue = parseInt(numberInput.value);
    const randomNumber = Math.floor(Math.random() * data.length);

    if (isNaN(inputValue) || inputValue <= 0 || inputValue > 100 || inputValue == '') {
      generatedParagraph.innerHTML = `<div class="generated-paragraph">${data[randomNumber]}</div>`;
    } else {
      let valueEntered = data.slice(0, inputValue);
      valueEntered = valueEntered.map(function (item, index) {
        return `<div class="generated-paragraph">
                  <div class="para-index">${index + 1}</div>
                  <div>${item}</div>
                </div>`;
      }).join("");
      generatedParagraph.innerHTML = valueEntered;
    }
    fetchingCompleted();
  } catch(error) {
    console.log(error);
  }
};

// Fire Function and Listener
beforeGenerateParagraphs();
btn.addEventListener('click', (e) => {
  e.preventDefault();
  getParagraphsCountGenerator();
});