import Buttonui from "../components/button";
import Form from "../components/fileupload";
import Loader from "../components/location";
import Input from "../components/search";
import "./landingpage.css"
export default function Landingpage() {

  return (
    <>
     <nav>
        <div className="logo">e-Pharma</div>
        <div className="search"><Input/></div>
        <div className="navitems">
            <p>offers</p>
            <p>help</p>
            <p>profile</p>
            <p>cart</p>
        </div>
     </nav>

     <div className="heromain">
        <div className="heromainleft">
            <p>upload your prescription</p>
            <Form/>
            <Buttonui className="custom-button"  label="go!" type="submit"/>
        </div>
        <div className="heromainright">
            <p>find nearest store?</p>
            <div className="loader"><Loader/></div>
            <div className="buttongrp">
                <Buttonui label="find store" type="submit"/>

            </div>
        </div>
     </div>
    </>
  );
}