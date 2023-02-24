

const getCart = async (buyer_id) => {
    const [result] = await readDB.query(`
    SELECT p.id as product_id,  p.shop_id,  p.type_id,  p.category_id,  p.sub_category_id,  p.title,  p.discription, p.bought,  p.shipping,  p.rating,  p.rating_count,  p.buyer_guarantee,  p.sponsored,  p.likes,  p.dislikes,  p.active,  p.create_at,  p.update_at,  p.icon_image,
    pi.id as product_item_id,  pi.product_id,  pi.sku,  pi.size,  pi.color,  pi.stock,  pi.price,  pi.discount,  pi.tax,  pi.offer,  pi.description,  pi.image1,  pi.image2,  pi.image3,  pi.image4,  pi.is_active, pi.min_quantity ,
    c.quantity, c.address_id
    FROM product_item pi 
    join product p on pi.product_id = p.id
    join cart c on c.product_id = p.id 
    Where c.buyer_id = ? `, [buyer_id]);
    return result;
};

const addCart = async (params) => {
    const [result] = await writeDB.query(`INSERT INTO cart SET ?   `, params);
    return result;
}

const updateCart = async (id, params) => {
    const [result] = await writeDB.query(`UPDATE cart SET   ? where id= ? `, params, id);
    return result;
}

const deleteCart = async (buyerId, id) => {
            let condition = 'WHERE 1=1 ';
            let val = [];
            if (buyerId) {
                condition += ' and buyer_id = ? ';
                val.push(buyerId);
            }
            if (id) {
                condition += ' and id = ? '
                val.push(id);

            }

    const [result] = await writeDB.query(`DELETE FROM cart WHERE ${condition} `, condition);
    return result;
};


module.exports = { getCart, addCart, updateCart, deleteCart }