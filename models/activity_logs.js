

const getActivityLogs = async () => {
    let result = await readDB.query(`SELECT * FROM activity_logs  `);
    return result;
};

const addActivityLogs = async (params) => {
    const result = await writeDB.query(`INSERT INTO activity_logs SET ?   `, params);
    return result;
}

const updateActivityLogs = async (id, params) => {
    const result = await writeDB.query(`UPDATE activity_logs SET   ? where id= ? `, params, id);
    return result;
}

const deleteActivityLogs = async (id) => {
    const result = await writeDB.query(`DELETE FROM activity_logs WHERE id=? `, id);
    return result;
};


module.exports = { getActivityLogs, addActivityLogs, updateActivityLogs, deleteActivityLogs }