import React from "react";
import appWriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
    return (
        
            <Link to={`/posts/${$id}`} className="flex flex-col gap-2 bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <img src={appWriteService.getPriview(featuredImage)} alt={title} className="rounded-xl" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                        {title}
                    </h2>
                </div>
            </Link>
    )
}


export default PostCard;