import {Permission} from "node-appwrite"

import {db,questionColletion} from '../name'
import { databases } from "./config"


export default async function createQuestionsColletion() {
    
    await databases.createCollection(db,questionColletion,
        questionColletion,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ]
    )
    console.log("Question colletion created.");
    
    await Promise.all([
        databases.createStringAttribute(db,questionColletion,"title",100,true),
        databases.createStringAttribute(db,questionColletion,"content",10000,true),
        databases.createStringAttribute(db,questionColletion,"authorId",50,true),
        databases.createStringAttribute(db,questionColletion,"tags",50,true,undefined,true),
        databases.createStringAttribute(db,questionColletion,"attachmentId",50,false),
    ])
    
    console.log("Question attribute created.");


}
