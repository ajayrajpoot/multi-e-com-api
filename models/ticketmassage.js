

const getTicketmassage = async (id) => {
    let condition = '';
    if (Number(id)) {
        condition = 'where id = ?'
    }
    console.log("condition", condition)
    const [result] = await readDB.query(`SELECT * FROM ticketmassage ${condition} `, [id]);
    return result;
};

const addTicketmassage = async (params) => {
    const [result] = await writeDB.query(`INSERT INTO ticketmassage SET ?   `, params);
    return result;
}

const updateTicketmassage = async (id, params) => {
    const [result] = await writeDB.query(`UPDATE ticketmassage SET   ? where id= ? `, params, id);
    return result;
}

const deleteTicketmassage = async (id) => {
    const [result] = await writeDB.query(`DELETE FROM ticketmassage WHERE id=? `, id);
    return result;
};


module.exports = { getTicketmassage, addTicketmassage, updateTicketmassage, deleteTicketmassage }