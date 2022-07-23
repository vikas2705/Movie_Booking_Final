import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route } from "react-router-dom";

import Authentication from "./pages/authentication/Authentication.jsx";
import Customer from "./pages/customer/Customer.jsx";

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/login' element={<Authentication />} />
                <Route path='/customer' element={<Customer />} />
            </Routes>
        </div>
    );
}

export default App;
