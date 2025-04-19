import { useState } from "react";
import TranslateButton from "./TranslateButton.tsx";

interface TranslationRibbonProps {
    translateFunction: (language: string) => void;
}

export default function TranslationRibbon({ translateFunction }: TranslationRibbonProps) {
    const [isTranslating, setIsTranslating] = useState(false);

    async function handleTranslate(language: string) {
        setIsTranslating(true);
        await translateFunction(language);
        setIsTranslating(false);
    }

    return (
        <section id="tranlation-section">
            <div className="flex gap-7 overflow-x-auto">
                <TranslateButton className="inline-block px-5 py-2.5 rounded-md bg-teal-900 text-white font-semibold shadow-md hover:bg-gray-500 transition duration-200" targetLanguage="French" translationFunction={handleTranslate} isTranslating={isTranslating} />
                <TranslateButton className="inline-block px-5 py-2.5 rounded-md bg-teal-900 text-white font-semibold shadow-md hover:bg-gray-500 transition duration-200" targetLanguage="Spanish" translationFunction={handleTranslate} isTranslating={isTranslating} />
                <TranslateButton className="inline-block px-5 py-2.5 rounded-md bg-teal-900 text-white font-semibold shadow-md hover:bg-gray-500 transition duration-200" targetLanguage="Japanese" translationFunction={handleTranslate} isTranslating={isTranslating} />
            </div>
        </section>
    )
}