import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Minter from '../components/Minter'


function Token() {
    return (
        <div className="flex-col justify-center">
            <Navbar />
            <Minter />
            <Footer />
        </div>
    );
  }
  
  export default Token;