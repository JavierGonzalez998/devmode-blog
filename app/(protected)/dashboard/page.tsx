import { Session } from "@/app/providers";
import { auth } from "@/auth";

export default async function DashboardPage(){
    const session = await auth()
    console.log(session)
    if(!session){
        return <div>Not authenticated</div>
    }

    return(
        <div className="container">
            <pre>
                {
                    JSON.stringify(Session, null, 2)
                }
            </pre>
        </div>
    )
}
