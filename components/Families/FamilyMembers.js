import React from "react";

export default function FamilyMembers({ members }) {
  return (
    <>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 min-w-full">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden sm:rounded-lg shadow-md">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider dark:text-gray-400"
                  >
                    Ime i prezime
                  </th>
                  <th
                    scope="col"
                    className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider dark:text-gray-400"
                  >
                    Srodstvo
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {members
                  ? members.map((member) => {
                      return (
                        <tr
                          key={members.indexOf(member)}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {member.name} {member.surname}
                          </td>
                          <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap dark:text-gray-400">
                            {member.relationship}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href="#"
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
