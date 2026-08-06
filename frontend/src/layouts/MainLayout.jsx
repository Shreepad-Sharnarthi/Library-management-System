import Sidebar from "../components/SidebarComponent.jsx";
import Navbar from "../components/NavbarComponent.jsx";

export default function MainLayout({children}){

return(

<div className="d-flex">

<Sidebar/>

<div className="flex-grow-1 bg-light">

<Navbar/>

<div className="container-fluid p-4">

{children}

</div>

</div>

</div>

)

}