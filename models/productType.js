

const getProductTypes = async (id, shop_id) => {
    let condition = ' WHERE 1=1 ';
    let val = []
    if (Number(id)) {
        condition += "and id = ?";
        val.push(id);
    }
    if (Number(shop_id)) {
        condition += " and shop_id = ?";
        val.push(shop_id);
    }

    let result = await readDB.query(`SELECT * FROM product_types  ${condition}`, [val]);
    return result;
};

const addProductTypes = async (params) => {
    const result = await writeDB.query(`INSERT INTO product_types SET ?   `, params);
    return result;
}

const updateProductTypes = async (id, params) => {
    const result = await writeDB.query(`UPDATE product_types SET   ? where id= ? `, params, id);
    return result;
}

const deleteProductTypes = async (id) => {
    const result = await writeDB.query(`DELETE FROM product_types WHERE id=? `, id);
    return result;
};


module.exports = { getProductTypes, addProductTypes, updateProductTypes, deleteProductTypes }