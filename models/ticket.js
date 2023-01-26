

const getTicket = async (id) => {
    let condition = '';
    if (Number(id)) {
        condition = 'where id = ?'
    }
    console.log("condition", condition)
    let result = await readDB.query(`SELECT * FROM ticket ${condition} `, [id]);
    return result;
};

const addTicket = async (params) => {
    const result = await writeDB.query(`INSERT INTO ticket SET ?   `, params);
    return result;
}

const updateTicket = async (id, params) => {
    const result = await writeDB.query(`UPDATE ticket SET   ? where id= ? `, params, id);
    return result;
}

const deleteTicket = async (id) => {
    const result = await writeDB.query(`DELETE FROM ticket WHERE id=? `, id);
    return result;
};


module.exports = { getTicket, addTicket, updateTicket, deleteTicket }