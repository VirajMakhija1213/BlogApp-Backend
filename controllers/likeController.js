//Import Modules
const Post=require("../models/postModel");
const Like=require("../models/likeModel");

exports.likePost=async(req,res)=>{
    try{
        const {post,user}=req.body;
        const like=new Like({
            post,user
        });
        const savedLike=await like.save();
        //Update the post collection
        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true});
        res.json({
            post:updatedPost
        })
    }
    catch(error){
        res.status(500).json({
            error:"Error while liking the post"
        })
    }
}
exports.unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body;

        // Find and delete the like
        const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

        // If the like is not found, return an error response
        if (!deletedLike) {
            return res.status(404).json({ error: "Like not found" });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $pull: { likes: like } }, 
            { new: true }
        );

        res.status(200).json({
            post: updatedPost
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error while unliking the post"
        });
    }
};
