import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Pages/Home';

export default function App(){
    return(
        <Home />
    );
}

ReactDOM.createRoot(document.getElementById('app')).render(     
    <App />        
);