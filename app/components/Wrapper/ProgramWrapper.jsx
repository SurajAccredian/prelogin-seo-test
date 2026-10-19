import Footer from '../Footer/Footer'
import ProgramNavbar from '../Navbar/ProgramNavbar'

const ProgramWrapper = ({ children }) => {
    return (
        <>
            <ProgramNavbar />
            {children}
            <Footer />
        </>
    )
}

export default ProgramWrapper