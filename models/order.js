

const getOrder = async () => {
  let result = await readDB.query(`SELECT * FROM order  `);
  return result;
};

const addOrder = async (params) => {
  const result = await writeDB.query(`INSERT INTO order SET ?   `, params);
  return result;
}

const updateOrder = async (id, params) => {
  const result = await writeDB.query(`UPDATE order SET   ? where id= ? `, params, id);
  return result;
}

const deleteOrder = async (id) => {
  const result = await writeDB.query(`DELETE FROM order WHERE id=? `, id);
  return result;
};


module.exports = { getOrder, addOrder, updateOrder, deleteOrder }