import { getAllFamiliesDataElligableForDonation } from "lib/Database/Operations/families";
import { getAllItemsFromWarehouse } from "lib/Database/Operations/warehouse";
import { addNewDonations } from "lib/Database/Operations/donations";
import userIsAuthenticated from "../../../middleware/api_auth_check";

async function handler(req, res) {
  if (req.method === "POST") {
    console.log("CALLED: POST /api/donations/donate");

    const families = await getAllFamiliesDataElligableForDonation();
    const items = await getAllItemsFromWarehouse();

    let distributedDonationsArray = distributeItemsAmongFamilies(
      families,
      items
    );

    let queryResponse = addNewDonations(distributedDonationsArray);

    return res.status(200).json(queryResponse);
  }
}

/**
 * * Rouund Robin algorithm that takes an array of items and distributes
 * * them 1 by 1 among each element from an array of families
 *
 * @returns {["familyId": ID<int>, "items": [{"<itemID>": itemCount<int>}]]}
 */
function distributeItemsAmongFamilies(families, items) {
  let singleItems = [];
  let familyIndex = 0;
  let familiesArray = [];

  // Simplify family object and add to array for faster execution
  families.forEach((family) => {
    familiesArray.push({
      familyId: family.id,
      familyName: family.surname,
      items: [],
    });
  });

  // Add an element to array for each item's quantity
  // exp: Juice x3 = [Juice, Juice, Juice]
  items.forEach((element) => {
    for (let i = 0; i < element.quantity; i++) {
      singleItems.push(element.id);
    }
  });

  singleItems.forEach((item) => {
    familiesArray[familyIndex].items.push(item);

    // increment familyIndex to max number of families, then reset
    if (familyIndex < familiesArray.length) familyIndex++;
    if (familyIndex === familiesArray.length) familyIndex = 0;
  });

  // Count all same item ids in items array and replace it with that
  familiesArray.forEach((family) => {
    // Returns an items object {itemID: count, item2ID: count}
    let duplicateCountArray = findDuplicateInArray(family.items);
    family.items = duplicateCountArray;
  });

  return familiesArray;
}

// Counts occurances of same strings or numbers in 1D a array
// and returns an object {"<string1>":<string1 count>, "<string2>":<string2 count>, ...}
function findDuplicateInArray(array) {
  let counts = {};

  for (let i = 0; i < array.length; i++) {
    if (counts[array[i]]) {
      counts[array[i]] += 1;
    } else {
      counts[array[i]] = 1;
    }
  }

  return counts;
}

export default userIsAuthenticated(handler);
