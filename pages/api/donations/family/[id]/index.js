import { getDonationsHistoryForFamily } from "lib/Database/Operations/donations";
import userIsAuthenticated from "../../../../../middleware/api_auth_check";

async function handler(req, res) {
  const { id: familyId } = req.query;

  if (req.method === "GET") {
    console.log("CALLED: GET /api/donations/family" + familyId);

    const data = await getDonationsHistoryForFamily(familyId);

    data.forEach((donation) => {
      let datum = new Date(donation.deliveryDate);

      let formatedDate =
        datum.getDate() +
        " / " +
        (datum.getMonth() + 1) +
        " / " +
        datum.getFullYear();

      data[data.indexOf(donation)].formatedDeliveryDate = formatedDate;
    });

    res.status(200).json(data);
  }
}

export default userIsAuthenticated(handler);
