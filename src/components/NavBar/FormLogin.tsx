import { useState } from "react";
import { Button, TextInput } from "@tremor/react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FormRegister } from "./FormRegister";
import { auth } from "../../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "@mui/material";
import { AuthActions } from "../../hooks/authActions";



export const FormLogin = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleShowOffcanvas = () => {
    setShowOffcanvas(true);
  };


  const {userLogin} = AuthActions()


  const [loginError, setLoginError] = useState<string | null>(null);


  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });

    setLoginError(null);
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {

      await signInWithEmailAndPassword(auth, user.email, user.password)
        .then(({user}) => {
          userLogin(user.email)

        })
      

      setLoginError("Success")
      e.stopPropagation();
      setUser({
        email: "",
        password: ""
      });
      

    } catch (err: any) {


      switch (err.code) {
        case ('auth/email-already-exists'):
          setLoginError("Email already exists")
          break;

        case ('auth/missing-password'):
          setLoginError("Missing password")
          break;

        case ('auth/internal-error'):
          setLoginError("System fail, please try again")
          break;

        case ('auth/invalid-login-credentials'):
          setLoginError("Wrong password or email address")
          break;

        case ('auth/too-many-requests'):
          setLoginError("Too many requests, try later")
          break;

        default: setLoginError("Unknown error")
          break;
      }
    }

    e.stopPropagation();
  };


 
  


  return (
    <>

      <form onSubmit={handleSubmit}>
        <div className="w-3/4 m-auto mt-5">
          <h1>
            <span className="font-bold">Welcome</span>, please LogIn
          </h1>
          <hr />

          <div className="w-full m-auto mt-3">
            <label htmlFor="email" className="block">
              Email
            </label>
            <TextInput
              type="email"
              placeholder="Type your email here"
              name="email"
              onChange={handleChange}
              value= {user.email}

            />
          </div>

          <div className="w-full m-auto mt-2">
            <label htmlFor="password">Password</label>
            <TextInput
              type="password"
              placeholder="Type password here"
              name="password"
              onChange={handleChange}
              value= {user.password}

            />
          </div>

          <p className="mt-2 text-xs">
            New user? Register{" "}
            <span
              className="font-bold cursor-pointer"
              onClick={handleShowOffcanvas}
            >
              here
            </span>
          </p>

          <div className="w-full mt-3 m-auto">
            <Button className="w-full" variant="primary">
              LogIn
            </Button>
          </div>
        </div>

        <Offcanvas
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          placement="end"
        >
          <FormRegister Offcanvas={() => setShowOffcanvas(false)} />
        </Offcanvas>
      </form>

      {(loginError === 'Success') ? 
      <Alert className="mt-3 self-center" severity="success">You have Loged Sucessfully</Alert> 
      : (loginError ? 
        <Alert className="mt-3 self-center"  severity="error">{loginError}</Alert> 
        : null)}
      

    </>
  );
};
