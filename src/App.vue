<template>
  <div class="app">
    <h1>AI Translator</h1>

    <div class="form">
      <textarea
        v-model="inputText"
        placeholder="Enter text to translate"
        rows="5"
      ></textarea>

      <select v-model="targetLang">
        <option value="af">Afrikaans</option>
        <option value="zu">Zulu</option>
        <option value="xh">Xhosa</option>
        <option value="st">Sesotho</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
        <option value="zh-Hans">Chinese</option>
        <option value="ar">Arabic</option>
      </select>

      <button @click="handleTranslate" :disabled="loading">
        {{ loading ? 'Translating...' : 'Translate' }}
      </button>
    </div>

    <div v-if="translatedText" class="output">
      <h3>Translated Text:</h3>
      <p>{{ translatedText }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { translateText } from './services/translator';

const inputText = ref('');
const targetLang = ref('fr');
const translatedText = ref('');
const loading = ref(false);

const handleTranslate = async () => {
  if (!inputText.value.trim()) return;
  loading.value = true;
  translatedText.value = '';
  try {
    translatedText.value = await translateText(inputText.value, targetLang.value);
  } catch (err) {
    translatedText.value = "Error translating text.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
  .app {
    max-width: 700px;
    margin: 50px auto;
    text-align: center;
    font-family: 'Inter', sans-serif;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }

  textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #ccc;
    resize: none;
  }

  select, button {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 6px;
    border: none;
  }

  button {
    background-color: #0078D7;
    color: white;
    cursor: pointer;
  }

  button:disabled {
    background-color: #ccc;
  }
  
  .output {
    margin-top: 30px;
    background-color: #f8f8f8;
    padding: 20px;
    border-radius: 8px;
  }
</style>
