import { useAppDipatch } from "../store";
import { User, fetchUserData, registerNewUser } from "../store/user/slice";



export const UsersActions = () => {
  
    const dispatch = useAppDipatch();

    const registerUser = (userName: User['userName'] , name: User['name']  , email: User['email'], password: User['password']) => {
        dispatch(registerNewUser({userName,email,password,name}));
        
        dispatch(fetchUserData())
    };


    return {registerUser }
}