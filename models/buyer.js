

const getBuyer = async () => {
    let result = await readDB.query(`SELECT * FROM buyer  `);
    return result;
};

const addBuyer = async (params) => {
    const result = await writeDB.query(`INSERT INTO buyer SET ?   `, params);
    return result;
}

const updateBuyer = async (id, params) => {
    const result = await writeDB.query(`UPDATE buyer SET   ? where id= ? `, params, id);
    return result;
}

const deleteBuyer = async (id) => {
    const result = await writeDB.query(`DELETE FROM buyer WHERE id=? `, id);
    return result;
};


module.exports = { getBuyer, addBuyer, updateBuyer, deleteBuyer }