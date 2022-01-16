import React, { useEffect } from "react";
import isLoggedIn from "../../middleware/authentication_check.js";
// components
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

// layout for page
import Admin from "layouts/AdminDashboard.js";
import { useRouter } from "next/router";
import { useAuthContext } from "lib/Firebase/AuthProvider";

const Dashboard = () => {
  const router = useRouter();
  const user = useAuthContext();

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);
  return (
    <Admin>
      {user.currentUser ? "USER: " + user.currentUser?.email : "NO USER"}
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </Admin>
  );
};

export default isLoggedIn(Dashboard);
