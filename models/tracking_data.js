

const getTrackingData = async () => {
    let result = await readDB.query(`SELECT * FROM tracking_data  `);
    return result;
};

const addTrackingData = async (params) => {
    const result = await writeDB.query(`INSERT INTO tracking_data SET ?   `, params);
    return result;
}

const updateTrackingData = async (id, params) => {
    const result = await writeDB.query(`UPDATE tracking_data SET   ? where id= ? `, params, id);
    return result;
}

const deleteTrackingData = async (id) => {
    const result = await writeDB.query(`DELETE FROM tracking_data WHERE id=? `, id);
    return result;
};


module.exports = { getTrackingData, addTrackingData, updateTrackingData, deleteTrackingData }