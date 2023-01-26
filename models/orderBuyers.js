

const getOrderBuyers = async (orderID) => {
    let result = await readDB.query(`SELECT * FROM order_buyers WHERE order_id = ? `, [orderID]);
    return result;
};

const addOrderBuyers = async (params) => {
    const result = await writeDB.query(`INSERT INTO order_buyers SET ? `, params);
    return result;
}

const updateOrderBuyers = async (id, params) => {
    const result = await writeDB.query(`UPDATE order_buyers SET   ? where id= ? `, params, id);
    return result;
}

const deleteOrderBuyers = async (id) => {
    const result = await writeDB.query(`DELETE FROM order_buyers WHERE id=? `, id);
    return result;
};


module.exports = { getOrderBuyers, addOrderBuyers, updateOrderBuyers, deleteOrderBuyers }