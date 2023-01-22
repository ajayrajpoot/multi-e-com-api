

const getVendorShops = async (id) => {
    let condition = '';
    if (Number(id)) {
        condition = 'where id = ?'
    }
    // console.log(condition, id)
    let result = await readDB.query(`SELECT * FROM vendor_shops ${condition} `,[id]);
    return result;
};

const addVendorShops = async (params) => {
    const result = await writeDB.query(`INSERT INTO vendor_shops SET ?   `, params);
    return result;
}

const updateVendorShops = async (id, params) => {
    const result = await writeDB.query(`UPDATE vendor_shops SET   ? where id= ? `, params, id);
    return result;
}

const deleteVendorShops = async (id) => {
    const result = await writeDB.query(`DELETE FROM vendor_shops WHERE id=? `, id);
    return result;
};


module.exports = { getVendorShops, addVendorShops, updateVendorShops, deleteVendorShops }