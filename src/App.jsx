import Homepage from "./pages/homepage";
import Landingpage from "./pages/landingpage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/landingpage" element={<Landingpage />} />
      </Routes>
    </Router>
    </>
  );
}