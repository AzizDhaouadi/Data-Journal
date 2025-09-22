import React from "react";

export default function DataStory({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  if (question) {
    return (
      <>
        <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 p-5">
          <div className="py-4">
            <h2 className="text-xl font-semibold font-spectral">{question}</h2>
            <p className="text-gray-600 mt-2">{answer}</p>
          </div>
        </div>
      </>
    );
  }
}
