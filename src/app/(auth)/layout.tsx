"use client"

import { ModeToggle } from "@/components/ui/modeToggle";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React from "react";
const Layout = ({children}:{children:React.ReactNode}) => 
{

    const {session} = useAuthStore();
    const router = useRouter();

    React.useEffect(() => {
        if (session) {
            router.push("/");
        }
    },[session,router])
   
    if (session) {
        return null
    }

    return(
            <div className="flex flex-col  min-h-screen"> {/* Ensures full height */}
              <div className="w-full flex justify-end p-4">
                <ModeToggle />
              </div>
          
              <div className="flex flex-grow flex-col items-center justify-center">
                <div>{children}</div>
              </div>
            </div>
          
    )
}

export default Layout;