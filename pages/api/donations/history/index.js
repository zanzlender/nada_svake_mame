import { getDonationsHistory } from "lib/Database/Operations/donations";
import userIsAuthenticated from "../../../../middleware/api_auth_check";

async function handler(req, res) {
  if (req.method === "GET") {
    console.log("CALLED: GET /api/donations/history");

    const items = await getDonationsHistory();

    items.forEach((item) => {
      let delID = item.deliverer;
      item.deliverer = item.delivererName + " " + item.delivererSurname;
      item.delivererId = delID;

      let datum = new Date(item.deliveryDate);
      let formatedDelDate =
        datum.getDate() +
        " / " +
        (datum.getMonth() + 1) +
        " / " +
        datum.getFullYear();

      let datum2 = new Date(item.donationDate);
      let formatedDonDate =
        datum2.getDate() +
        " / " +
        (datum2.getMonth() + 1) +
        " / " +
        datum2.getFullYear();

      items[items.indexOf(item)].formatedDeliveryDate = formatedDelDate;
      items[items.indexOf(item)].formatedDonationDate = formatedDonDate;
    });

    return res.status(200).json(items);
  }

  if (req.method === "POST") {
    console.log("CALLED: POST /api/donations");

    const name = req.body.name;
    const info = req.body.info;
    const expiration_date = req.body.expiration_date;
    const quantity = req.body.quantity;
    const categories = req.body.categories;

    const queryInsert = "";
    /*= await addNewItem(
      name,
      info,
      expiration_date,
      quantity,
      categories
    ); */

    return res.status(200).json({ message: queryInsert });
  }
}

export default userIsAuthenticated(handler);
