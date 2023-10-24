import { SearchIcon } from "@heroicons/react/solid";
import { useAppSelector } from "../../store";

interface Props {
    toggleTextarea: () => void;
  }

export const FirstInput: React.FC<Props> = ({toggleTextarea}) => {


    const { loggedIn } = useAppSelector((state) => state.authentication);
    
    

    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder={!loggedIn ? "Log in to start publishing" : "Write here..."}
                className="border border-gray-300 p-2 w-full rounded-md"
                onClick={toggleTextarea}
                disabled={loggedIn === false}
                
                
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
        </div>
    )
}
