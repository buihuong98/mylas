import axios, { AxiosError } from "axios";
import Username from "./username"
import { themes } from "@/libs/theme";


const Page = async (props: {params: {username: string}}) => {
    try{
        // console.log(`/api/bio/${props.params.username}`)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/bio/${props.params.username}`);
            
    
    const theme = themes.find((theme) => theme.id === res.data?.themeID);
    return (
        <div>
           <Username data={res.data} theme={theme} />
        </div>
    )
    }catch(error: any){
        console.log("gửi dữ liệu bị lỗi", error.response)   
        
        return (
    <div>Error</div>
   )
    };

}

export default Page