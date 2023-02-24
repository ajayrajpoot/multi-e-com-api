

const getProductSubCategory = async (filter) => {

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

    const [result] = await readDB.query(`SELECT * FROM product_sub_category ${condition}  `, val);
    return result;
};

const addProductSubCategory = async (params) => {
    const [result] = await writeDB.query(`INSERT INTO product_sub_category SET ?   `, params);
    return result;
}

const updateProductSubCategory = async (id, params) => {
    const [result] = await writeDB.query(`UPDATE product_sub_category SET   ? where id= ? `, params, id);
    return result;
}

const deleteProductSubCategory = async (id) => {
    const [result] = await writeDB.query(`DELETE FROM product_sub_category WHERE id=? `, id);
    return result;
};


module.exports = { getProductSubCategory, addProductSubCategory, updateProductSubCategory, deleteProductSubCategory }