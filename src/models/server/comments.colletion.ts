import {Permission} from "node-appwrite"

import {db,commentsColletion} from '../name'
import { databases } from "./config"


export default async function createQuestionsColletion() {
    
    await databases.createCollection(db,commentsColletion,
        commentsColletion,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ]
    )
    console.log("Comment colletion created.");
    
    await Promise.all([
        databases.createStringAttribute(db,commentsColletion,"content",10000,true),
        databases.createEnumAttribute(db,commentsColletion,"type",["answer","question"],true),
        databases.createStringAttribute(db,commentsColletion,"authorId",50,true),
        databases.createStringAttribute(db,commentsColletion,"typeId",50,true),
    ])
    

    console.log("Comment attribute created.");

}
