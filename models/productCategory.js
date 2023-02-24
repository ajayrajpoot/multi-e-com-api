

const getProductCategory = async (filter) => {

    let condition = ' WHERE 1=1 ';
    let val = []
    if (Number(filter.id)) {
        condition += "and id = ?";
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
    console.log("....>", condition, val)
    const [result] = await readDB.query(`SELECT * FROM product_category  ${condition}`, [val]);
    return result;
};

const addProductCategory = async (params) => {
    const [result] = await writeDB.query(`INSERT INTO product_category SET ?   `, params);
    return result;
}

const updateProductCategory = async (id, params) => {
    const [result] = await writeDB.query(`UPDATE product_category SET   ? where id= ? `, params, id);
    return result;
}

const deleteProductCategory = async (id) => {
    const [result] = await writeDB.query(`DELETE FROM product_category WHERE id=? `, id);
    return result;
};


module.exports = { getProductCategory, addProductCategory, updateProductCategory, deleteProductCategory }