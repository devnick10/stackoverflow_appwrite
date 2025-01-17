import {Permission} from "node-appwrite"

import {db,voteColletion} from '../name'
import { databases } from "./config"


export default async function createQuestionsColletion() {
    
    await databases.createCollection(db,voteColletion,
        voteColletion,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ]
    )
    console.log("Vote colletion created.");
    
    await Promise.all([
        databases.createEnumAttribute(db,voteColletion,"type",["question","answer"],true),
        databases.createStringAttribute(db,voteColletion,"typeId",50,true),
        databases.createEnumAttribute(db,voteColletion,"voteStatus",["upvoted","downvoted"],true),
        databases.createStringAttribute(db,voteColletion,"voteById",50,true),
    ])
    
    console.log("Vote attribute created.");


}
