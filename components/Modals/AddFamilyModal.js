import React from "react";
import { Portal } from "components/Portal";
import { GrClose } from "react-icons/gr";

export const AddFamilyModal = ({
  toggleOpen,
  surname,
  numberOfMembers,
  city,
  address,
  handleInputSurname,
  handleInputCity,
  handleInputAddress,
  handleInputNumberOfMembers,
  handleAddNewFamily,
}) => {
  return (
    <Portal>
      <div className="fixed top-0 right-0 min-h-full h-full sm:w-full md:w-1/2 xl:w-1/5 z-50 block bg-white shadow-2xl">
        <div className="flex flex-row items-center justify-between min-w-48 mx-4 my-4 border-b-2 pb-2">
          <GrClose
            className="my-auto hover:cursor-pointer"
            onClick={toggleOpen}
          />
          <p className="my-auto font-semibold">Dodaj novu obitelj</p>
        </div>

        <form className="mx-4 my-4">
          <div className="mb-3">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Prezime
            </label>
            <input
              type="text"
              id="surname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ivanić"
              required=""
              value={surname}
              onChange={handleInputSurname}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Grad
            </label>
            <input
              type="text"
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Varaždin"
              required=""
              value={city}
              onChange={handleInputCity}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Adresa
            </label>
            <input
              type="text"
              id="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Varaždinska 16"
              required=""
              value={address}
              onChange={handleInputAddress}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="memberCount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Broj članova
            </label>
            <input
              type="number"
              id="memberCount"
              step={1}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required=""
              value={numberOfMembers}
              onChange={handleInputNumberOfMembers}
            />
          </div>

          <button
            type="button"
            onClick={handleAddNewFamily}
            className="text-black bg-indigo-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Dodaj
          </button>
        </form>
      </div>
    </Portal>
  );
};
