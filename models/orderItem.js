

const getOrderItem = async (filter) => {

    let condition = ' WHERE 1=1 ';
    let val = []
    if (Number(filter.id)) {
        condition += " and id = ?";
        val.push(filter.id);
    }
    if (Number(filter.order_id)) {
        condition += " and order_id = ?";
        val.push(filter.order_id);
    }
    if (Number(filter.product_item_id)) {
        condition += " and product_item_id = ?";
        val.push(filter.product_item_id);
    }
     

    const [result] = await readDB.query(`SELECT * FROM order_item  ${condition} `, val);
    return result;
};

const addOrderItem = async (params) => {
    const [result] = await writeDB.query(`INSERT INTO order_item SET ? `, params);
    return result;
}

const updateOrderItem = async (id, params) => {
    const [result] = await writeDB.query(`UPDATE order_item SET ? where id= ? `, params, id);
    return result;
}

const deleteOrderItem = async (id) => {
    const [result] = await writeDB.query(`DELETE FROM order_item WHERE id = ? `, id);
    return result;
};


module.exports = { getOrderItem, addOrderItem, updateOrderItem, deleteOrderItem }