import React from "react";
import RentLogo from "../../../img/rentconv2-fblack.svg";
import RentLogoWhite from "../../../img/rentconv2-fwhite.svg";

function Inbox() {
  return (
    <div className="pt-14 h-full lg:ml-60 block gap-2 flex-col lg:flex-row translate-all duration-300">
      <div className="w-full h-full flex justify-center items-center">
        <div>
          <img
            alt="Rent-Connect"
            src={RentLogo}
            className="flex mx-auto h-7 w-auto dark:hidden"
          />
          <img
            alt="Rent-Connect"
            src={RentLogoWhite}
            className="mx-auto h-7 w-auto hidden dark:block"
          />
          <span className="text-sm font-light">Not Available as of the moment.</span>
          </div>
      </div>
    </div>
  );
}

export default Inbox;
