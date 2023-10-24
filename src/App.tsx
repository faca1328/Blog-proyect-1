import { Col, Grid } from '@tremor/react'
import './App.css'
import { NewPublication } from './components/NewPublication/NewPublication'
import { Publications } from './components/Publications'
import { UserCard } from './components/UserCard'
import { NavBar } from './components/NavBar/NavBar'
import { useEffect } from 'react'
import { fetchUserData } from './store/user/slice'
import { useAppDipatch } from './store'
import { fetchPublicationsData } from './store/publications/slice'


function App() { 

  const dispatch = useAppDipatch();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchPublicationsData());
  }, [dispatch]);


  return (
    <>
      <NavBar />

      <Grid numItemsLg={7} className="gap-6 mt-6">
        <Col numColSpanLg={2}>
          <UserCard />
        </Col>

        <Col numColSpanLg={4}>
          <NewPublication />
          <Publications />
        </Col>
      </Grid>
    </>
  )
}

export default App
