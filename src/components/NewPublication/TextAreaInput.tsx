import { useEffect, useRef, useState } from "react";
import { PublicationsActions } from "../../hooks/publicationsActions";
import { useAppSelector } from "../../store";
import { User } from "../../store/user/slice";

interface Props {
  toggleTextarea: () => void;
}

export const TextAreaInput: React.FC<Props> = ({ toggleTextarea }) => {
  const { addPublication } = PublicationsActions();

  const {loggedEmail} = useAppSelector(state => state.authentication)
  const users = useAppSelector(state => state.users);

  const [user, setUser] = useState<User | null>(null)



  useEffect(() => {
    const findUser = () => {
      if (loggedEmail) {
        const foundUser = users.find((user) => user.email === loggedEmail);
    
        console.log(foundUser);
    
        if (foundUser) {
          setUser(foundUser);
        }
      }
    }

    findUser()
  }, [loggedEmail])
  
  


  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = async () => {
    if (textRef.current) {
      const text = textRef.current.value;
      
      if (text && user) {    
        addPublication(text,user.name);
        textRef.current.value = ""; 
      }else {
      alert('Publication failed');
      }
    }
  };

  return (
    <div className="relative w-full">
      <textarea
        rows={4}
        placeholder="What are you thinking"
        className="border border-gray-300 p-2 mt-2 w-full rounded-md resize-none"
        ref={textRef}
      />

      <div
        className="absolute inset-y-5 right-0 pr-3 flex items-end cursor-pointer"
        onClick={()=> {handleClick(); toggleTextarea()}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="h-5 w-5 text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>

      <div
        className="absolute inset-y-auto mr-auto pr-3 flex items-end cursor-pointer"
        onClick={toggleTextarea}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="h-5 w-5 text-gray-400"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  );
};
