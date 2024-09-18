import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Minter from '../components/Minter'


function Astro() {
    return (
        <div className="flex-col justify-center">
            <Navbar />
            <Minter />
            <Footer />
        </div>
    );
  }
  
  export default Astro;