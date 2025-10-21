import axios from "axios";

const API_KEY = import.meta.env.VITE_AZURE_TRANSLATOR_KEY;
const ENDPOINT = "https://api.cognitive.microsofttranslator.com";
const REGION = import.meta.env.VITE_AZURE_TRANSLATOR_REGION;

export const translateText = async (text, targetLang = "fr") => {
  try {
    const response = await axios.post(
      `${ENDPOINT}/translate?api-version=3.0&to=${targetLang}`,
      [{ text }],
      {
        headers: {
          "Ocp-Apim-Subscription-Key": API_KEY,
          "Ocp-Apim-Subscription-Region": REGION,
          "Content-Type": "application/json",
        },
      }
    );

    const translation =
      response.data[0]?.translations[0]?.text || "No translation found.";
    return translation;
  } catch (error) {
    console.error("Translation API Error:", error);
    throw new Error("Unable to translate text.");
  }
};
