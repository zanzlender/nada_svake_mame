import userIsAuthenticated from "../../../../../middleware/api_auth_check";
import { confirmDonation } from "../../../../../lib/Database/Operations/donations";

async function handler(req, res) {
  const { id: donationID } = req.query;

  if (req.method === "PUT") {
    console.log("CALLED: PUT /api/donations/active/" + donationID);

    const queryRes = await confirmDonation(donationID);

    return res.status(200).json({ message: queryRes });
  }
}

export default userIsAuthenticated(handler);
