import getStatisticsData from "lib/Database/Operations/statistics";
import userIsAuthenticated from "../../../middleware/api_auth_check";

async function handler(req, res) {
  console.log("CALLED: /api/auth/login");

  const roles = await getStatisticsData();
  res.status(200).json(roles);
}
export default userIsAuthenticated(handler);
