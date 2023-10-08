import { NavLink } from "react-router-dom"


const Navbar = () => {
    return (
        <div className="hidden w-full md:flex flex-row bg-[#28334b]
        gap-[2vh]  justify-between items-center padding-x py-3 text-white  sticky z-50">
           <div>
            
           </div>
            <ul className="flex flex-row space-x-4">
                <li className="nav-text">
                    <NavLink className='text-[3vh]' to="/">Home</NavLink>
                </li>
                <li className="nav-text">
                    <NavLink className='text-[3vh]' to="#customers">Customers</NavLink>
                </li>
            </ul>

        </div>
    )
}

export default Navbar