const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data

router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
      order: [["id", "ASC"]],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(error);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data

router.get("/:id", async (req, res) => {
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(singleTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// {
//   tag_name: "red",
// }

//create a tag

router.post("/", async (req, res) => {
  try {
    const creaTag = await Tag.create(req.body);
    res.status(200).json(creaTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag

router.put("/:id", async (req, res) => {
  try {
    const upTag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (!upTag[0]) {
      res.status(404).json({ message: "there's no tag with this id" });
      return;
    }
    res.status(200).json(upTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete a tag

router.delete("/:id", async (req, res) => {
  try {
    const delTag = await Tag.destroy({ where: { id: req.params.id } });
    if (delTag[0]) {
      res.status(404).json({ message: " there's no tag with this id" });
      return;
    }
    res.status(200).json(delTag);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
