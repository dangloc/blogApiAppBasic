const router = require("express").Router();
const Category = require("../Models/Category");

router.post("/", async (req, res) => {
    const newCat = new Category(req.body);
    try{
        const saveCat = await newCat.save();
        res.status(200).json(saveCat);
    }catch(err){
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    const idCat = await Category.findById(req.params.id);
    if(idCat){
        try{
            await Category.findByIdAndDelete(req.params.id);
            res.status(200).json("Xóa thành công!");
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(500).json("Danh mục không tồn tại!");
    }
});

router.get("/", async (req, res) => {
    try{
        const cats = await Category.find();
        res.status(200).json(cats);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
