import {
  getFamilyData,
  deleteFamily,
  updateFamily,
} from "lib/Database/Operations/families";
import userIsAuthenticated from "../../../../middleware/api_auth_check";

async function handler(req, res) {
  const { id: familyId } = req.query;

  if (req.method === "GET") {
    console.log("CALLED: GET /api/families/" + familyId);

    const familyData = await getFamilyData(familyId);
    res.status(200).json(familyData);
  }

  if (req.method === "DELETE") {
    console.log("CALLED: DELETE /api/families/" + familyId);

    const familyData = await deleteFamily(familyId);
    res.status(200).json(familyData);
  }

  if (req.method === "PUT") {
    console.log("CALLED: PUT /api/families/" + familyId);

    const surname = req.body.surname;
    const address = req.body.address;
    const city = req.body.city;
    const memberCount = req.body.memberCount;
    const members = req.body.members;

    const queryUpdate = await updateFamily(
      surname,
      memberCount,
      city,
      address,
      members,
      familyId
    );

    return res.status(200).json({ message: queryUpdate });
  }
}

export default userIsAuthenticated(handler);
