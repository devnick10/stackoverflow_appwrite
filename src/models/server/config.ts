import env from '@/app/env';
import {Client,Avatars,Databases,Storage,Users} from 'node-appwrite';


const client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apikey) // Your secret API key
;

const databases = new Databases(client) 
const avatars = new Avatars(client) 
const storage = new Storage(client) 
const users = new Users(client) 

export {client,databases,avatars,storage,users}