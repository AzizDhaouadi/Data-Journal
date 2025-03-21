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
            <div className="flex flex-row gap-5 justify-start flex-wrap">
                <TranslateButton targetLanguage="French" translationFunction={handleTranslate} isTranslating={isTranslating} />
                <TranslateButton targetLanguage="Spanish" translationFunction={handleTranslate} isTranslating={isTranslating} />
                <TranslateButton targetLanguage="Japanese" translationFunction={handleTranslate} isTranslating={isTranslating} />
            </div>
        </section>
    )
}