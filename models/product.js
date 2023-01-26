

const getProduct = async (filter) => {

    let condition = ' WHERE 1=1 ';
    let val = []
    if (Number(filter.id)) {
        condition += " and id = ?";
        val.push(filter.id);
    }
    if (Number(filter.type_id)) {
        condition += " and type_id = ?";
        val.push(filter.type_id);
    }
    if (Number(filter.shop_id)) {
        condition += " and shop_id = ?";
        val.push(filter.shop_id);
    }
    if (Number(filter.category_id)) {
        condition += " and category_id = ?";
        val.push(filter.category_id);
    }

    let result = await readDB.query(`SELECT * FROM product ${condition}`, val);
    return result;
};

const addProduct = async (params) => {
    const result = await writeDB.query(`INSERT INTO product SET ?   `, params);
    return result;
}

const updateProduct = async (id, params) => {
    const result = await writeDB.query(`UPDATE product SET   ? where id= ? `, params, id);
    return result;
}

const deleteProduct = async (id) => {
    const result = await writeDB.query(`DELETE FROM product WHERE id=? `, id);
    return result;
};


module.exports = { getProduct, addProduct, updateProduct, deleteProduct }