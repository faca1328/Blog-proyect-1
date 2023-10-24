import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase.config";
import { getDocs, query } from "firebase/firestore";



export interface Publications {
    user: string,
    date: string,
    text: string,
    id: string
}

export interface NewPublications {
    user: string,
    text: string
}


const initialState: Publications[] = [];

export const fetchPublicationsData = createAsyncThunk("publications/fetchPublicationsData", async () => {
    const pubCollections = db.collection('Publications');
    const pubQuery = query(pubCollections.orderBy("date", "desc")); //Ordeno aca las Publicaciones
    const queryResult = await getDocs(pubQuery);
    const pubFetchedData: Publications[] = queryResult.docs.map((doc) => doc.data() as Publications);
    return pubFetchedData;
});

const PublicationsDB = db.collection("Publications")


export const publicationsSlice = createSlice({
    name: 'publications',
    initialState,
    reducers: {
        addNewPublication: (_, action: PayloadAction<NewPublications>) => {
            const id = crypto.randomUUID();
            const date = new Date().toLocaleString();
            const user = action.payload.user;
            const text = action.payload.text;
            
            PublicationsDB.add({user,text,id,date})

        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPublicationsData.fulfilled, (_, action) => { 
            return action.payload;
        });
    },
}
)


export default publicationsSlice.reducer;

export const { addNewPublication } = publicationsSlice.actions;