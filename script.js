import { wordList } from "./wordList.js";

let selectedCategory = null;
let currentWordIndex = -1;

window.generateRandomWord = function () {
  const wordDisplay = document.getElementById("word-display");
  const filteredWordList = selectedCategory
    ? wordList.filter((word) => word.category === selectedCategory)
    : wordList;

  // Увеличиваем индекс для перехода к следующему слову
  currentWordIndex = (currentWordIndex + 1) % filteredWordList.length;

  const randomWordPair = filteredWordList[currentWordIndex];
  wordDisplay.innerHTML += `
      <div class="words-container">
        <p class="generated-word" id="russian-word">${randomWordPair.russian}</p>
        <p class="generated-word" id="chinese-word_${currentWordIndex}" style="display: none;"> <span class="font-400"> Chinese word - </span>${randomWordPair.chinese}</p>
        <p class="generated-word" id="pinyin-word_${currentWordIndex}" style="display: none;"><span class="font-400">Pīnyīn - </span>${randomWordPair.pinyin}</p>
        <button id="toggle-translation_${currentWordIndex}" onclick="showTranslation(${currentWordIndex})">Показать перевод</button>
      </div>
    `;

  window.scrollTo(0, document.body.scrollHeight);
};

window.showTranslation = function (index) {
  const chineseWord = document.getElementById(`chinese-word_${index}`);
  const pinyinWord = document.getElementById(`pinyin-word_${index}`);
  const button = document.getElementById(`toggle-translation_${index}`);

  if (chineseWord.style.display === "none") {
    chineseWord.style.display = "block";
    pinyinWord.style.display = "block";
    button.innerText = "Скрыть перевод";
  } else {
    chineseWord.style.display = "none";
    pinyinWord.style.display = "none";
    button.innerText = "Показать перевод";
  }
};

window.selectCategory = function (category) {
  selectedCategory = category;
  generateRandomWord(); // Перегенерировать слово при выборе раздела
};
