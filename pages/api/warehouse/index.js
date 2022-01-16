import {
  addNewItem,
  getAllItemsFromWarehouse,
} from "lib/Database/Operations/warehouse";
import userIsAuthenticated from "../../../middleware/api_auth_check";

async function handler(req, res) {
  if (req.method === "GET") {
    console.log("CALLED: GET /api/warehouse");

    const items = await getAllItemsFromWarehouse();

    items.forEach((item) => {
      let datum = new Date(item.expiration_date);
      let formatedExpDate =
        datum.getDate() +
        " / " +
        (datum.getMonth() + 1) +
        " / " +
        datum.getFullYear();

      let datum2 = new Date(item.lastAddedDate);
      let formatedAddedDate =
        datum2.getDate() +
        " / " +
        (datum2.getMonth() + 1) +
        " / " +
        datum2.getFullYear();

      items[items.indexOf(item)].formatedExpirationDate = formatedExpDate;
      items[items.indexOf(item)].formatedLastAddedDate = formatedAddedDate;
    });

    return res.status(200).json(items);
  }

  if (req.method === "POST") {
    console.log("CALLED: POST /api/warehouse");

    const name = req.body.name;
    const info = req.body.info;
    const expiration_date = req.body.expiration_date;
    const quantity = req.body.quantity;
    const categories = req.body.categories;

    const queryInsert = await addNewItem(
      name,
      info,
      expiration_date,
      quantity,
      categories
    );

    return res.status(200).json({ message: queryInsert });
  }
}

export default userIsAuthenticated(handler);
