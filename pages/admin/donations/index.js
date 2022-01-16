import React, { useState, useRef, useEffect } from "react";
// components
import CardTable from "components/Cards/CardTable.js";
import { AddItemModal } from "components/Modals/AddItemModal";
import useArray from "Utilities/Hooks/useArray";
// layout for page
import Admin from "layouts/Admin.js";

import { useSWRHook } from "lib/SWR/useSWRHook";
import { useRouter } from "next/router";

export default function Donations() {
  const router = useRouter();

  // AKTIVNE DONACIJE
  const {
    data: activeDonations,
    mutate: mutateActiveDonations,
    error: activeDonationsError,
  } = useSWRHook("/api/donations/active");

  // POVIJEST DONACIJA
  const {
    data: donationsHistory,
    mutate: mutateDonationsHistory,
    error: donationsHistoryError,
  } = useSWRHook("/api/donations/history");

  const handleOpenPage = (e) => {
    router.push("/admin/donations/donate");
  };

  const handleConfirmDonation = async (donationID) => {
    const res = await fetch(
      `http://localhost:3000/api/donations/active/${donationID}`,
      {
        method: "PUT",
        headers: {
          nsm_auth_token: "authorized",
          "Content-Type": "application/json",
        },
      }
    );

    mutateDonationsHistory();
    mutateActiveDonations();

    return res;
  };

  return (
    <>
      {/* ACTIVE DONATIONS TABLE */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          {activeDonationsError ? (
            "GREŠKA!"
          ) : !activeDonations ? (
            "Učitavanje..."
          ) : (
            <CardTable
              name={"Donacije u tijeku"}
              headers={[
                { name: "Datum donacije" },
                { name: "Naziv" },
                { name: "Obitelj" },
                { name: "Stavke" },
              ]}
              data={activeDonations}
              order={["donationCreatedDate", "name", "family_surname", "items"]}
              addButton={handleOpenPage}
              confirmAction={handleConfirmDonation}
            />
          )}
        </div>
      </div>

      {/* DONATION HISTORY TABLE */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          {donationsHistoryError ? (
            "GREŠKA!"
          ) : !donationsHistory ? (
            "Učitavanje..."
          ) : (
            <CardTable
              name={"Povijest donacija"}
              headers={[
                { name: "Datum donacije" },
                { name: "Obitelj" },
                { name: "Dostavljeno" },
                { name: "Stavke" },
                { name: "Dostavio" },
              ]}
              data={donationsHistory}
              order={[
                "formatedDonationDate",
                "surname",
                "formatedDeliveryDate",
                "items",
                "deliverer",
              ]}
            />
          )}
        </div>
      </div>
    </>
  );
}

Donations.layout = Admin;
