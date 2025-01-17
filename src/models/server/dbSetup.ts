import { db } from "../name";

import creatQuestionColletion from "./question.colletion";
import creatAnswerColletion from "./answer.colletion";
import createCommentColletion from "./comments.colletion";
import createVoteColletion from "./vote.colletion";

import { databases } from "./config";

export default async function getOrCreateDB() {
  try {

    await databases.get(db);
    console.log("Database connected.");

  } catch (error) {

    console.log('Creating database and colletion.',error);
      
    try {

      await databases.create(db, db);
      console.log("Database created.");

      // create collections
      await Promise.all([
        creatQuestionColletion(),
        creatAnswerColletion(),
        createCommentColletion(),
        createVoteColletion(),
      ]);
        console.log("Colletion created.");
        console.log("Database connected.");
        
    } catch (error) {
         console.log("Error creating database or colletions.",error);

         
    }
  }
  return databases;
}
