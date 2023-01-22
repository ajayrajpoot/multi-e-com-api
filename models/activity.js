

const getActivity = async () => {
    let result = await readDB.query(`SELECT * FROM activity  `);
    return result;
};

const addActivity = async (params) => {
    const result = await writeDB.query(`INSERT INTO activity SET ?   `, params);
    return result;
}

const updateActivity = async (id, params) => {
    const result = await writeDB.query(`UPDATE activity SET   ? where id= ? `, params, id);
    return result;
}

const deleteActivity = async (id) => {
    const result = await writeDB.query(`DELETE FROM activity WHERE id=? `, id);
    return result;
};


module.exports = { getActivity, addActivity, updateActivity, deleteActivity }