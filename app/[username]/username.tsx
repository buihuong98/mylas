"use client";
import UsernameProfile from "@/components/profile/usernameProfile";
import { themes } from "@/container/themes/Linkinbio";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Username = () => {
  const [data, setData] = useState<any>();
  const param = useParams();
  //    console.log('router', param)
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get(`/api/bio/${param.username}`);

    setData(res.data);
  };

  const theme = themes.find((theme) => theme.id === data?.themeID);
  // console.log("theme", theme?.background);

  // console.log('listUser', data?.themeID)
  return (
    <div style={{ background: theme?.background }}>
      <div className="max-w-[680px] mx-auto h-[100vh]">
        <UsernameProfile size="large" listUser={data} theme={theme} />
      </div>
    </div>
  );
};
export default Username;
