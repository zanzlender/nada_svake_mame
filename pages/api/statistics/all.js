import getStatisticsData from "../../../lib/Database/Operations/statistics";
import userIsAuthenticated from "../../../middleware/api_auth_check";

async function handler(req, res) {
  console.log("CALLED: /api/statistics/all");

  const stats = await getStatisticsData();
  res.status(200).json(stats);
}

export default userIsAuthenticated(handler);
