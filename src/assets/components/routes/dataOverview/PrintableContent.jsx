import React, { useState } from "react";
import RentLogo from "../../../img/rentconv2-fblack.svg";
import { format } from "date-fns";
import UserCount from "./printable/UserCount";
import NewlyRegistered from "./printable/NewlyRegistered";
import ActiveuserHistogram from "./printable/ActiveuserHistogram";
import PropertylistingStatus from "./printable/PropertylistingStatus"
import PropertyCountBarangay from "./printable/PropertyCountBarangay";
import PropertyListedCount from "./printable/PropertyListedCount";
import MonthlyRate from "./printable/MonthlyRatesOccupancyVacancy";
import AveragePrice from "./printable/AveragePrice";
import TopMostVisited from "./printable/TopMostVisited";

const PrintableContent = React.forwardRef((props, ref) => {
  // State to hold user count data
  const [userCount, setUserCount] = useState({
    totalLandlords: 0,
    totalOccupants: 0,
    totalUnverifiedUsers: 0,
    totalNewReg30day: 0,
    percentageChange: 0,
  });

  // Function to update user count data
  const handleUserCountUpdate = (data) => {
    setUserCount((prevUserCount) => ({
      ...prevUserCount,
      ...data,
    }));
  };

  const isUp = userCount.percentageChange > 0;
  const registrationChangeText =
    userCount.percentageChange === 0
      ? `User registration percentage is unchanged this month.`
      : isUp
      ? `User registration is up by ${Math.abs(
          userCount.percentageChange
        ).toFixed(1)}% this month.`
      : `User registration is down by ${Math.abs(
          userCount.percentageChange
        ).toFixed(1)}% this month.`;

  const currentDate = format(new Date(), "MMMM dd, yyyy");

  const REPORT_SUMMARY = `As of the latest update, RentConnect has a total of ${userCount.totalLandlords} registered landlords, ${userCount.totalOccupants} occupants, and ${userCount.totalUnverifiedUsers} unverified users. Additionally, there have been ${userCount.totalNewReg30day} new user registrations this month. ${registrationChangeText}`;
  const ACTIVE_USER_HISTOGRAM_STATEMENT = "The active user histogram shows the number of logins within a specified time period. This visual representation helps us understand user engagement by highlighting peak login times and overall activity trends.";

  return (
    <div className="w-full h-full" ref={ref}>
      <div className="page">
      <div className="header-section relative flex flex-col items-center justify-center pb-10">
        <img alt="Rent-Connect" src={RentLogo} className="h-7 w-48"/>
        <p>Data Report As of {currentDate}</p>
      </div>
      
        <h1 className="font-medium text-lg pb-5">User Statistics</h1>
        <div
          className="grid gap-6 grid-cols-9 max-w-full mx-auto"
          style={{ gridTemplateRows: "repeat(3, auto)" }}
        >
          <UserCount onUserCountUpdate={handleUserCountUpdate} />
          <NewlyRegistered onRegisterUpdate={handleUserCountUpdate} />
          <div className="col-start-1 col-end-10 h-auto justify-center">
            <p>{REPORT_SUMMARY}</p>
          </div>
          <ActiveuserHistogram />
          <div className="col-start-1 col-end-10 justify-center">
            <p>{ACTIVE_USER_HISTOGRAM_STATEMENT}</p>
          </div>
        </div>
      </div>
      <div className="page">
        <h1 className="font-medium text-lg pb-5">Property Statistics</h1>
        <div
          className="grid gap-6 grid-cols-9 max-w-full mx-auto"
          style={{ gridTemplateRows: "repeat(3, auto)" }}
        >
        <PropertyListedCount />      
        <div className="col-start-5 col-end-10 h-auto justify-center">
            <p>{REPORT_SUMMARY}</p>
          </div>
        <PropertylistingStatus/>
        <div className="col-start-1 col-end-10 h-80 justify-center">
            <p>{REPORT_SUMMARY}</p>
          </div>
        <MonthlyRate/>
        <AveragePrice/>
        <PropertyCountBarangay/>
          <TopMostVisited/>
        </div>
      </div>
    </div>
  );
});

export default PrintableContent;
