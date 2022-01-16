import { db } from "../database";

export async function getAllItemsFromWarehouse() {
  try {
    let query = await db.any(`SELECT * FROM "Warehouse" WHERE quantity > 0`);
    return query;
  } catch (error) {
    return "Greška! " + error;
  }
}

export async function getAllItemsFromWarehouseIncludingZeroQuantity() {
  try {
    let query = await db.any(`SELECT * FROM "Warehouse"`);
    return query;
  } catch (error) {
    return "Greška! " + error;
  }
}

export async function addNewItem(
  name,
  info,
  expiration_date,
  quantity,
  categories
) {
  try {
    let query = await db.one(
      `INSERT INTO "Warehouse" (name, info, expiration_date, quantity, categories, "lastAddedDate") 
      VALUES ($1, $2, $3, $4, $5::text[], DEFAULT) RETURNING id`,
      [name, info, expiration_date, quantity, categories]
    );
    return query;
  } catch (error) {
    return "Greška! " + error;
  }
}

export async function getItemDetails(itemID) {
  try {
    let query = await db.any(`SELECT * FROM "Warehouse" WHERE id = $1`, [
      itemID,
    ]);
    return query;
  } catch (error) {
    return "Greška! " + error;
  }
}

export async function updateItem(
  name,
  info,
  expiration_date,
  quantity,
  categories,
  itemId
) {
  try {
    let query = await db.any(
      `UPDATE "Warehouse"
      SET name = $1, info = $2, expiration_date = $3, quantity = $4, categories = $5, "lastAddedDate" = CURRENT_TIMESTAMP
      WHERE id = $6`,
      [name, info, expiration_date, quantity, categories, itemId]
    );
    return query;
  } catch (error) {
    return "Greška! " + error;
  }
}

export async function deleteItem(itemId) {
  try {
    let query = await db.result(`DELETE FROM "Warehouse" WHERE "id"=${itemId}`);
    return {
      message: `DELETED: ${query.rowCount}`,
      count: query.rowCount,
    };
  } catch (error) {
    return "Greška! " + error;
  }
}
