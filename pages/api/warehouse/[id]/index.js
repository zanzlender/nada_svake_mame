import {
  getItemDetails,
  deleteItem,
  updateItem,
} from "lib/Database/Operations/warehouse";
import userIsAuthenticated from "../../../../middleware/api_auth_check";

async function handler(req, res) {
  const { id: itemId } = req.query;

  if (req.method === "GET") {
    console.log("CALLED: GET /api/warehouse/" + itemId);

    const itemData = await getItemDetails(itemId);
    res.status(200).json(itemData);
  }

  if (req.method === "DELETE") {
    console.log("CALLED: DELETE /api/warehouse/" + itemId);

    const itemData = await deleteItem(itemId);
    res.status(200).json(itemData);
  }

  if (req.method === "PUT") {
    console.log("CALLED: PUT /api/warehouse/" + itemId);

    const name = req.body.name;
    const info = req.body.info;
    const expiration_date = req.body.expiration_date;
    const quantity = req.body.quantity;
    const categories = req.body.categories;

    const queryInsert = await updateItem(
      name,
      info,
      expiration_date,
      quantity,
      categories,
      itemId
    );

    return res.status(200).json({ message: queryInsert });
  }
}

export default userIsAuthenticated(handler);
