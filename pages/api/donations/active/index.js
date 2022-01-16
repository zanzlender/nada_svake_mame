import {
  getAllActiveDonations,
  getDonationsHistory,
} from "lib/Database/Operations/donations";
import { getAllFamiliesData } from "lib/Database/Operations/families";
import { getAllItemsFromWarehouseIncludingZeroQuantity } from "lib/Database/Operations/warehouse";
import userIsAuthenticated from "../../../../middleware/api_auth_check";

async function handler(req, res) {
  if (req.method === "GET") {
    console.log("CALLED: GET /api/donations/active");
    const donationsWithItemsArray = [];
    const donationIndexArray = [];

    const donations = await getAllActiveDonations();
    const allItems = await getAllItemsFromWarehouseIncludingZeroQuantity();
    const families = await getAllFamiliesData();

    // get all donations id for easiesr handling
    donations.forEach((donation) => {
      if (!donationIndexArray.includes(donation.id))
        donationIndexArray.push(donation.id);
    });

    // Create an object for each donation to family
    donationIndexArray.forEach((index) => {
      donationsWithItemsArray.push({ id: index, items: [] });
    });

    donations.forEach((donation) => {
      donationsWithItemsArray.forEach((sortedDonation) => {
        if (sortedDonation.id == donation.id) {
          let indexOfDonation = donationsWithItemsArray.indexOf(sortedDonation);

          // set atributes like returned from database
          donationsWithItemsArray[indexOfDonation].family_id =
            donation.family_id;
          donationsWithItemsArray[indexOfDonation].name = donation.name;
          donationsWithItemsArray[indexOfDonation].donation_id =
            donation.donation_id;
          donationsWithItemsArray[indexOfDonation].donationCreatedDate =
            donation.donationCreatedDate;

          donationsWithItemsArray[indexOfDonation].items.push({
            item_id: donation.item_id,
            quantity: donation.quantity,
            name: "",
          });
        }
      });
    });

    allItems.forEach((item) => {
      donationsWithItemsArray.forEach((donation) => {
        donation?.items?.forEach((donatedItem) => {
          if (donatedItem.item_id == item.id) {
            let donationIndex = donationsWithItemsArray.indexOf(donation);
            let itemIndex = allItems.indexOf(item);

            donationsWithItemsArray[donationIndex].items[itemIndex].name =
              item.name;
          }
        });
      });
    });

    families.forEach((family) => {
      donationsWithItemsArray.forEach((donation) => {
        if (donation.family_id == family.id) {
          let donationIndex = donationsWithItemsArray.indexOf(donation);
          donationsWithItemsArray[donationIndex].family_surname =
            family.surname;
        }
      });
    });

    console.log(donationsWithItemsArray);
    return res.status(200).json(donationsWithItemsArray);
  }
}

export default userIsAuthenticated(handler);
