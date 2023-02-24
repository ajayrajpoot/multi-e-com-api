

const getOrderBilling = async (orderId) => {
    const [result] = await readDB.query(`SELECT * FROM order_billing Where order_id = ?  `, [orderId]);
    return result;
};

const addOrderBilling = async (params) => {
    const [result] = await writeDB.query(`INSERT INTO order_billing SET ?   `, params);
    return result;
}

const updateOrderBilling = async (id, params) => {
    const [result] = await writeDB.query(`UPDATE order_billing SET   ? where id= ? `, params, id);
    return result;
}

const deleteOrderBilling = async (id) => {
    const [result] = await writeDB.query(`DELETE FROM order_billing WHERE id=? `, id);
    return result;
};


module.exports = { getOrderBilling, addOrderBilling, updateOrderBilling, deleteOrderBilling }