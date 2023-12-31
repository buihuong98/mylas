"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button, Spin, Tabs, TabsProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "../dashboard/dashboard.scss";

import UsernameProfile from "@/components/profile/usernameProfile";
import Links from "@/container/dashboard/Links";
import Design from "@/container/dashboard/Design";
import Link from "next/link";
import { atom, useRecoilState } from "recoil";
import { themes } from "@/libs/theme";

export const isLoadingState = atom({ key: "IsLoadingState", default: false });
const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
const Dashboard = () => {
  const [listUser, setListUser] = useState<any>();
  const [image, setImage] = useState("");
  const { user } = useUser(); // hook trong next/navigation dùng để lấy dữ liệu email vừa đăng nhập
  const [nameProfile, setNameProfile] = useState("");
  const [bioProfile, setBioProfile] = useState("");
  const [loading, setLoading] = useRecoilState(isLoadingState);
  const [mounted, setMounted] = useState(false);
  // console.log(loading)

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const getUser = async () => {
    setLoading(true);
    const res = await axios.get(`/api/bio/${user?.username}`);
    // console.log("res", res.data);
    setListUser(res.data);
    setNameProfile(res.data.username);
    setImage(res.data.avatar);
    setBioProfile(res.data.bio);
    setLoading(false);
  };

  const onChangeTab = (key: string) => {
    // console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <span className="text-base font-medium">Links</span>,
      children: <Links listUser={listUser} getUser={getUser} />,
    },
    {
      key: "2",
      label: <span className="text-base font-medium">Posts</span>,
      children: "Coming soon",
    },
    {
      key: "3",
      label: <span className="text-base font-medium">Design</span>,
      children: (
        <Design
          listUser={listUser}
          nameProfile={nameProfile}
          setNameProfile={setNameProfile}
          bioProfile={bioProfile}
          setBioProfile={setBioProfile}
          image={image}
          setImage={setImage}
          user={user}
          getUser={getUser}
        />
      ),
    },
    {
      key: "4",
      label: <span className="text-base font-medium">Subscribers</span>,
      children: "Coming soon",
    },
    {
      key: "5",
      label: <span className="text-base font-medium">Stats</span>,
      children: "Coming soon",
    },
    {
      key: "6",
      label: <span className="text-base font-medium">Settings</span>,
      children: "Coming soon",
    },
  ];
  // if (linkIndexToEdit) {
  //   console.log("linkIndexToEdit", listUser.links[linkIndexToEdit]);
  // }
  // if(listUser && listUser.themeID){

  // console.log("listUser", listUser?.themeID);
  const theme = themes.find((theme) => theme.id === listUser?.themeID);
  //  console.log('theme', theme?.background)

  if (!mounted) {
    return <Spin />;
  }

  return (
    <div className="h-[100vh]">
      <Spin spinning={loading}>
        {/* dùng position: fixed để scroll trong trang web, z-10 dùng để phần scroll đè lên phần không scroll, cho cả background để che */}
        <div className="flex fixed w-full border-b-[1px] justify-between px-[64px] h-[60px] items-center z-10 bg-white">
          <span>LOGO</span>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center text-[linear-gradient(112.44deg,#ff5858_2.09%,#c058ff_75.22%)]">
              <span>
                <i className="fa-solid fa-bolt"></i>
              </span>
              <span>Upgrade</span>
            </div>
            <div className="flex items-center">
              <Link href={`/${user?.username}`}>
                <span className="text-blue-400 ">
                  bio.link/{listUser?.username}
                </span>
              </Link>
            </div>
            <Button>Share</Button>
            <div className="flex gap-2">
              <UserButton />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-[700px_minmax(900px,_1fr)_100px] h-[100vh]">
          {/* dùng fixed thì phải xét left và top để hiện thị phần đã fixed */}
          <div className="fixed left-[41vw] top-[12vh]">  
            <div className="mt-[32px] relative">
              <div
                className="w-[377.41px] h-[696.99px] absolute border-[15px] border-black  rounded-3xl right-[64px] px-5"
                style={{ background: theme?.background }}
              >
                <UsernameProfile listUser={listUser} theme={theme} />
              </div>
            </div>
          </div>
          {/* <Spin spinning={loading}> */}
          <div className="bg-[#f9f9f9]">
            <div className="ml-[64px] mt-[32px]">
              <div className="flex gap-5 ml-[43vw] mt-[15vh]">
                <Tabs
                  defaultActiveKey="1"
                  centered
                  items={items}
                  onChange={onChangeTab}
                />
              </div>
              <hr />
            </div>
          </div>
          {/* </Spin>  */}
        </div>
      </Spin>
    </div>
  );
};

export default Dashboard;
