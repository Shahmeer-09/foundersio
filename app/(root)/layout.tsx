import { auth } from "@/auth";
import Navbar from "./_components/Navbar";

export default async function layout({children}:Readonly<{children:React.ReactNode}>){
    const session = await auth();
     
    return (

        <main className=" font-work-sans " >
            <Navbar session={session}/>
            <div className=" mt-[64px] "  >

            {children}
            </div>
        </main>
    )

}