import { Outlet } from 'react-router-dom'
import Drawer from '../components/Drawer/Drawer'
import Navbar from '../components/Navbar'
import ScrollToTop from '../hooks/scroll-to-top'
import Footer from '../components/Footer'
const Layout = () => {
    return (
        <div>
            <ScrollToTop />
            <Navbar />
            <Drawer />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout