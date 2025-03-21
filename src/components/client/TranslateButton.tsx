import { useState } from "react";

interface TranslateButtonProps {
    targetLanguage: string;
    translationFunction: (language: string) => void;
    isTranslating: boolean;
}

export default function TranslateButton({ targetLanguage, translationFunction, isTranslating }: TranslateButtonProps) {

    async function handleTranslation() {
        try {
            await translationFunction(targetLanguage);
        } catch (error) {
            console.error("Translation error:", error);
        }
    }

    return (
        <button
            id={targetLanguage}
            className={`${isTranslating ? "cursor-wait opacity-50" : "cursor-pointer"} underline decoration-dashed underline-offset-4 text-1xl dark:text-white hover:text-teal-800`}
            onClick={handleTranslation}
            disabled={isTranslating}
        >
            {isTranslating ? "Translating..." : `Translate to ${targetLanguage}`}
        </button>
    );
}
