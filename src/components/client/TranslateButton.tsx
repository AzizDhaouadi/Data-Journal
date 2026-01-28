interface TranslateButtonProps {
  targetLanguage: string;
  translationFunction: (language: string) => void;
  isTranslating: boolean;
  className: any;
}

export default function TranslateButton({
  targetLanguage,
  translationFunction,
  isTranslating,
  className,
}: TranslateButtonProps) {
  function handleTrackingClick(e: React.MouseEvent<HTMLButtonElement>) {
    const trackedButtonText = e.currentTarget.innerText;

    const extractLanguage = (sourceText: string) => {
      if (!sourceText) {
        console.error("Failed to get the text");
      }

      const language = sourceText.split(" ").slice(-1);
      return language[0];
    };

    const translationLanguage = extractLanguage(trackedButtonText);

    if (!window.analytics) {
      console.error("Segment not detected.");
    }
    window.analytics.track("Used Translation", {
      target_language: translationLanguage,
    });
  }

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
      className={`${isTranslating ? "cursor-wait opacity-50" : "cursor-pointer"} ${className}`}
      onClick={(e) => {
        handleTrackingClick(e);
        handleTranslation();
      }}
      disabled={isTranslating}
    >
      {isTranslating ? "Translating..." : `Translate to ${targetLanguage}`}
    </button>
  );
}
