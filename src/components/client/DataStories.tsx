import { useState } from "react";
import DataStory from "./DataStory"
import FiltersBar from "./FiltersBar";

type DataStoryProps = {
    question: string;
    answer: string;
}

export default function DataStoriesComponent({ questionsList, filters }: any) {
    const [selectedFilter, setSelectedFilter] = useState<string>("");
    const filteredQuestions = selectedFilter === "" ? questionsList : questionsList.filter((q: any) => q.category === selectedFilter);

    function handleClearFilters() {
        setSelectedFilter("");
    }

    return (
        <div className="flex flex-row gap-8">
            <section>
                <button className="w-full flex flex-wrap gap-3 p-4" onClick={handleClearFilters}>Clear filter</button>
                <FiltersBar filtersList={filters} onFilterSelect={setSelectedFilter}></FiltersBar>
            </section>
            <section>
                <div className="my-6 flex flex-row flex-wrap gap-4">
                    {
                        filteredQuestions.map((listItem: DataStoryProps) => {
                            return (
                                <DataStory key={listItem.question} question={listItem.question} answer={listItem.answer}></DataStory>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}