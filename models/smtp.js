

const getSmtp = async () => {
    let result = await readDB.query(`SELECT * FROM smtp  `);
    return result;
};

const addSmtp = async (params) => {
    const result = await writeDB.query(`INSERT INTO smtp SET ?   `, params);
    return result;
}

const updateSmtp = async (id, params) => {
    const result = await writeDB.query(`UPDATE smtp SET   ? where id= ? `, params, id);
    return result;
}

const deleteSmtp = async (id) => {
    const result = await writeDB.query(`DELETE FROM smtp WHERE id=? `, id);
    return result;
};


module.exports = { getSmtp, addSmtp, updateSmtp, deleteSmtp }