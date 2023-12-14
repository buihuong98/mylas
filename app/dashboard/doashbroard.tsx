"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button, Tabs, TabsProps } from "antd";
import axios from "axios";

import { useEffect, useState } from "react";
import "../dashboard/dashboard.scss";

import UsernameProfile from "@/components/profile/usernameProfile";
import { ImageUpload } from "@/components/inputs/image-upload";
import Links from "@/container/dashboard/Links";

const Dashboard = () => {
  const [listUser, setListUser] = useState<any>();
  const [image, setImage] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const { user } = useUser(); // hook trong next/navigation dùng để lấy dữ liệu email vừa đăng nhập

  const [nameProfile, setNameProfile] = useState("");
  const [errorNameProfile, setErrorNameProfile] = useState("");

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
  };

  const onChangeTab = (key: string) => {
    // console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Links",
      children: (<Links listUser={listUser} getUser={getUser} />),
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
        <div className="w-[600px]">
          <div className="mt-9 bg-white px-9 py-9 w-full">
            <span className="text-lg font-semibold">Profile</span>
            <div className="mt-8 flex justify-between">
              <div className="w-[389px]">
                <div className="bg-[#f2f0f0] border px-2 py-2">
                  {/* {listUser.username ? ()} */}
                  <input
                    className="w-full bg-[#f2f0f0] focus-visible:outline-none"
                    type="text"
                    placeholder="Name"
                    value={nameProfile}
                    onChange={(e) => {
                      setNameProfile(e.target.value);
                      if (e.target.value.length > 0) {
                        setErrorNameProfile("Please add your username");
                      }
                    }}
                  />
                </div>
                {errorNameProfile && (
                  <p className="text-rose-400">Please add your username</p>
                )}
                <div className="bg-[#f2f0f0] border px-2 py-2 mt-5">
                  {/* {listUser.username ? ()} */}
                  <input
                    className="w-full bg-[#f2f0f0] focus-visible:outline-none"
                    type="text"
                    placeholder="Bio"
                  />
                </div>
              </div>
              <div>
                <ImageUpload
                  value={image}
                  error={errorImage}
                  // className="w-[115px] h-[115px] object-cover rounded-full"
                  onChange={function (src: string): void {
                    //chạy dòng 129 sau khi lấy đc url của ảnh, component đc render lại thì value= url ảnh, truyền vào componed con
                    setImage(src);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
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
  // console.log("listUser", listUser);

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
          <span>bio.link/{listUser?.username}</span>
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
          <div className="w-[377.41px] h-[696.99px] absolute border-[15px] border-black rounded-3xl right-[64px] px-5">
            <UsernameProfile listUser={listUser} />
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
