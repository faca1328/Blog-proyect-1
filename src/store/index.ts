import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "./user/slice"
import publicationsReducer from "./publications/slice"
import { useSelector , useDispatch, TypedUseSelectorHook } from "react-redux/es/exports";
import authenticationReducer from "./userAuth/slice"


export const store = configureStore({
    reducer: {
        users: usersReducer,
        publications: publicationsReducer,
        authentication: authenticationReducer
    }
})


                                        //se iguala a lo que haya en el reducer del store arriba
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 

                                      
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;
export const useAppDipatch: () => AppDispatch = useDispatch;