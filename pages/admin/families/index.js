import React, { useState, useRef, useEffect } from "react";
// components
import CardTable from "components/Cards/CardTable.js";
import { AddFamilyModal } from "components/Modals/AddFamilyModal";
// layout for page
import Admin from "layouts/Admin.js";

import { useSWRHook } from "lib/SWR/useSWRHook";

export default function Families() {
  const { data, mutate, error } = useSWRHook("/api/families");

  const handleDeleteFamily = async (id) => {
    const res = await fetch(`http://localhost:3000/api/families/${id}`, {
      method: "DELETE",
      headers: {
        nsm_auth_token: "authorized",
        "Content-Type": "application/json",
      },
    });

    mutate();

    return res;
  };
  const handleAddNewFamily = async () => {
    const res = await fetch("http://localhost:3000/api/families", {
      method: "POST",
      headers: {
        nsm_auth_token: "authorized",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        surname,
        address,
        city,
        members: null,
        memberCount: numberOfMembers,
      }),
    });

    handleToggleAddUserModal();
    mutate();
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
          handleAddNewFamily={handleAddNewFamily}
        />
      ) : null}

      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          {/** TODO u api ubaciti zadnju dostavu  */}
          {error ? (
            "GREŠKA!"
          ) : !data ? (
            "Učitavanje..."
          ) : (
            <CardTable
              name={"Prijavljene osobe / obitelji"}
              headers={[
                { name: "Prezime" },
                { name: "Grad" },
                { name: "Adresa" },
                { name: "Broj članova" },
                { name: "Zadnja dostava" },
              ]}
              data={data}
              order={[
                "surname",
                "city",
                "address",
                "family_members",
                "last_donated",
              ]}
              deleteAction={handleDeleteFamily}
              editLink={"/admin/families"}
              addButton={handleToggleAddUserModal}
            />
          )}
        </div>
      </div>
    </>
  );
}

Families.layout = Admin;
