import React from "react";

const Navbar = () => {
    return (
        <div className="w-full h-20 flex justify-between items-center px-8 text-white">
            <h1 className='text-2xl font-bold text-[#00df9a]'>REACT</h1>
            <ul className="flex items-center">
                <li className="p-4">Sevices</li>
                <li className="p-4">Banking</li>
                <li className="p-4">Company</li>
                <li className="p-4"></li>

            </ul>
        
        </div>
    )
}

export default Navbar