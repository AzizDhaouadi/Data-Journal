import { useState, useEffect, type JSX } from "react";

export default function FiltersBar({ filtersList, onFilterSelect }: any) {
    const [pageFilters, setPageFilters] = useState<JSX.Element | string>("");
    useEffect(() => {
        const filtersToDisplay = Object.keys(filtersList);
        if (filtersToDisplay) {
            setPageFilters(() => {
                return (
                    <div className="my-6">
                        <ul className="flex flex-col gap-3">
                            {Object.keys(filtersList).map((filter) => (
                                <li className="w-full flex flex-wrap gap-3 p-4 bg-white shadow-md rounded-lg"
                                    key={filter}
                                    onClick={() => onFilterSelect(filter)} style={{ cursor: "pointer" }}
                                >
                                    {filter}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            })
        }
        else {
            setPageFilters(() => {
                return "Failed to load filters."
            })
        }
    }, [filtersList])

    return (
        <div>
            {pageFilters}
        </div>
    )
}

