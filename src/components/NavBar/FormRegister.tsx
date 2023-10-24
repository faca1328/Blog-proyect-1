import { Button, TextInput } from "@tremor/react"
import { UsersActions } from "../../hooks/usersAction";
import { useState } from "react";
import { Alert } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";


interface Props {
    Offcanvas: () => void;
}


export const FormRegister: React.FC<Props> = ({Offcanvas}) => {

    const { registerUser } = UsersActions();

    const [user, setUser] = useState({
        name: "",
        userName: "",
        email: "",
        password: ""
    })

    //ver como capturar errores despues ***********
    const [error, setError] = useState('');


    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        //setea el valor que se va escribiendo en el user
        setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });

        setError('');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // Validar el campo 'name'
        if (user.name.length < 3 || user.name.length > 20) {
            setError("name");
            return;
        }

        // Validar el campo 'userName'
        if (user.userName.length < 3 || user.userName.length > 15) {
            setError("username");
            return;
        }

        // Validar el campo 'password'
        if (user.password.length < 7 || user.password.length > 15) {
            setError("password");
            return;
        }

        if (!user.email) {
            setError("email");
            return;
        }


        try {

            await createUserWithEmailAndPassword(auth, user.email, user.password)
                .then(() => { })

            registerUser(user.userName, user.name, user.email, user.password)

            setUser({
                name: "",
                userName: "",
                email: "",
                password: ""
            })

            Offcanvas()

        } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') {
                setError("Email already in use");
            }
        }

    };



    return (
        <form onSubmit={handleSubmit}>

            <div className="w-3/4 m-auto mt-5">
                <h1> <span className="font-bold text-lg">Register:</span> Please fill all the form </h1>
                <hr />

                <div className="w-full m-auto mt-3">
                    <label htmlFor="name" className="block">Full Name</label>
                    <TextInput type="text" placeholder="Full Name between 3 and 20 caracters" name="name"
                        onChange={handleChange}
                        error={error === "name" ? true : false} errorMessage={error === "name" ? "Wrong Name" : undefined}
                        value={user.name}
                    />
                </div>

                <div className="w-full m-auto mt-2">
                    <label htmlFor="userName" className="block">Username</label>
                    <TextInput type="text" placeholder="UserName between 3 and 17 caracters" name="userName"
                        onChange={handleChange}
                        error={error === "username" ? true : false} errorMessage={error === "username" ? "Wrong UserName" : undefined}
                        value={user.userName}
                    />
                </div>

                <div className="w-full m-auto mt-2">
                    <label htmlFor="email" >Email</label>
                    <TextInput type="email" placeholder="Enter your Email here" name="email" onChange={handleChange}
                        error={error === "email" ? true : false} errorMessage={error === "email" ? "Add Email" : undefined}
                        value={user.email}
                    />
                </div>

                <div className="w-full m-auto mt-2">
                    <label htmlFor="password" >Password</label>
                    <TextInput type="password" placeholder="Password between 7 and 15 caracters" name="password"
                        onChange={handleChange}
                        error={error === "password" ? true : false} errorMessage={error === "password" ? "Wrong Password" : undefined}
                        value={user.password}
                    />
                </div>

                <div className="w-full mt-3 m-auto">
                    <Button className="w-full" variant="primary" > Register </Button>
                </div>

                {(error === "Email already in use") ?
                    <Alert className="mt-3 self-center" severity="error">{error}</Alert>
                    : null
                }

            </div>

        </form>
    )
}
