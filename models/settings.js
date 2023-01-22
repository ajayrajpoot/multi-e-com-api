

const getSettings = async () => {
    let result = await readDB.query(`SELECT * FROM settings  `);
    return result;
};

const addSettings = async (params) => {
    const result = await writeDB.query(`INSERT INTO settings SET ?   `, params);
    return result;
}

const updateSettings = async (id, params) => {
    const result = await writeDB.query(`UPDATE settings SET   ? where id= ? `, params, id);
    return result;
}

const deleteSettings = async (id) => {
    const result = await writeDB.query(`DELETE FROM settings WHERE id=? `, id);
    return result;
};


module.exports = { getSettings, addSettings, updateSettings, deleteSettings }