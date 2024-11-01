// import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";




import "./FooterNav.css";

function FooterNav() {
  // const navigate = useNavigate()

  return (
    <div className="footer">
      <div className="footerItems text-sm font-extralight">

        <div className="footLeft pb-5">
          <p className="pb-3 text-black font-extrabold">Support</p>
          <a href="#">Help Center</a>
          <a href="#">FAQ</a>
          <a href="#">Accessibility</a>
        </div>

        <div className="footRight py-5 font-extrabold border-t-[1.5px]">
          <p className="pb-3 text-black">Hosting</p>
          <a href="#">Become a Host</a>
          <a href="#">Community</a>
          <a href="#">Terms & Conditions</a>
          {/* <p>Developed by Maazin Sherif</p> */}
        </div>

        <div className="footRight py-5 font-extrabold border-t-[1.5px]">
          <p className="pb-3 text-black font-extrabold">Rent-A-Pad</p>
          <a href="#">About</a>
          <a href="#">Contact</a>
          {/* <p>Developed by Maazin Sherif</p> */}
        </div>
      </div>

        <div className="footBottom border-t-[1.5px] pt-4 font-sans font-light">
        <p>2024 Rent-A-Pad. Developed by Maazin Sherif.</p>
        </div>

  </div>

  );
}

export default FooterNav;
