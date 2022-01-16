import { db } from "../database";

async function getTotalFamilyCount() {
  try {
    let query = await db.any(
      `SELECT SUM("family_members") as "families_count" FROM "Families"`
    );
    return query;
  } catch (error) {
    return "Greška! " + error;
  }
}

async function getTotalItemCountInWarehouse() {
  try {
    let query = await db.any(
      `SELECT SUM(quantity) as "item_count" FROM "Warehouse"`
    );
    return query;
  } catch (error) {
    return "Greška! " + error;
  }
}

async function getTotalDonationsCount() {
  try {
    let query = await db.any(
      `SELECT COUNT(*) as "donation_count" FROM "Donation_history"`
    );
    return query;
  } catch (error) {
    return "Greška! " + error;
  }
}

export default async function getStatisticsData() {
  try {
    const familyCount = await getTotalFamilyCount();
    const itemCount = await getTotalItemCountInWarehouse();
    const donationCount = await getTotalDonationsCount();

    return { familyCount, itemCount, donationCount };
  } catch (error) {
    return "Greška! " + error;
  }
}
