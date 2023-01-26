

const getOrder = async (params, limit = 10, offset = 0) => {
console.log(params, limit, offset)
  let condition = 'WHERE 1=1';
  let val = [];
  if (params.buyerID) {
    condition += ' AND o.buyer_id = ? ';
    val.push(params.buyerID);
  }
  if (params.shopID) {
    condition += ' AND oi.shop_id = ? ';
    val.push(params.shopID);
  } 
  console.log(condition, val)
  let result = await readDB.query(`SELECT o.* FROM orders o join order_item oi on o.id = oi.order_id ${condition} LIMIT ${limit} OFFSET ${offset}  `, val);
  return result;
};

const getOrderDetail = async (orderID) => {
  let condition = 'WHERE 1=1';
  let val = [];

  if (orderID) {
    condition += ' AND id = ? ';
    val.push(orderID);
  }
  let result = await readDB.query(`SELECT * FROM orders ${condition} `, val);
  return result;
};

const addOrder = async (params) => {
  const result = await writeDB.query('INSERT INTO `orders` SET ? ', params);
  return result;
}

const updateOrder = async (id, params) => {
  console.log("params, id", params, id)
  const result = await writeDB.query(`UPDATE orders SET ? where id= ? `, params, id);
  return result;
}

const deleteOrder = async (id) => {
  const result = await writeDB.query(`DELETE FROM orders WHERE id=? `, id);
  return result;
};


module.exports = { getOrder, getOrderDetail, addOrder, updateOrder, deleteOrder }