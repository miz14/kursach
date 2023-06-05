import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import {Algoritm} from './Routes/Algoritm';
import {Default} from './Routes/Default';
import { AboutUs } from './Routes/AboutUs';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Default/>}>
    <Route index element={<Algoritm/>}/>
    <Route path='aboutus' element={<AboutUs/>}/>
  </Route> 
));


function App() {
  return (
    <RouterProvider router={router}/>
  );
}
export default App;