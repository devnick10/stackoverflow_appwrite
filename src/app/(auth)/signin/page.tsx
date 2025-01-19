"use client"

import { useAuthStore } from "@/store/Auth";
import React, { FormEvent } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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



        <Card>
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                        
                        <Label htmlFor="email">Email</Label>
                        <Input className="h-8" type="email" name="email" id="email" />
                        <Label htmlFor="password">Password</Label>
                        <Input className="h-8" type="password" name="password" id="password" />
                        
                </form>
            </CardContent>
            <CardFooter className="flex gap-2 justify-center flex-col items-center">
                        <Button  type="submit" disabled={loading}>Sign In</Button>  
            <CardDescription>
                <p>If you do not have an account. <Link className="font-semibold" href="/signup">Sign Up</Link></p>
            </CardDescription>
            </CardFooter>
        </Card>


    </div>
  )
}

export default SigninPage;