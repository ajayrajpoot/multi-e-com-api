

const getOrderItem = async () => {
    let result = await readDB.query(`SELECT * FROM order_item  `);
    return result;
};

const addOrderItem = async (params) => { 
        const result = await writeDB.query(`INSERT INTO order_item SET ? `, params);
        return result; 
}

const updateOrderItem = async (id, params) => {
    const result = await writeDB.query(`UPDATE order_item SET ? where id= ? `, params, id);
    return result;
}

const deleteOrderItem = async (id) => {
    const result = await writeDB.query(`DELETE FROM order_item WHERE id = ? `, id);
    return result;
};


module.exports = { getOrderItem, addOrderItem, updateOrderItem, deleteOrderItem }