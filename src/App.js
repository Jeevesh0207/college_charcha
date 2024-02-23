import './App.css';
import MainUI from './MainUI'
import { Route, Routes } from 'react-router-dom';
import {Form,Contact,College,User,Page404} from './Components'
import { useAuth } from './Hook/Auth';
function App() {
  const Auth=useAuth()
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainUI />}></Route>
        <Route path='/user' element={<User/>}></Route>
        {
          <Route path='/form/add_data' element={<Form/>}></Route>
        }
        <Route path='/form/update_data/:name'element={<Form/>}/>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/contact/career_counsling' element={<Contact/>}></Route>
        <Route path='/contact/education_counsling' element={<Contact/>}></Route>
        <Route path='/contact/entrance_exams' element={<Contact/>}></Route>
        <Route path='/college/:name' element={<College/>}></Route>  
        <Route path='*' element={<Page404/>}></Route>   
      </Routes>
    </div>
  );
}

export default App;
