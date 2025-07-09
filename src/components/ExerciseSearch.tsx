
import { useState, useEffect } from "react"

//using Wger API to search for exercises

type Category = { id: number; name: string };
type Muscle = { id: number; name: string };

type Exercise = {
    id: number;
    name: string;
    category: Category;
    muscles: Muscle[];
    equipment: any[];
};

type ExerciseSearchProps = {
    currentValue: string;
    onChange: (value: string) => void;
    onSelect: (exerciseName: string) => void;
}


export default function ExerciseSearch({ currentValue, onSelect, onChange }: ExerciseSearchProps) {

    const [exercises, setExercises] = useState<Exercise[]>([]); //array of exercise objects
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);


    useEffect(() => {
        //debounces the search (waits 300ms after user stops typing)
        const timeoutId = setTimeout(() => {
            searchExercises(currentValue);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [currentValue]);
    
    const searchExercises = async (query: string) => {
        
        //query must not only contain whitespace and must be at least 2 characters long
        if (!query || query.trim().length < 2) {
            setExercises([]);   //set it empty until search query has at least 3 letters
            setShowDropdown(false); //don't show dropdown
            return;
        }
        

        setLoading(true);

        //try to fetch from API
        try {
            const response = await fetch(`https://wger.de/api/v2/exerciseinfo/?language=2&search=${encodeURIComponent(query)}`);

            if (!response.ok) {
                throw new Error('Failed to fetch exercises');
            }

            const data = await response.json();

            //check if response is valid else set exercises to empty array and hide dropdown
            if (!data || !Array.isArray(data.results)) {
                setExercises([]);
                setShowDropdown(false);
                return;
            }

            //now knowing data.results is a valid array of exercise objects, we can map them to our Exercise type
            //const exercises = data.results;

            //filter the results to only include exercises that match the search term
            const searchTerm = query.trim().toLowerCase();
            const filteredResults = data.results.filter(
                (ex: any) => ex.name && ex.name.toLowerCase().includes(searchTerm)
            );
            //limit the results to 8
            const limitedResults = filteredResults.results
                .slice(0, 8);


            //update state (even if empty)
            setExercises(limitedResults);
            setShowDropdown(true);

        } catch (error) {
            console.error('Error fetching exercises:', error);
            setExercises([]);
            setLoading(false);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search exercises..."
                value={currentValue || ""}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                className="w-full p-2 border rounded"
                required
            />

            {loading && (
                <div className="absolute z-10 w-full bg-white border rounded shadow-lg p-2">
                    <p className="text-sm text-gray-500">Searching...</p>
                </div>
            )}

            {showDropdown && exercises.length > 0 && !loading && (
                <div className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                    {exercises.map((exercise) => (
                        <button
                            key={exercise.id}
                            type="button"
                            onClick={() => {
                                onSelect(exercise.name);
                                setShowDropdown(false);
                            }}
                            className="w-full text-left p-3 hover:bg-gray-100 border-b last:border-b-0"
                        >
                            <div className="font-medium text-gray-800">{exercise.name}</div>
                            <div className="text-sm text-gray-500">
                                {exercise.category?.name}
                                {exercise.muscles && exercise.muscles.length > 0 && (
                                    <> • {exercise.muscles.map(m => m.name).join(', ')}</>
                                )}
                            </div>
                        </button>

                    ))}
                </div>    
            )}




        </div>



    )
}