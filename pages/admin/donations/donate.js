import React, { useState, useRef, useEffect } from "react";
import Spinner from "react-spinners/PacmanLoader";
// layout for page
import Admin from "layouts/Admin.js";

import { useRouter } from "next/router";
import { black } from "tailwindcss/colors";
import useWindowSize from "Utilities/Hooks/useWindowSize";
import { createPortal } from "react-dom";
import { setSyntheticLeadingComments } from "typescript";

export default function Donations() {
  const [isLoading, setIsLoading] = useState(false);

  const Router = useRouter();

  const handleDistributeItems = async () => {
    setIsLoading(true);

    const res = await fetch("http://localhost:3000/api/donations/donate", {
      method: "POST",
      headers: {
        nsm_auth_token: "authorized",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const resJson = await res.json();

    if (res.status === 200) {
      Router.push("/admin/donations");
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* DONATION HISTORY TABLE */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div
            className={
              "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
            }
          >
            {/* TABLE NAME */}
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div
                className="flex flex-wrap flex-row justify-center"
                style={{ minHeight: "500px" }}
              >
                {isLoading ? (
                  <Spinner
                    className="z-50"
                    color={"#8A2BE2"}
                    loading={isLoading}
                    size={50}
                  />
                ) : (
                  <div className="h-full w-full flex flex-row justify-items-center">
                    <button
                      className="h-10 bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleDistributeItems}
                    >
                      Nova donacija
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Donations.layout = Admin;

/*
<div className="h-full w-full flex flex-col items-start">
<div
  className="flex flex-row w-full h-full mb-2 text-xl"
  style={{ justifyContent: "space-between" }}
>
  <h3>
    <strong>Donacije obiteljima</strong>
  </h3>
  <button
    className=" h-10 bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    type="button"
    onClick={handleConfirmDonations}
  >
    Potvrdi donacije
  </button>
</div>
<div
  style={{ gap: "1rem" }}
  className="h-full w-full flex row flex-wrap items-center"
>
  {donationsFake.map((donation) => {
    return (
      <div
        style={{ width: "200px", minHeight: "300px" }}
        className="flex flex-col justify-between items-center bg-indigo-500 p-5 rounded-lg text-lg text-white shadow-md"
      >
        <p
          style={{ fontSize: "20px" }}
          className="mb-2 font-bold"
        >
          {donation.familyName}
        </p>
        <div
          style={{ height: "3px", width: "80%" }}
          className="rounded-2xl bg-white mb-4"
        ></div>
        <p>
          <strong>Zadnje donirano</strong>
        </p>
        <p className="mb-4">{donation.lastDonation}</p>

        <p>
          <strong>Stavke</strong>
        </p>
        <div className="flex flex-col w-full h-full">
          {donation.items.map((item) => {
            return (
              <p>
                {item.name} x{item.quantity}
              </p>
            );
          })}
        </div>
      </div>
    );
  })}
</div>
</div>
*/
