import {Permission} from "node-appwrite"

import {db,answerColletion} from '../name'
import { databases } from "./config"


export default async function createQuestionsColletion() {
    
    await databases.createCollection(db,answerColletion,
        answerColletion,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ]
    )
    console.log("Answer colletion created.");
    
    await Promise.all([
        databases.createStringAttribute(db,answerColletion,"content",10000,true),
        databases.createStringAttribute(db,answerColletion,"questionId",50,true),
        databases.createStringAttribute(db,answerColletion,"authorId",50,true),
    ])
    

    console.log("Answer attribute created.");

}
