import React, { useState, useRef, useEffect } from "react";
// layout for page
import Admin from "layouts/AdminDashboard";
// components
import { AddFamilyModal } from "components/Modals/AddFamilyModal";
import FamilyMembers from "components/Families/FamilyMembers";
import CardTable from "components/Cards/CardTable";

import { useRouter } from "next/router";
import { useSWRHook } from "lib/SWR/useSWRHook";

export default function Family() {
  const router = useRouter();

  // GET family donation history
  const {
    data: donationData,
    mutate: mutateDonations,
    error: donationError,
  } = useSWRHook(`/api/donations/family/${router.query.id}`);

  // GET family data
  const { data, mutate, error } = useSWRHook(
    `/api/families/${router.query.id}`
  );

  // TODO dodati parametre
  const handleUpdateFamily = async () => {
    const res = await fetch("http://localhost:3000/api/families", {
      method: "POST",
      headers: {
        nsm_auth_token: "authorized",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        surname: 1,
        address: 2,
        city: 3,
        members: 4,
        memberCount: 5,
      }),
    });

    mutate();

    return res;
  };
  const handleDeleteFamily = async () => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm("Ova akcija će obrisati korisnika iz baze!\nŽelite li nastaviti?")
    ) {
      const res = await fetch(
        `http://localhost:3000/api/families/${router.query.id}`,
        {
          method: "DELETE",
          headers: {
            nsm_auth_token: "authorized",
            "Content-Type": "application/json",
          },
        }
      );
      let res2 = await res.json();

      if (res2.count == 1) {
        router.replace("/admin/families");
      } else {
        console.error("GREŠKA pri brisanju! Poruka: " + res2);
      }
    }
  };

  // Add new family modal
  const [isOpen, setIsOpen] = useState(false);
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState(0);

  const handleToggleAddUserModal = (e) => {
    setIsOpen(!isOpen);
  };
  const handleInputSurname = (e) => {
    setSurname(e.target.value);
  };
  const handleInputCity = (e) => {
    setCity(e.target.value);
  };
  const handleInputAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleInputNumberOfMembers = (e) => {
    setNumberOfMembers(e.target.value);
  };

  return (
    <>
      {isOpen ? (
        <AddFamilyModal
          toggleOpen={handleToggleAddUserModal}
          surname={surname}
          city={city}
          address={address}
          numberOfMembers={numberOfMembers}
          handleInputSurname={handleInputSurname}
          handleInputCity={handleInputCity}
          handleInputAddress={handleInputAddress}
          handleInputNumberOfMembers={handleInputNumberOfMembers}
          handleAddNewFamily={handleUpdateFamily}
        />
      ) : null}

      {/* OPĆE INFORMACIJE */}
      <div className="flex flex-wrap relative">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 ">
          <div className="w-full bg-white shadow-md rounded-md py-2 px-4">
            <div className="flex flex-row justify-between items-center">
              <p className="text-black text-lg font-semibold my-4 ">
                Opće informacije
              </p>
              <div className="flex flex-row justify-between">
                <button
                  className="h-10 bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleDeleteFamily}
                >
                  Obriši
                </button>
                <button
                  className="h-10 bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleToggleAddUserModal}
                >
                  Uredi
                </button>
              </div>
            </div>
            {/* PREZIME */}
            <div className="w-full mb-3">
              <label
                htmlFor="email-adress-icon"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Prezime
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="email-adress-icon"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  disabled
                  value={
                    error
                      ? "Greška pri dohvaćanju..."
                      : !data
                      ? "Učitavanje..."
                      : data[0]?.surname
                  }
                />
              </div>
            </div>

            {/* BROJ ĆLANOVA */}
            <div className="w-full mb-3">
              <label
                htmlFor="number-of-people-icon"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Broj članova
              </label>
              <div className="mt-1 relative">
                <input
                  type="number"
                  id="number-of-people-icon"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  disabled
                  value={
                    error
                      ? "Greška pri dohvaćanju..."
                      : !data
                      ? "Učitavanje..."
                      : data[0]?.family_members
                  }
                />
              </div>
            </div>

            {/* GRAD */}
            <div className="w-full mb-3">
              <label
                htmlFor="email-adress-icon"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Adresa
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="email-adress-icon"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  disabled
                  value={
                    error
                      ? "Greška pri dohvaćanju..."
                      : !data
                      ? "Učitavanje..."
                      : data[0]?.address
                  }
                />
              </div>
            </div>

            {/* ADRESA */}
            <div className="w-full mb-3">
              <label
                htmlFor="email-adress-icon"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Grad
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="email-adress-icon"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  disabled
                  value={
                    error
                      ? "Greška pri dohvaćanju..."
                      : !data
                      ? "Učitavanje..."
                      : data[0]?.city
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {/* ČLANOVI */}
        <div className="w-full xl:w-4/12 px-4">
          <div className="w-full h-32 bg-white shadow-md rounded-md">
            <div className="w-full flex flex-col px-4">
              <p className="text-black text-lg font-semibold my-4 ">
                Članovi obitelji
              </p>
              <div className="mb-6">
                {error ? (
                  "Greška u dohvaćanju..."
                ) : !data ? (
                  "Učitavanje..."
                ) : (
                  <FamilyMembers members={data[0]?.members} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* POVIJEST DONACIJA */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {donationError ? (
            "GREŠKA!"
          ) : !donationData ? (
            "Učitavanje..."
          ) : (
            <CardTable
              name={"Povijest donacija"}
              headers={[{ name: "Datum dostave" }, { name: "Stavke" }]}
              data={donationData}
              order={["formatedDeliveryDate", "items"]}
            />
          )}
        </div>
        {/*  <div className="w-full xl:w-4/12 px-4">
          <div className="w-full h-32 bg-red-500">adsads</div>
        </div> */}
      </div>
    </>
  );
}

Family.layout = Admin;
