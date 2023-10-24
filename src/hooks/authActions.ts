import { useAppDipatch } from "../store";
import { Logg, followUser, loggIN, loggOut } from "../store/userAuth/slice";





export const AuthActions = () => {
  
    const dispatch = useAppDipatch();

    const userLogin = (loggedEmail: Logg['loggedEmail']) => {
        dispatch(loggIN(loggedEmail));
    }

    const userLogOut = () => {
        dispatch(loggOut());
    }

    const followingUser = (id:string) => {
        dispatch(followUser(id))
    }

    return {userLogin , userLogOut , followingUser}
    };
