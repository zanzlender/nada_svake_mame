import { db } from "../database";

export async function getAllFamiliesData() {
  try {
    let query = await db.any(`SELECT * FROM "Families"`);
    return query;
  } catch (error) {
    return "Greška! " + error;
  }
}

// Svaka obitelj donaciju može dobiti samo svaka 2 mjeseca
// Vraća obitelji na način da su prve one koje su zadnje dobile donacije
export async function getAllFamiliesDataElligableForDonation() {
  try {
    let query = await db.any(
      `SELECT DISTINCT 
        "Families".id, "Families".family_members, 
        "Families".surname, "Families".city, "Families".address, 
        "Donations_temp"."donationCreatedDate", "Donation_history"."donationDate"
      FROM "Families"
      LEFT JOIN "Donations_temp"
          ON "Families".id = "Donations_temp".family_id
      LEFT JOIN "Donation_history"
          ON "Families".id = "Donation_history".family
      WHERE current_date - "Donations_temp"."donationCreatedDate" >= 60
      OR (current_date - "Donation_history"."donationDate"::date >=60)
      OR ("Donations_temp"."donationCreatedDate" is null
        AND "Donation_history"."donationDate" is null
      )
      ORDER BY "Donations_temp"."donationCreatedDate", "Donation_history"."donationDate" DESC`
    );
    return query;
  } catch (error) {
    return "Greška! " + error;
  }
}

export async function getFamilyData(familyId) {
  try {
    let query = await db.any(`SELECT * FROM "Families" WHERE id = ${familyId}`);
    return query;
  } catch (error) {
    return "Greška! " + error;
  }
}

export async function getFamilyCount() {
  try {
    let query = await db.any(
      `SELECT COUNT(*) as "family_count" FROM "Families"`
    );
    return query;
  } catch (error) {
    return "Greška! " + error;
  }
}

export async function deleteFamily(familyId) {
  try {
    let query = await db.result(
      `DELETE FROM "Families" WHERE "id"=${familyId}`
    );
    return {
      message: `DELETED: ${query.rowCount}`,
      count: query.rowCount,
    };
  } catch (error) {
    return "Greška! " + error;
  }
}

export async function addFamily(
  surname,
  family_members,
  city,
  address,
  members
) {
  try {
    let query = await db.one(
      `INSERT INTO "Families" (surname, family_members, city, address, members) 
      VALUES ($1, $2, $3, $4, $5::json[]) RETURNING id`,
      [surname, family_members, city, address, members]
    );
    return `INSERTED user with id: ${query.id}`;
  } catch (error) {
    return "Greška! " + error;
  }
}

export async function updateFamily(
  surname,
  family_members,
  city,
  address,
  members,
  familyId
) {
  try {
    let query = await db.none(
      `UPDATE "Families" SET surname = $1, family_members = $2, city = $3, address = $4, members = $5::json[] WHERE id = ${familyId}`,
      [surname, family_members, city, address, members]
    );

    return `UPDATED family with id = ${familyId} | ${query}`;
  } catch (error) {
    return "Greška! " + error;
  }
}
