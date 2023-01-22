

const getTrackingEvent = async (id) => {
    let condition = '';

    if (id) {
        condition = 'Where id = ? ';
    }

    let result = await readDB.query(`SELECT * FROM tracking_event ${condition} `, [id]);
    return result;
};

const addTrackingEvent = async (params) => {
    const result = await writeDB.query(`INSERT INTO tracking_event SET ?   `, params);
    return result;
}

const updateTrackingEvent = async (id, params) => {
    const result = await writeDB.query(`UPDATE tracking_event SET   ? where id= ? `, params, id);
    return result;
}

const deleteTrackingEvent = async (id) => {
    const result = await writeDB.query(`DELETE FROM tracking_event WHERE id=? `, id);
    return result;
};


module.exports = { getTrackingEvent, addTrackingEvent, updateTrackingEvent, deleteTrackingEvent }