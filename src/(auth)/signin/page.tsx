"use client"

import { useAuthStore } from "@/store/Auth";
import React, { FormEvent } from "react";
function SigninPage() {

    const {login} = useAuthStore();

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        
        if(!email || !password){
            setError(()=>"Plz fill out all the fields.")
            return
        }

        setLoading(true);
        setError("");
        
        
        const loginResponse = await login(email.toString(),password.toString());
        
        if(loginResponse.error){
            setError(()=>loginResponse.error!.message);
        }
        
        
        setLoading(false);
    }

    return (
    <div>
        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit}>

        </form>
    </div>
  )
}

export default SigninPage;