import { useState } from "react";
import TranslateButton from "./TranslateButton.tsx";

interface TranslationRibbonProps {
  translateFunction: (language: string) => void;
}

export default function TranslationRibbon({
  translateFunction,
}: TranslationRibbonProps) {
  const [isTranslating, setIsTranslating] = useState(false);

  async function handleTranslate(language: string) {
    setIsTranslating(true);
    await translateFunction(language);
    setIsTranslating(false);
  }

  return (
    <section id="tranlation-section">
      <div className="flex gap-7 overflow-x-auto">
        <TranslateButton
          className="text-sm relative inline-flex items-center px-5 py-2 rounded-full text-white bg-teal-900 shadow-md border-2 border-transparent before:absolute before:inset-0 before:rounded-full before:p-[2px] my-6"
          targetLanguage="French"
          translationFunction={handleTranslate}
          isTranslating={isTranslating}
        />
        <TranslateButton
          className="text-sm relative inline-flex items-center px-5 py-2 rounded-full text-white bg-teal-900 shadow-md border-2 border-transparent before:absolute before:inset-0 before:rounded-full before:p-[2px] my-6"
          targetLanguage="Spanish"
          translationFunction={handleTranslate}
          isTranslating={isTranslating}
        />
        <TranslateButton
          className="text-sm relative inline-flex items-center px-5 py-2 rounded-full text-white bg-teal-900 shadow-md border-2 border-transparent before:absolute before:inset-0 before:rounded-full before:p-[2px] my-6"
          targetLanguage="Japanese"
          translationFunction={handleTranslate}
          isTranslating={isTranslating}
        />
      </div>
    </section>
  );
}
