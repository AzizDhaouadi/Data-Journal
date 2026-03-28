import TranslationRibbon from "./TranslationRibbon";
import SummarizeButton from "./SummarizeButton";

import { useState, type ReactNode } from "react";

interface BlogPostProps {
  children: ReactNode;
}

const current_env = import.meta.env.PUBLIC_CURRENT_ENV;

console.log(current_env);

const endpointPrefix =
  current_env == "DEV"
    ? "http://localhost:4321"
    : "https://datajournal.datakyu.co";

export default function BlogPost({ children }: BlogPostProps) {
  const [translatedText, setTranslatedText] = useState<any>(children);

  async function handleTranslation(language: string) {
    try {
      const translationPrompt = `
                You are an expert translator. Translate the following content from English to ${language} while keeping the original HTML structure intact. Only translate the text content inside the HTML tags and do not modify the tags, attributes, or structure.
                ❌ Do not wrap the output in markdown code blocks.
                ❌ Do not add any extra text, explanations, or formatting.
                ✅ Only return the translated HTML as plain text.
                Here is the content:
                \n\n${translatedText?.props?.value || translatedText?.props?.children?.props?.dangerouslySetInnerHTML?.__html} 
            `;

      const response = await fetch(`${endpointPrefix}/api/openai/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: translationPrompt }),
      });

      if (!response.ok) {
        const errorPayload = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}. Error: ${errorPayload.error}`,
        );
      }

      const data = await response.json();
      setTranslatedText(
        <>
          <div dangerouslySetInnerHTML={{ __html: data.text }} />
        </>,
      );
    } catch (error) {
      console.error("Error fetching translation:", error);
      setTranslatedText("Translation failed. Please try again.");
    }
  }

  return (
    <div className="w-[70%]" id="content-section">
      <div id="action-buttons">
        <SummarizeButton
          textToSummarize={
            translatedText?.props?.value ||
            translatedText?.props?.children?.props?.dangerouslySetInnerHTML
              ?.__html
          }
        />
        {/* <TranslationRibbon translateFunction={handleTranslation} /> */}
      </div>
      <div id="main-content" className="my-5">
        {translatedText}
      </div>
      <style>
        {`
          @media (width < 1024px) {
            #content-section {
              width: 90%;
            }
          }
          @media (width < 768px) {
            #action-buttons {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}
