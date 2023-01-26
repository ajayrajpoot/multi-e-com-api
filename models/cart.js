

const getCart = async (buyer_id) => {
    let result = await readDB.query(`SELECT * FROM cart Where buyer_id = ? `, [buyer_id]);
    return result;
};

const addCart = async (params) => {
    const result = await writeDB.query(`INSERT INTO cart SET ?   `, params);
    return result;
}

const updateCart = async (id, params) => {
    const result = await writeDB.query(`UPDATE cart SET   ? where id= ? `, params, id);
    return result;
}

const deleteCart = async (buyerId, id) => {
    let condition = 'WHERE 1=1 ';
    let val = [];
    if (buyerId) {
        condition += ' and buyer_id = ? ';
        val.push(buyerId);
    }
    if (id) {
        condition += ' and id = ? '
        val.push(id);

    }

    const result = await writeDB.query(`DELETE FROM cart WHERE ${condition} `, condition);
    return result;
};


module.exports = { getCart, addCart, updateCart, deleteCart }