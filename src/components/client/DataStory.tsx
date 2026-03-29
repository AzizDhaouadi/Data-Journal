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
        <div className="max-w-sm rounded-xl bg-white border border-zinc-900 p-5">
          <div className="py-4 flex flex-col gap-3">
            <h2 className="font-manrope font-bold text-xl text-zinc-900 leading-snug">
              {question}
            </h2>
            <p className="font-manrope text-sm text-zinc-500 leading-relaxed">
              {answer}
            </p>
          </div>
          <div className="w-8 h-1 bg-[#E8522A]" />
        </div>
      </>
    );
  }
}
