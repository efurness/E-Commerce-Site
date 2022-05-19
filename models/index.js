// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Products.belongsTo(Category, {
  
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'Product'



});

// Categories have many Products
Product.belongsToMany(Category, {

  through: {
    model:Product,
    unique: false
  },
as: 'product_categories'

});

// Products belongToMany Tags (through ProductTag)
Products.belongsToMany(Tag, {

  through: {
    model: ProductTag,
    unique: false
  },

  as: 'product_productaTag'

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
