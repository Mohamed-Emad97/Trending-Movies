import Navbar from "./components/Navbar/Navbar";
import { Route , Routes , useNavigate} from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import People from "./components/People/People";
import Tvshows from "./components/Tvshows/Tvshows";
import Movies from "./components/Movies/Movies";
import NotFound from "./components/NotFound/NotFound";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SingleMovie from "./components/SingleMovie/SingleMovie";
import FindMovie from "./components/FindMovie/FindMovie";

function App() {
  
  let navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  function saveUser(){
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }
  // To Handle Reload 
  useEffect(()=> {
    if (localStorage.getItem("userToken")){
      saveUser();
    }
  }, []);

  function logOut(){
    setUserData(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  return (
  <>
    <Navbar logOut={logOut} userData={userData}/>
  <Routes>
    <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path="home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path="movies" element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
    <Route path="singlemovie" element={<ProtectedRoute><SingleMovie/></ProtectedRoute>}>
      <Route path=":id" element={<ProtectedRoute><SingleMovie/></ProtectedRoute>}/>
    </Route>
    <Route path="tvShow" element={<ProtectedRoute><Tvshows/></ProtectedRoute>}/>
    <Route path="people" element={<ProtectedRoute><People/></ProtectedRoute>}/>
    <Route path="about" element={<ProtectedRoute><About/></ProtectedRoute>}/>
    <Route path="findmovie" element={<ProtectedRoute><FindMovie/></ProtectedRoute>}/>
    <Route path="login" element={<Login saveUserData={saveUser}/>}/>
    <Route path="register" element={<Register/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes>
  </>
  );
}

export default App;
