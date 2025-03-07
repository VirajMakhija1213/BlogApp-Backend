const Post=require("../models/postModel");
const Comment=require("../models/commentModel");

//Business logic
exports.createComment=async(req,res)=>{
    try{
        const {post,user,body}=req.body;
        //Create an object
        const comment=new Comment({
            post,user,body
        });
        const savedComment=await comment.save();
        //Find the post by id and update the post data
        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new:true })
            .populate("comments").exec();
        res.json({
            post:updatedPost
        });
    }
    catch(err)
    {
        return res.status(500).json({
            error:"Error While Creating Comment"
        })
    }
}