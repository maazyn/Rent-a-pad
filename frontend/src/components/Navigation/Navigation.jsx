import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";

import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector((state) => state.session.user);


//     <div className="overflow-hidden w-full rounded-2xl shadow-lg" ref={emblaRef}>
//     <div className="flex">
//         {theSpot.SpotImages.map((image, index) => (
//             <div key={index} className="min-w-full">
//                 <img src={image.url} alt={`Spot Image ${index + 1}`} className="object-cover w-full h-96" />
//             </div>
//         ))}
//     </div>
// </div>
    return (
        <nav className="nav-bar bg-white drop-shadow-sm shadow-black border-b-[0.5px]">
            <div className="nav-bar-group w-[90vw] max-w-[1130px]">
                <NavLink to="/">
                    <img className="nav-logo" src="/images/logo-aa-proj.PNG" alt="Logo" />
                </NavLink>
                <div className="nav-bar-home">
                    <div className="create-listing hidden sm:block">
                        {sessionUser && (
                            <NavLink to="/spots">Create a listing</NavLink>
                        )}
                    </div>
                    {isLoaded && (
                        <div className="flex items-center justify-center">
                            {/* <h2 className="hidden lg:block text-sm sm:text-base">Hello</h2>, */}
                            <ProfileButton user={sessionUser}/>
                        </div>
                    )}
                </div>
            </div>

        </nav>
    );
}


export default Navigation;
