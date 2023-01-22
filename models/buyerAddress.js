

const getBuyerAddress = async () => {
    let result = await readDB.query(`SELECT * FROM buyer_address  `);
    return result;
};

const addBuyerAddress = async (params) => {
    const result = await writeDB.query(`INSERT INTO buyer_address SET ?   `, params);
    return result;
}

const updateBuyerAddress = async (id, params) => {
    const result = await writeDB.query(`UPDATE buyer_address SET   ? where id= ? `, params, id);
    return result;
}

const deleteBuyerAddress = async (id) => {
    const result = await writeDB.query(`DELETE FROM buyer_address WHERE id=? `, id);
    return result;
};


module.exports = { getBuyerAddress, addBuyerAddress, updateBuyerAddress, deleteBuyerAddress }