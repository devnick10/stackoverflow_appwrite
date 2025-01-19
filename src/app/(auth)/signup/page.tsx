"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/Auth";
import React, { FormEvent } from "react";
import Link from "next/link";
function SigninPage() {

    const { createAccount, login } = useAuthStore();

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget);

        const firstname = formData.get("firstname") as string;
        const lastname = formData.get("lastname") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!firstname || !lastname || !email || !password) {
            setError(() => "Plz fill out all the fields.")
            return
        }

        setLoading(true);
        setError("");

        const response = await createAccount(
            `${firstname}\t${lastname}`,
            email.toString(),
            password.toString(),
        )

        if (response.error) {
            setError(() => response.error!.message);
        } else {
            const loginResponse = await login(email.toString(), password.toString());

            if (loginResponse.error) {
                setError(() => loginResponse.error!.message);
            }
        }

        setLoading(false);
    }

    return (
        <div >
            {error && <p>{error}</p>}

            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                            <Label htmlFor="firstname">First Name</Label>
                            <Input className="h-8 mb-1.5"  type="text" name="firstname" id="firstname" />
                            <Label  htmlFor="lastname">Last Name</Label>
                            <Input className="h-8 mb-1.5" type="text" name="lastname" id="lastname" />
                            <Label htmlFor="email">Email</Label>
                            <Input className="h-8 mb-1.5" type="email" name="email" id="email" />
                            <Label htmlFor="password">Password</Label>
                            <Input className="h-8 mb-1.5" type="password" name="password" id="password" />
                            
                    </form>
                </CardContent>
                <CardFooter className="flex gap-2 justify-center flex-col items-center">
                            <Button  type="submit" disabled={loading}>Sign Up</Button>  
                <CardDescription>
                    <p>Already have an account? <Link className="font-semibold"  href="/signin">Sign In</Link></p>
                </CardDescription>
                </CardFooter>
            </Card>


        </div>
    )
}

export default SigninPage;