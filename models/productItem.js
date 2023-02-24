

const getProductItem = async (filter) => {

    let condition = ' Where 1=1 ';
    let val = [];
    if (filter.product_id) {
        condition += ' and pi.product_id = ?';
        val.push(filter.product_id);
    }
    if (filter.product_item_id) {
        condition += ' and pi.id = ?';
        val.push(filter.product_item_id);
    }

    console.log(condition, val)
    const [result] = await readDB.query(`SELECT * FROM product_item pi ${condition}`, val);
    return result;
};

const getProductItemWithProductDetail = async (index, offset, filter) => {

    let condition = ' WHERE 1=1 ';
    let val = []
    if (Number(filter.id)) {
        condition += " and p.id = ? ";
        val.push(filter.id);
    }
    if (Number(filter.shop_id)) {
        condition += " and p.shop_id = ? ";
        val.push(filter.shop_id);
    }
    if (Number(filter.type_id)) {
        condition += ` and p.type_id = ? `;
        val.push(filter.type_id);
    }
    if (Number(filter.category_id)) {
        condition += " and p.category_id = ? ";
        val.push(filter.category_id);
    }
    if ((filter.textSearch)) {
        condition += ` and ( p.title like '%${filter.textSearch}%' OR p.discription like '%${filter.textSearch}%' ) `;
        // val.push(filter.category_id);
    }

    val.push(index);
    val.push(offset);
    console.log("condition", condition);
    console.log("condition", val);

    const [result] = await readDB.query(`SELECT p.id as product_id,  p.shop_id,  p.type_id,  p.category_id,  p.sub_category_id,  p.title,  p.discription,  p.bought,  p.shipping,  p.rating,  p.rating_count,  p.buyer_guarantee,  p.sponsored,  p.likes,  p.dislikes,  p.active,  p.create_at,  p.update_at,  p.icon_image,
    pi.id as product_item_id,  pi.product_id,  pi.sku,  pi.size,  pi.color,  pi.stock,  pi.price,  pi.discount,  pi.tax,  pi.offer,  pi.description,  pi.image1,  pi.image2,  pi.image3,  pi.image4,  pi.is_active, pi.min_quantity ,
    b.name brand
     FROM product_item pi join product p on pi.product_id = p.id
     left join brand b on b.id = p.brand_id ${condition}
     LIMIT ? , ?;`, val);
    console.log("result", result);

    return result;
};

const addProductItem = async (params) => {
    const [result] = await writeDB.query(`INSERT INTO product_item SET ?   `, params);
    return result;
}

const updateProductItem = async (id, params) => {
    const [result] = await writeDB.query(`UPDATE product_item SET   ? where id= ? `, params, id);
    return result;
}

const deleteProductItem = async (id) => {
    const [result] = await writeDB.query(`DELETE FROM product_item WHERE id=? `, id);
    return result;
};


module.exports = { getProductItem, getProductItemWithProductDetail, addProductItem, updateProductItem, deleteProductItem }