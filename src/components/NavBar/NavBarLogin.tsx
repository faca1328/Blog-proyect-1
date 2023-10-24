//import { useAppSelector } from '../../store';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormLogin } from './FormLogin';
import { useAppSelector } from '../../store';
import { AuthActions } from '../../hooks/authActions';
import { Dropdown } from 'react-bootstrap';
import { auth } from '../../firebase.config';
import { User } from '../../store/user/slice';



export const NavBarLogin = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  
  const users = useAppSelector((state) => state.users);


  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  
  useEffect(() => {
    if (auth.currentUser?.email) {
      const logUserEmail = auth.currentUser.email;
      const logedUser = users.find(user => user.email === logUserEmail);
      

      if (logedUser) {
        setLoggedUser(logedUser);
      }
    }
  }, [auth.currentUser]);


  const { loggedIn } = useAppSelector((state) => state.authentication);
  const { userLogOut } = AuthActions()


  const handleClick = () => {
    userLogOut()
  }




  return (
    <>

      {loggedIn ?
        (<Dropdown className='ml-auto'>
          <Dropdown.Toggle variant="primary" key="end" > 

          Welcome {loggedUser ? loggedUser.name : "ERROR"}

            <Dropdown.Menu >
                <Dropdown.Item onClick={handleClick} > LogOut </Dropdown.Item>
            </Dropdown.Menu>
          
          </Dropdown.Toggle>
        </Dropdown>)

        :

        (<div className='ml-auto'>
          <Button color="inherit" onClick={handleShow} >Login</Button>

          <Offcanvas show={show} onHide={handleClose} placement='end'>
            <FormLogin />
          </Offcanvas>
        </div>)
      }


    </>
  )
}





