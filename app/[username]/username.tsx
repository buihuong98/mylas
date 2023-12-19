"use client";
import UsernameProfile from "@/components/profile/usernameProfile";
import { themes } from "@/container/themes/Linkinbio";
import { Spin } from "antd";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isLoadingState } from "../dashboard/doashbroard";

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
  const [loading, setLoading] = useRecoilState(isLoadingState);
  // console.log(loading)
  const theme = themes.find((theme) => theme.id === data?.themeID);
  // console.log("theme", theme?.background);

  // console.log('listUser', data?.themeID)
  return (
    <div style={{ background: theme?.background }}>
      <Spin spinning={loading}>
        <div className="max-w-[680px] mx-auto h-[100vh]">
          <UsernameProfile size="large" listUser={data} theme={theme} />
        </div>
      </Spin>
    </div>
  );
};
export default Username;
