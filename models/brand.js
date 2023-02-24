

const getBrand = async (param) => {
    
    const [result] = await readDB.query(`SELECT * FROM brand  ` );
    return result;
};

const addBrand = async (params) => {
    const [result] = await writeDB.query(`INSERT INTO brand SET ?   `, params);
    return result;
}

const updateBrand = async (id, params) => {
    const [result] = await writeDB.query(`UPDATE brand SET   ? where id= ? `, params, id);
    return result;
}

const deleteBrand = async (id) => {
    const [result] = await writeDB.query(`DELETE FROM brand WHERE id=? `, id);
    return result;
};


module.exports = { getBrand, addBrand, updateBrand, deleteBrand }