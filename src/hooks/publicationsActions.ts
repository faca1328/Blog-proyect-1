import { useAppDipatch } from "../store";
import { Publications, addNewPublication, fetchPublicationsData } from "../store/publications/slice";





export const PublicationsActions = () => {
  
    const dispatch = useAppDipatch();

    const addPublication = (text: Publications["text"], user:Publications["user"]) => {
        dispatch(addNewPublication({text, user}));

        dispatch(fetchPublicationsData());
    };

    return {addPublication}
}
