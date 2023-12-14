"use client"
import UsernameProfile from "@/components/profile/usernameProfile";
import axios from "axios";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Username = () => {
    const [ data, setData] = useState();
    const param = useParams();
//    console.log('router', param)
    useEffect (() => {
        getUser()
    }, [])

    const getUser = async() => {
      const res = await axios.get(`/api/bio/${param.username}`)
      
      setData(res.data)
    }
    // console.log('listUser', data)
  return (
    <div  className="max-w-[680px] mx-auto">
      <UsernameProfile size="large" listUser={data}/>
    </div>
  );
};
export default Username;
