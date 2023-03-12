import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { login, logout } from '../redux/actions/authActionCreator';
import { firebaseLogin } from '../firebase/actions';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/index';
import Header from './Header';

const Navbar = () => {
  const [users, setUsers] = useState([]);    
  const usersCollection = collection(db, 'users_admin');
  const dispatch = useDispatch();
  const [barState, setBarState] = useState('none'); 
  const { isAuthenticated } = useSelector((state) => {
      return {
        isAuthenticated: state.auth.isAuthenticated
      };
  });
  useEffect(() => {
    document.getElementById("input-movie-container").style.display = barState;
          
  })
 /*useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      setUsers(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    }
    getUsers();  
  }, []);*/
    async function handleLogin(){
      const usuarios = [];
      const emails = [];
      const email = await firebaseLogin();
      dispatch(login());
      /*for(let i=0; i < users.length; i++){
        usuarios.push(users[i]);
      }
      for(let i=0; i < usuarios.length; i++){
        emails.push(usuarios[i].user);
      }
      if (emails.includes(email)){
        dispatch(login());
      }else{
        alert('User not authorised.')
      }*/
    }
    const toggleNav = () => {
      let navEle = document.getElementById('mainMenu');
      document.getElementById('web-name').style.display = 'flex';
      document.getElementById('logo').style.display = 'flex';
      document.getElementById('mag-glass').style.display = 'flex';
      document.getElementById('hamburger').classList.toggle("change");
      navEle.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      if(!navEle) return;
      if (!navEle.classList.contains("open")){
        navEle.setAttribute("class","open");
        if (window.innerWidth < 600){
          document.getElementById('web-name').style.display = 'none';
          document.getElementById('mag-glass').style.display = 'none';
          document.getElementById('input-movie-container').style.display = 'none';
        }
        return;
      }else{
        document.body.style.overflow = 'auto';
        document.getElementById('input-movie-container').style.display = barState;
        document.getElementById('mag-glass').style.display = 'flex';
        navEle.style.display = 'flex';
      }
        navEle.removeAttribute("class");
    }
    const handleLogout = () => {
      dispatch(logout());
    }
    const searchMovie = () => {   //to solve 2 clicks 
      if (barState === 'flex'){
        setBarState('none');
      }else{
        setBarState('flex');
      }
    }
    const handleOption = () => {
      const menu = document.getElementById('mainMenu');
      document.getElementById('web-name').style.display = 'flex';
      document.getElementById('logo').style.display = 'flex';
      document.getElementById('mag-glass').style.display = 'flex';
      menu.removeAttribute("class");
      document.getElementById('hamburger').classList.toggle("change");
      document.body.style.overflow = 'scroll';
      if (window.innerWidth < 600){
        menu.style.display = 'none';
        document.getElementById('input-movie-container').style.display = 'none';
      }
    }
   
    return (
        <>
          <nav id="mainMenu">
            <ul>
              <li><Link to='/' className='rated' onClick={handleOption}>Mejor valoradas</Link></li>
              <li><Link to='/upcomingMovies' className='upcoming' onClick={handleOption}>Próximamente</Link></li>
              <li><Link to='/nowPlaying' className='nowplaying' onClick={handleOption}>Estrenos</Link></li>
              <li className="login__button" >
                {isAuthenticated ? (
                        <>
                          <div onClick={handleLogout}
                            type="button"
                            className="logout__button" 
                          >
                            <span>Cerrar sesión</span>
                          </div>
                        </>
                        ) : (
                        <div
                          onClick={handleLogin}
                          type="button"
                          className="login__button" 
                        >
                          <span>Iniciar sesión</span>
                        </div>
                      )}
              </li>
            </ul>
          </nav>
          <div className='navbar'> 
              <ul className='navbar__options'>
              <li>
                  <div className="hamburger" id='hamburger' onClick={toggleNav}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                  </div>
                </li>
                <li>
                  <span className='search' id='mag-glass' onClick={searchMovie}>&#128269;</span>
                </li>
                <Header />
              </ul>
          </div>
        </>
    );
};

export default Navbar;