

const getVendors = async (id) => {
    let condition = '';
    if (Number(id)) {
        condition = 'where id = ?'
    }
    console.log("condition", condition)
    let result = await readDB.query(`SELECT * FROM vendors ${condition} `, [id]);
    return result;
};

const addVendors = async (params) => {
    const result = await writeDB.query(`INSERT INTO vendors SET ?   `, params);
    return result;
}

const updateVendors = async (id, params) => {
    const result = await writeDB.query(`UPDATE vendors SET   ? where id= ? `, params, id);
    return result;
}

const deleteVendors = async (id) => {
    const result = await writeDB.query(`DELETE FROM vendors WHERE id=? `, id);
    return result;
};


module.exports = { getVendors, addVendors, updateVendors, deleteVendors }