import { answerColletion, db, questionColletion, voteColletion } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { Query } from "appwrite";
import { NextRequest,NextResponse } from "next/server";
import { ID } from "node-appwrite";




export async function POST(req: NextRequest) {

 try {
   
   const {votedById,typeId,type,voteStatus} = await req.json();
        
    const response = await databases.listDocuments(db,voteColletion,[
       Query.equal("type",type),
       Query.equal("typeId",typeId),
       Query.equal("votedById",votedById),
    ])
   
    if (response.documents.length > 0) {

       await databases.deleteDocument(db,voteColletion,response.documents[0].$id);

       const QuestionOrAnswer = await databases.getDocument(db,type=="question"?questionColletion:answerColletion,typeId);



       const authorPref = await users.getPrefs<UserPrefs>(QuestionOrAnswer.authorId)

        await users.updatePrefs<UserPrefs>(
         QuestionOrAnswer.authorId,
         {
           reputation:response.documents[0].voteStatus === "upvoted" ? Number(authorPref.  reputation) - 1 : Number(authorPref.reputation) + 1
         }
        )
       
    }

    if(response.documents[0]?.voteStatus !== voteStatus){

        const doc = await databases.createDocument(db,voteColletion,ID.unique(),
            {
                type,
                typeId,
                voteStatus,
                votedById
            }
        )

        const QuestionOrAnswer = await databases.getDocument(db,type=="question"?questionColletion:answerColletion,typeId);



        const authorPref = await users.getPrefs<UserPrefs>(QuestionOrAnswer.authorId)
 
        if (response.documents[0]) {
            await users.updatePrefs<UserPrefs>(QuestionOrAnswer.authorId,
                {
                    reputation:response.documents[0].voteStatus === "upvoted" ? Number(authorPref.reputation) - 1 : Number(authorPref.reputation) + 1
                }
            )
        }else{
            await users.updatePrefs<UserPrefs>(QuestionOrAnswer.authorId,
                {
                    reputation:voteStatus === "upvoted" ? Number(authorPref.reputation) + 1 : Number(authorPref.reputation) - 1
                }
            )
        }


    }
    
    const [upvotes,downvotes] = await Promise.all([

        databases.listDocuments(db,voteColletion,[
            Query.equal("type",type),
            Query.equal("typeId",typeId),
            Query.equal("voteStatus","upvoted"),
            Query.equal("votedById",votedById),
            Query.limit(1)
        ]),

        databases.listDocuments(db,voteColletion,[
            Query.equal("type",type),
            Query.equal("typeId",typeId),
            Query.equal("voteStatus","downvoted"),
            Query.equal("votedById",votedById),
            Query.limit(1)
        ]),   
    ])

   return NextResponse.json(
    {
        data:{
            document: null,
            voteResult:upvotes.total - downvotes.total
        },
        message:"Vote Withdrawn"
    },
    {status:200});
   

 } catch (error:any) {
    return NextResponse.json({
        error:error?.message || "Error in voting"
    },
    {
        status:error?.status || error?.code || 500 
    })
 }

}