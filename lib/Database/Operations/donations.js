import { db } from "../database";

export async function getAllActiveDonations() {
  try {
    let query = await db.any(`SELECT * FROM "Donations_temp" 
                              LEFT JOIN "Donations_temp_items" 
                                ON "Donations_temp".id = "Donations_temp_items".donation_id`);
    return query;
  } catch (error) {
    return "Greška! " + error;
  }
}

export async function getDonationsHistory() {
  try {
    let query = await db.any(`SELECT 
                                dh.id, dh."deliveryDate", 
                                dh.deliverer, u.name as "delivererName", 
                                u.surname as "delivererSurname", 
                                dh.family, f.surname, dh.items,
                                dh."donationDate"
                              FROM "Donation_history" dh
                              LEFT JOIN "Families" f
                                ON f.id = dh.family
                              LEFT JOIN "Users" u 
                                ON u.id = dh.deliverer
                              ORDER BY dh."donationDate"`);
    return query;
  } catch (error) {
    return "Greška! " + error;
  }
}

export async function getDonationsHistoryForFamily(familyId) {
  try {
    let query = await db.any(
      `SELECT * FROM "Donation_history" WHERE family = ${familyId} ORDER BY "deliveryDate" DESC`
    );
    return query;
  } catch (error) {
    return "Greška! " + error;
  }
}

/**
 * families is an array like
 * [{
 *  "familyId": ID,
 *  "items": [
 *      {"<item1ID>":<item1Count>},
 *      {"<item2ID>":<item2Count>}, ...
 *   ]
 * }]
 */
export async function addNewDonations(families) {
  // Create a transaction that iterrates the families array
  // creates a batch for all families for tables
  // Donations_temp and Donations_temp_items and then executes
  db.tx((t) => {
    const queries = families.map((family) => {
      if (Object.keys(family.items).length !== 0) {
        let datum = new Date();
        let donationName = `Donacija ${datum.getDay()}/${
          datum.getMonth() + 1
        }/${datum.getFullYear()}`;
        return t
          .one(
            `INSERT INTO "Donations_temp" (family_id, name) 
           VALUES ($1, $2) RETURNING id`,
            [family.familyId, donationName]
          )
          .then((query) => {
            const keys = Object.keys(family.items);

            keys.forEach((key, value) => {
              return t.none(
                `INSERT INTO "Donations_temp_items" (donation_id, item_id, quantity)
               VALUES ($1, $2, $3)`,
                [query.id, key, family.items[key]]
              );
            });
          })
          .then(() => {
            queries.push(
              t.none(
                `UPDATE "Families" SET last_donated = CURRENT_DATE WHERE id = ${family.familyId}`
              )
            );
          });
      }
    });

    return t.batch(queries);
  })
    .then((data) => {
      // SUCCESS
      // data = array of null-s
      let query = db.one(`UPDATE "Warehouse" SET quantity = 0`);
      return query;
    })
    .catch((error) => {
      console.log(error);
      return "Greška! " + error;
    });
}

/**
 * Move an active donation by ID from Donations_temp table
 * and all related items from Donations_temp_items
 * to Donation_history
 */
export async function confirmDonation(donationId) {
  let donationsWithItems;

  // Get the donation info and items
  try {
    donationsWithItems = await db.any(`SELECT * FROM "Donations_temp"
    LEFT JOIN "Donations_temp_items"
      ON "Donations_temp".id = "Donations_temp_items".donation_id 
    LEFT JOIN "Warehouse" 
      ON "Donations_temp_items".item_id = "Warehouse".id
    WHERE donation_id = ${donationId}`);
  } catch (error) {
    return `Greška! ${error}`;
  }

  // create a single donation that will have items in an array of objects
  let singleDonation = {
    id: donationsWithItems[0].id,
    donationCreatedDate: donationsWithItems[0].donationCreatedDate,
    family_id: donationsWithItems[0].family_id,
    donation_id: donationsWithItems[0].donation_id,
    items: [],
  };

  // Itterate all the items and set them into the array
  donationsWithItems.forEach((donation) => {
    singleDonation.items.push({
      item_id: donation.item_id,
      quantity: donation.quantity,
      info: donation.info,
      expiration_date: donation.expiration_date,
      categories: donation.categories,
      lastAddedDate: donation.lastAddedDate,
      name: donation.name,
    });
  });

  // Transaction: Add donation with items to Donations_history,
  // delete that donation from Donations_temp
  // CASCADING will delete all Donations_temp_items
  db.tx((t) => {
    let queries = [];

    queries.push(
      t.any(
        `INSERT INTO "Donation_history" (family, deliverer, items, "donationDate")
             VALUES ($1, $2, $3::json[], $4)`,
        [
          singleDonation.family_id,
          1,
          singleDonation.items,
          singleDonation.donationCreatedDate,
        ]
      )
    );

    queries.push(
      t.result(`DELETE FROM "Donations_temp" WHERE id = ${donationId}`)
    );

    return t.batch(queries);
  })
    .then((data) => {
      // SUCCESS
      // data = array of null-s
      return data;
    })
    .catch((error) => {
      return "Greška! " + error;
    });
}
