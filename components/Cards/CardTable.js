import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function CardTable({
  color,
  name,
  headers,
  data,
  order,
  deleteAction,
  editLink,
  addButton,
  printAll,
  confirmAction,
}) {
  const rowRef = useRef();

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        {/* TABLE NAME */}
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <div className={`flex flex-row justify-between items-center`}>
                <h3
                  className={
                    "font-semibold text-lg " +
                    (color === "light" ? "text-blueGray-700" : "text-white")
                  }
                >
                  {name}
                </h3>
                <div>
                  {typeof printAll == "function" ? (
                    <button
                      onClick={printAll}
                      type="button"
                      className="h-10 bg-blueGray-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                      Ispiši sve
                    </button>
                  ) : null}

                  {typeof addButton == "function" ? (
                    <button
                      className=" h-10 bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={addButton}
                    >
                      Dodaj
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ maxHeight: "400px" }}
          className="block w-full overflow-auto"
        >
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {headers.map((header) => {
                  return (
                    <th
                      key={Math.random()}
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      {header.name}
                    </th>
                  );
                })}
                {/* OPTIONS BUTTON SPACE */}
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {/* TABLE DATA */}

              {data.map((row) => {
                return (
                  <tr
                    ref={rowRef}
                    key={Math.random()}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    {order.map((element) => {
                      // element != "members" SPECIFIC FOR PAGE /families
                      if (element != "members") {
                        // SPECIFIC FOR PAGE /families/id
                        if (element === "items") {
                          return (
                            <td
                              key={Math.random()}
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                            >
                              {row[element]
                                ? row[element].map((item) => {
                                    return `${item.name} x${item.quantity} | `;
                                  })
                                : "Nije evidentirano"}
                            </td>
                          );
                        } else if (element === "categories") {
                          return (
                            <td
                              key={Math.random()}
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                            >
                              {row[element]
                                ? row[element].map((item) => {
                                    return `${item} | `;
                                  })
                                : "Nije evidentirano"}
                            </td>
                          );
                        } else if (element === "last_donated") {
                          const date1 = new Date(`${row[element]}`);
                          const date2 = new Date();
                          const diffTime = Math.abs(date2 - date1);
                          const diffDays = Math.ceil(
                            diffTime / (1000 * 60 * 60 * 24)
                          );
                          return (
                            <td
                              key={Math.random()}
                              className={`px-6  py-4 whitespace-nowrap text-sm font-medium dark:text-white ${
                                diffDays > 60 ? "text-red-500 font-bold" : ""
                              }`}
                            >
                              {row[element]
                                ? `${date1.getDay()} / ${
                                    date1.getMonth() + 1
                                  } / ${date1.getFullYear()} - Dugo nije donirano!`
                                : "Nije evidentirano"}
                            </td>
                          );
                        }
                        return (
                          <td
                            key={Math.random()}
                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                          >
                            {row[element] ? row[element] : "Nije evidentirano"}
                          </td>
                        );
                      }
                    })}

                    {typeof deleteAction !== "undefined" ||
                    typeof confirmAction !== "undefined" ||
                    typeof editLink !== "undefined" ? (
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <TableDropdown
                          id={row.id}
                          link={`${editLink}/${row.id}`}
                          deleteAction={deleteAction}
                          confirmAction={confirmAction}
                        />
                      </td>
                    ) : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
