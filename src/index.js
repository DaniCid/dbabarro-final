import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Routing from './components/Routing'
import { MediaProvider } from './contexts/MediaContexts';
import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MediaProvider>
      <BrowserRouter>
				<Navbar />
				<Routing />
				<Footer />   
      </BrowserRouter>
    </MediaProvider>
  </React.StrictMode>
);

reportWebVitals();
