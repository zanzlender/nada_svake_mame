import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
// components
import CardTable from "components/Cards/CardTable.js";
import { AddItemModal } from "components/Modals/AddItemModal";
import useArray from "Utilities/Hooks/useArray";
// layout for page
import Admin from "layouts/Admin.js";

import { useSWRHook } from "lib/SWR/useSWRHook";

export default function Warehouse() {
  const { data, mutate, error } = useSWRHook("/api/warehouse");

  const handleDeleteItem = async (id) => {
    const res = await fetch(`http://localhost:3000/api/warehouse/${id}`, {
      method: "DELETE",
      headers: {
        nsm_auth_token: "authorized",
        "Content-Type": "application/json",
      },
    });

    mutate();

    return res;
  };
  const handleAddItem = async () => {
    const res = await fetch("http://localhost:3000/api/warehouse", {
      method: "POST",
      headers: {
        nsm_auth_token: "authorized",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        info,
        expiration_date: expirationDate,
        quantity,
        categories,
      }),
    });

    handleToggleAddItemModal();
    mutate();

    setName("");
    setInfo("");
    setExpirationDate();
    setQuantity(0);
    setCategories([]);
  };
  const handlePrintAll = async () => {
    const apiRes = await fetch("/api/warehouse", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        nsm_auth_token: "authorized",
        Accept: "application/json",
      },
    });

    let apiResJSON = await apiRes.json();
    console.log(apiResJSON);

    var doc = new jsPDF();
    let datum = new Date();
    const tableColumn = [
      "Id",
      "Naziv",
      "Kolicina",
      "Rok trajanja",
      "Zadnje dodano",
    ];
    const tableRows = [];

    apiResJSON.forEach((item) => {
      const itemData = [
        item.id,
        item.name,
        item.quantity,
        item.formatedExpirationDate,
        item.formatedLastAddedDate,
      ];
      tableRows.push(itemData);
    });

    const dateStr =
      "Skladište na dan " +
      datum.getDay() +
      "-" +
      datum.getMonth() +
      1 +
      "-" +
      datum.getFullYear();
    // ticket title. and margin-top + margin-left
    doc.text(
      dateStr +
        " " +
        datum.getHours() +
        ":" +
        datum.getMinutes() +
        ":" +
        datum.getMinutes(),
      10,
      20
    );
    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 30 });

    // we define the name of our PDF file.
    doc.save(`report_${dateStr}.pdf`);
  };

  // Add new family modal
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [expirationDate, setExpirationDate] = useState();
  const [quantity, setQuantity] = useState(0);
  const {
    array: categories,
    set: setCategories,
    push,
    remove,
    filter,
    update,
    clear,
  } = useArray([]);

  const handleToggleAddItemModal = (e) => {
    setIsOpen(!isOpen);
  };
  const handleInputName = (e) => {
    setName(e.target.value);
  };
  const handleInputInfo = (e) => {
    setInfo(e.target.value);
  };
  const handleInputQuantity = (e) => {
    setQuantity(e.target.value);
  };
  const handleInputExpirationDate = (e) => {
    setExpirationDate(e.target.value);
  };
  // TODO adapt for array use
  const handleInputCategories = (e) => {
    setCategories(e.target.value);
  };

  return (
    <>
      {isOpen ? (
        <AddItemModal
          toggleOpen={handleToggleAddItemModal}
          name={name}
          info={info}
          quantity={quantity}
          expirationDate={expirationDate}
          categories={categories}
          handleInputName={handleInputName}
          handleInputInfo={handleInputInfo}
          handleInputExpirationDate={handleInputExpirationDate}
          handleInputCategories={handleInputCategories}
          handleInputQuantity={handleInputQuantity}
          handleAddItem={handleAddItem}
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
              name={"Stavke na zalihi"}
              headers={[
                { name: "Naziv" },
                { name: "Količina" },
                { name: "Informacije" },
                { name: "Rok trajanja" },
                { name: "Kategorije" },
                { name: "Zadnje dodano" },
              ]}
              data={data}
              order={[
                "name",
                "quantity",
                "info",
                "formatedExpirationDate",
                "categories",
                "formatedLastAddedDate",
              ]}
              addButton={handleToggleAddItemModal}
              deleteAction={handleDeleteItem}
              printAll={handlePrintAll}
            />
          )}
        </div>
      </div>
    </>
  );
}

Warehouse.layout = Admin;
