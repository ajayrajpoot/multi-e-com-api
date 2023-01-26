

const getProductItem = async (filter) => {
    
    let condition = ' Where 1=1 ';
    let val = [];
    if (filter.product_id) {
        condition += ' and pi.product_id = ?';
        val.push(filter.product_id);
    }
    if (filter.product_item_id) {
        condition += ' and pi.id = ?';
        val.push(filter.product_item_id);
    }

    console.log(condition, val)
    let result = await readDB.query(`SELECT * FROM product_item pi ${condition}`, val);
    return result;
};

const addProductItem = async (params) => {
    const result = await writeDB.query(`INSERT INTO product_item SET ?   `, params);
    return result;
}

const updateProductItem = async (id, params) => {
    const result = await writeDB.query(`UPDATE product_item SET   ? where id= ? `, params, id);
    return result;
}

const deleteProductItem = async (id) => {
    const result = await writeDB.query(`DELETE FROM product_item WHERE id=? `, id);
    return result;
};


module.exports = { getProductItem, addProductItem, updateProductItem, deleteProductItem }