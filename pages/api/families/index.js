import {
  getAllFamiliesData,
  addFamily,
} from "lib/Database/Operations/families";
import userIsAuthenticated from "../../../middleware/api_auth_check";

async function handler(req, res) {
  if (req.method === "GET") {
    console.log("CALLED: GET /api/families");

    const familiesData = await getAllFamiliesData();
    return res.status(200).json(familiesData);
  }

  if (req.method === "POST") {
    console.log("CALLED: POST /api/families");

    const surname = req.body.surname;
    const address = req.body.address;
    const city = req.body.city;
    const memberCount = req.body.memberCount;
    const members = req.body.members;

    const queryInsert = await addFamily(
      surname,
      memberCount,
      city,
      address,
      members
    );

    return res.status(200).json({ message: queryInsert });
  }
}

export default userIsAuthenticated(handler);
