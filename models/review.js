

const getReview = async () => {
    let result = await readDB.query(`SELECT * FROM review  `);
    return result;
};

const addReview = async (params) => {
    const result = await writeDB.query(`INSERT INTO review SET ?   `, params);
    return result;
}

const updateReview = async (id, params) => {
    const result = await writeDB.query(`UPDATE review SET   ? where id= ? `, params, id);
    return result;
}

const deleteReview = async (id) => {
    const result = await writeDB.query(`DELETE FROM review WHERE id=? `, id);
    return result;
};


module.exports = { getReview, addReview, updateReview, deleteReview }