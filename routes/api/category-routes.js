const router = require('express').Router();
const { Category, Product, ProductTag, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  });
  // find all categories
  // be sure to include its associated Products

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(res.params.id
      
      
      
    //   {
    //   include: [{ model: Product, through: Tag, as: 'category_products '}]

    // }
    
    );
    if (!categoryData) {
      res.status(404).json({ message: 'no product found with this id! '});
      return;
    }
  
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      // find all associated tags from categoryProducts
      return ProductTag.findAll({ where: { category_id: req.params.id } });
    })
    .then((categoryProducts) => {
      // get list of current product_ids
      const categoryProductsIds = categoryProducts.map(({ tag_id }) => tag_id);
      // create filtered list of new product_ids
      const newcategoryProducts = req.body.productIds
        .filter((product_id) => !categoryProductsIds.includes(product_id))
        .map((product_id) => {
          return {
            category_id: req.params.id,
            product_id,
          };
        });
      // figure out which ones to remove
      const categoryProductsToRemove = categoryProducts
        .filter(({ product_id }) => !req.body.productIds.includes(product_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        categoryProducts.destroy({ where: { id: categoryProductsToRemove } }),
        categoryProducts.bulkCreate(newcategoryProducts),
      ]);
    })
    .then((updatedcategoryProducts) => res.json(updatedcategoryProducts))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
    
});

module.exports = router;
