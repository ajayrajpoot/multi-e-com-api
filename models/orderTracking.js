

const getOrderTracking = async () => {
    const [result] = await readDB.query(`SELECT * FROM order_tracking  `);
    return result;
};

const addOrderTracking = async (params) => {
    const [result] = await writeDB.query(`INSERT INTO order_tracking SET ?   `, params);
    return result;
}

const updateOrderTracking = async (id, params) => {
    const [result] = await writeDB.query(`UPDATE order_tracking SET   ? where id= ? `, params, id);
    return result;
}

const deleteOrderTracking = async (id) => {
    const [result] = await writeDB.query(`DELETE FROM order_tracking WHERE id=? `, id);
    return result;
};


module.exports = { getOrderTracking, addOrderTracking, updateOrderTracking, deleteOrderTracking }