import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import {NavHeader} from './Routes/navHeader';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<NavHeader/>}>
  </Route> 
));


function App() {
  return (
    <RouterProvider router={router}/>
  );
}
export default App;