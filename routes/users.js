const router = require('express').Router();
const { response } = require('express');
const User = require("../Models/User");
const Post = require("../Models/Post");
const bcrypt = require('bcrypt');

//update
router.put("/:id", async (req, res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new:true});
            res.status(200).json(updatedUser);
        } catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("Bạn chỉ có thể cập nhật tài khoản của bạn");
    }
});

//delete
router.delete("/:id", async (req, res)=>{
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id);
            try{
                await Post.deleteMany({username: user.username});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Xóa thành công");
            } catch(err){
                res.status(500).json(err);
            }
            
        }catch(err){
            res.status(404).json("Người dùng không tồn tại");
        }
    }else{
        res.status(401).json("Bạn chỉ có thể xóa tài khoản của bạn");
    }
});

//get
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, ...other} = user._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router