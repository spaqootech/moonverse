import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { WalletProvider } from './context';
import { ToastContainer } from 'react-toastify';
import Astro from './pages/Astro';
import Land from './pages/Land';
import Moon from './pages/Moon';
import Token from './pages/Token';
import Roadmap from './pages/Roadmap';

function App() {

  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Astro />} />
            <Route path="/claim-land" exact element={<Land />} />
            <Route path="/moon" exact element={<Moon />} />
            <Route path="/token" exact element={<Token />} />
            <Route path="/roadmap" exact element={<Roadmap />} />
        </Routes>
      </BrowserRouter>      
      <ToastContainer />
    </WalletProvider>
  );
}

export default App;
