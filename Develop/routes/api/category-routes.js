const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// display all category
router.get("/", async (req, res) => {
  try {
    const CategoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// display single category by id
router.get("/:id", async (req, res) => {
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// create a new category
router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCate = await Category.create(req.body);
    res.status(200).json(newCate);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update category based on id.
router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: "no category with this id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a category
router.delete("/:id", (req, res) => {
  try {
    const deleteCat = Category.destroy({ where: { id: req.params.id } });
    if (!deleteCat) {
      res.status(404).json({ message: "no user with this ID " });
      return;
    }
    res.status(200).json(deleteCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
