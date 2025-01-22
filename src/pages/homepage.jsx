import "./homepage.css"
import { useNavigate } from 'react-router-dom';
import LoginPage from "./loginpage";

export default function Homepage() {
    const navigate = useNavigate();

   
  return (
    <>
      <nav>
        <div className="logo"><h1>e-Pharma</h1> </div> 
        <div className="navitems">
            <ul>
                <li >Home</li>
                <li>about us</li>
                <li>services</li>
                <li>contact us</li>
            </ul>
        </div>
      </nav>

      <div className="hero">
        <div className="heroleft">
            <h1 className="headerr">Get Medicines at your Doorstep</h1>
            <p className="herocontent">e-pharma is revolutionizing the way healthcare is delivered. Our mission is to create a digital platform that connects patients with the pharmacies.</p>
           
        </div>
        <div className="heroright">
          <LoginPage/>
        </div>
        
      </div>
    </>
  );
}