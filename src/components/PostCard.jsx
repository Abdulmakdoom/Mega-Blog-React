import React from "react";
import appwriteService from "../appwrite/conf";
import {Link} from 'react-router-dom'
 
function PostCard ({$id, title, featuredImage}) { // yaha agr value destructure lene ka liye humy destructure krkay bajhna padega phale. 
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}  // featuredImage id bajh rahy hai
                className='rounded-xl' />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard;