// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'product_categories'


});
// Categories have many Products
Category.hasMany(Product), {
  foreignKey: 'categoryId'

};



Product.belongsToMany(Category, {

  through: {
    model:Product,
    unique: false
  },
as: 'product_categories'

});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {

  through: {
    model: ProductTag,
    unique: false
  },

  as: 'product_tag'

});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'tag_products'

});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
