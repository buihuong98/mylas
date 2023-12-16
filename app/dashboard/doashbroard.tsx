"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button, Tabs, TabsProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "../dashboard/dashboard.scss";

import UsernameProfile from "@/components/profile/usernameProfile";
import Links from "@/container/dashboard/Links";
import Design from "@/container/dashboard/Design";
import { themes } from "@/container/themes/Linkinbio";
import Link from "next/link";

const Dashboard = () => {
  const [listUser, setListUser] = useState<any>();
  const [image, setImage] = useState("");
  const { user } = useUser(); // hook trong next/navigation dùng để lấy dữ liệu email vừa đăng nhập
  const [nameProfile, setNameProfile] = useState("");

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const getUser = async () => {
    const res = await axios.get(`/api/bio/${user?.username}`);
    // console.log("res", res);
    setListUser(res.data);
    setNameProfile(res.data.username);
    setImage(res.data.avatar);
  };

  const onChangeTab = (key: string) => {
    // console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Links",
      children: <Links listUser={listUser} getUser={getUser} />,
    },
    {
      key: "2",
      label: "Posts",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Design",
      children: (
        <Design
          listUser={listUser}
          nameProfile={nameProfile}
          setNameProfile={setNameProfile}
          image={image}
          setImage={setImage}
          user= {user}
          getUser={getUser}
        />
      ),
    },
    {
      key: "4",
      label: "Subscribers",
      children: "Content of Tab Pane 4",
    },
    {
      key: "5",
      label: "Stats",
      children: "Content of Tab Pane 5",
    },
    {
      key: "6",
      label: "Settings",
      children: "Content of Tab Pane 6",
    },
  ];
  // if (linkIndexToEdit) {
  //   console.log("linkIndexToEdit", listUser.links[linkIndexToEdit]);
  // }
  // if(listUser && listUser.themeID){
  
    // console.log("listUser", listUser?.themeID);
  const theme = themes.find(theme => theme.id === listUser?.themeID) 
  //  console.log('theme', theme?.background)

  return (
    <div className="h-[100vh]">
      <div className="flex justify-between px-[64px] h-[60px] items-center">
        <span>LOGO</span>
        <div className="flex gap-4">
          <div className="flex gap-2 text-[linear-gradient(112.44deg,#ff5858_2.09%,#c058ff_75.22%)]">
            <span>
              <i className="fa-solid fa-bolt"></i>
            </span>
            <span>Upgrade</span>
          </div>
          <Link href={`/${user?.username}`}>
          <span>bio.link/{listUser?.username}</span>
          </Link>
          <Button>Share</Button>
          <div className="flex gap-2">
            <UserButton />
            <span>
              <i className="fa-solid fa-chevron-down"></i>
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-[700px_minmax(900px,_1fr)_100px] h-[100vh]">
        <div className="mt-[32px] relative">
          <div className="w-[377.41px] h-[696.99px] absolute border-[15px] border-black  rounded-3xl right-[64px] px-5" style={{background: theme?.background}}>
            <UsernameProfile listUser={listUser} theme={theme} />
          </div>
        </div>

        <div className="bg-[#eaeaea]">
          <div className="ml-[64px] mt-[32px]">
            <div className="flex gap-5 font-semibold">
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
      </div>
    </div>
  );
};

export default Dashboard;
