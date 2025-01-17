import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import SpotsBrowser from './components/Spots/SpotsBrowser';
import SpotDetails from './components/Spots/SpotDetails';
import SpotForm from './components/Spots/SpotForm';
import ManageSpots from './components/Spots/ManageSpots';
import EditSpotForm from './components/Spots/EditSpotForm';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet/>}

    </>
  );
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SpotsBrowser />
      },
      {
        path: "/spots/current",
        element: <ManageSpots />
      },
      {
        path: "/spots",
        element: <SpotForm />
      },
      {
        path: "/spots/:spotId",
        element: <SpotDetails />
      },
      {
        path: "/spots/:spotId/edit",
        element: <EditSpotForm />
      },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
