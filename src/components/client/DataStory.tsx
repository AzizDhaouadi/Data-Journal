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
        <div
          className="max-w-sm rounded-2xl overflow-hidden bg-white p-5"
          style={{
            border: "2px solid #9B7FC8",
            cursor: "pointer",
            boxShadow: "8px 8px #9B7FC8",
            transition: "transform .2s ease, box-shadow .2s ease",
          }}
        >
          <div className="py-4">
            <h2 className="text-xl font-semibold font-spectral">{question}</h2>
            <p className="text-gray-600 mt-2">{answer}</p>
          </div>
        </div>
      </>
    );
  }
}
