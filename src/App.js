import './App.scss';
import { Provider } from 'react-redux';
import store from './redux/stores';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InputMovie from './components/InputMovie';
import PopularMovies from './components/PopularMovies';
import Footer from './components/Footer';
import UpcomingMovies from './components/Upcoming';
import NowPlaying from './components/NowPlaying';
import BrandsCarousel from './components/BrandsCarousel';
import PersonSelected from './components/PersonSelected';
import SelectedMovie from './components/SelectedMovie';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import ShowRatings from './components/ShowRatings';
import ShowComments from './components/ShowComments';

function App() {
  return (
    <>
    <Provider store={store}>
        <BrowserRouter>
        <Navbar />
        <InputMovie />
            <Routes>
              <Route path="/" exact element={<PopularMovies />} />
              <Route path="/selectedMovie" exact element={<SelectedMovie />} />
              <Route path="/upcomingMovies" exact element={<UpcomingMovies />} />
              <Route path="/nowPlaying" exact element={<NowPlaying />} />
              <Route path="/personSelected" exact element={<PersonSelected />} />
              <Route path="/userProfile" exact element={<UserProfile />} />
              <Route path='showRatings' exact element={<ShowRatings />} />
              <Route path='/showComments' exact element={<ShowComments />} />
            </Routes>
        </BrowserRouter>
        <BrandsCarousel />
        <Footer />
      </Provider>
    </>
  );
}

export default App;
