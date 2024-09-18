import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Landy from '../components/Landy'


function Land() {
    return (
        <div className="flex-col justify-center">
            <Navbar />
            <Landy />
            <Footer />
        </div>
    );
  }
  
  export default Land;