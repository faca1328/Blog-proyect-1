import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth, db } from '../../firebase.config';
import { getDocs, query, where, addDoc, updateDoc, doc } from 'firebase/firestore';


export interface Logg {
    loggedIn: boolean,
    loggedEmail: string | undefined | null
}


export interface FollowingUsers extends Logg {
    FollowedUsers: Array<string>
}



// Define una función para verificar el estado de autenticación inicial
const checkInitialAuthState = () => {
    const user = auth.currentUser;
    //si el usuario no es null devuelve true
    return user !== null;
}

const initialState: FollowingUsers = {
    loggedIn: checkInitialAuthState(), // Verifica el estado de autenticación al inicio
    loggedEmail: null,
    FollowedUsers: []
}


export const fetchFollowedUserData = createAsyncThunk("authentication/fetchFollowedUserData", async (loggedEmail: string) => {
    const followCollections = db.collection('FollowedUser');
    const followQuery = query(followCollections, where('LoggedUserID', '==', loggedEmail));
    const queryResult = await getDocs(followQuery);
    if (queryResult.empty) {
        return { FollowedUsers: [] };
    } else {
        const docData = queryResult.docs[0].data();
        return docData;
    }
});



const FollowedUsersDB = db.collection("Followed User")


const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        loggIN: (state, action: PayloadAction<Logg['loggedEmail']>) => {
            state.loggedIn = true;
            state.loggedEmail = action.payload;
        },
        loggOut: (state) => {
            state.loggedIn = false;
            state.loggedEmail = null;

        },
        //NO ESTA FUNCIONANDO
        followUser: (state, action: PayloadAction<string>) => {
            state.FollowedUsers.push(action.payload);

            // Actualiza la base de datos con el nuevo usuario seguido
            const loggedEmail = state.loggedEmail;
            if (loggedEmail) {
                const followQuery = query(FollowedUsersDB, where('LoggedUserID', '==', loggedEmail));
                getDocs(followQuery).then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        // Si no existe una entrada en la base de datos, crea una nueva
                        addDoc(FollowedUsersDB, {
                            LoggedUserID: loggedEmail,
                            FollowedUsers: [action.payload],
                        });
                    } else {
                        // Si la entrada ya existe, actualiza la lista de seguidos
                        const docRef = doc(FollowedUsersDB, querySnapshot.docs[0].id);
                        updateDoc(docRef, {
                            FollowedUsers: [...state.FollowedUsers],
                        });
                    }
                });
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFollowedUserData.fulfilled, (state, action) => {
            state.FollowedUsers = action.payload.FollowedUsers;
        });
    },
});



export default authSlice.reducer

export const { loggIN, loggOut, followUser  } = authSlice.actions