const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const findData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!findData) {
      res.status(404).json({ message: 'No driver found with that id!' });
      return;
    }

    res.status(200).json(findData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  // create a new category
  Tag.create(req.body)
    .then((newData) => {
      // Send the newly created row as a JSON object
      res.json(newData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    req.body,
    {
      // Gets a tag based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedData) => {
      res.json(updatedData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedData) => {
      res.json(deletedData);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
