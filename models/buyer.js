

const getBuyer = async (param) => {
    let condition = 'WHERE 1=1 ';
    let val = [];
    if (param.email) {
        condition += ' and email = ? ';
        val.push(param.email);
    }
    if (param.id) {
        condition += ' and id = ? ';
        val.push(param.id);

    }
    if (param.vcode) {
        condition += ' and vcode = ? ';
        val.push(param.vcode);
    }

    console.log("condition", condition)
    console.log("condition", param)
    const [result] = await readDB.query(`SELECT * FROM buyer ${condition} `, val);
    return result;
};

const addBuyer = async (params) => {
    const [result] = await writeDB.query(`INSERT INTO buyer SET ?   `, params);
    return result;
}

const updateBuyer = async (id, params) => {
    const [result] = await writeDB.query(`UPDATE buyer SET   ? where id= ? `, params, id);
    return result;
}

const deleteBuyer = async (id) => {
    const [result] = await writeDB.query(`DELETE FROM buyer WHERE id=? `, id);
    return result;
};


module.exports = { getBuyer, addBuyer, updateBuyer, deleteBuyer }