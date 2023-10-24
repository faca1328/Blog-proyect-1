import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase.config";
import { getDocs, query } from "firebase/firestore";



export interface UserRegister {
    email: string,
    password: string,
    name: string,
    userName: string
}


export interface User {
    name: string,
    userName: string,
    email: string,
    password: string,
    photo: string,
    id: string
}


const initialState: User[] = [];


// Acción asincrónica para cargar los datos de Firestore que pueden tener como resultado: "pending"/"fulfilled"/"rejected"
export const fetchUserData = createAsyncThunk("users/fetchUserData", async () => {
    const userCollections = db.collection('Users');
    const userQuery = query(userCollections);
    const queryResult = await getDocs(userQuery);
    const userFetchedData: User[] = queryResult.docs.map((doc) => doc.data() as User);
    return userFetchedData;
});



const UsersDB = db.collection("Users");


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        registerNewUser: (_, action: PayloadAction<UserRegister>) => {
            const id = crypto.randomUUID();
            const photo = `https://unavatar.io/github/${action.payload.userName}`;
            
            UsersDB.add({ ...action.payload, photo, id })
        }
    },

    //'extraReducers' nos permite manejar acciones asyncronas
    extraReducers: (builder) => {
        //builder : métodos para definir cómo manejar las acciones
        builder.addCase(fetchUserData.fulfilled, (_, action) => {// con "_" declaro el state pero que no lo voy a usar
            
            // Actualiza el estado con los datos recuperados en caso que sea 'fullfilled' el resultado.
            return action.payload;
        });
    },
})


export default usersSlice.reducer;

export const { registerNewUser } = usersSlice.actions;