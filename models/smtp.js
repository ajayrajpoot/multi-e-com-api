

const getSmtp = async (par) => {
    let condition = ' WHERE 1=1 ';
    let val = [];
    if (par.id) {
        condition += ' AND id = ?'
        val.push(par.id);
    }
    if (par.is_primary) {
        condition += ' AND is_primary = ?'
        val.push(par.is_primary);
    }
    console.log("condition",condition)
    const [result] = await readDB.query(`SELECT * FROM smtp  ${condition} `, val);
    return result;
};

const addSmtp = async (params) => {
    const [result] = await writeDB.query(`INSERT INTO smtp SET ?   `, params);
    return result;
}

const updateSmtp = async (id, params) => {
    const [result] = await writeDB.query(`UPDATE smtp SET   ? where id= ? `, params, id);
    return result;
}
const markPrimary = async (id) => {

    await writeDB.query(`UPDATE smtp SET ? `, { is_primary: 0 });
    const [result] = await writeDB.query(` UPDATE smtp SET   ? where id= ? `, { is_primary: 1 }, id);
    return result;
}

const deleteSmtp = async (id) => {
    const [result] = await writeDB.query(`DELETE FROM smtp WHERE id=? `, id);
    return result;
};


module.exports = { markPrimary, getSmtp, addSmtp, updateSmtp, deleteSmtp }