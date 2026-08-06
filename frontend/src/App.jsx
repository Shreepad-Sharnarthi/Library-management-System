import {BrowserRouter,Routes,Route} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Members from "./pages/Members";
import Borrowings from "./pages/Borrowings";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
function App(){

return(

<BrowserRouter>

<Routes>
<Route path="/register" element={<Register />} />
<Route path="/" element={<Login/>}/>

<Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>

<Route path="/books" element={<ProtectedRoute><Books/></ProtectedRoute>}/>

<Route path="/members" element={<ProtectedRoute><Members/></ProtectedRoute>}/>

<Route path="/borrowings" element={<ProtectedRoute><Borrowings/></ProtectedRoute>}/>

<Route path="/reports" element={<ProtectedRoute><Reports/></ProtectedRoute>}/>

</Routes>

</BrowserRouter>

)

}

export default App;