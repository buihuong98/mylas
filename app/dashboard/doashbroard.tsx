"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button, Spin } from "antd";
import axios from "axios";

import { useEffect, useState } from "react";
import "../dashboard/dashboard.scss";
import ModaleLink from "@/components/modaleLink/modale";
import AddSocials from "@/components/socials/AddSocials";
import UsernameProfile from "@/components/profile/usernameProfile";

const Dashboard = () => {
  const [listUser, setListUser] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser(); // hook trong next/navigation dùng để lấy dữ liệu email vừa đăng nhập
  const [linkIndexToEdit, setLinkIndexToEdit] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  // const [checkbox1, setCheckbox1] = useState(false);
  // const [checkboxValue, setCheckboxValue] = useState(false)
  // console.log('user', user)

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const getUser = async () => {
    const res = await axios.get(`/api/bio/${user?.username}`);
    // console.log("res", res);
    setListUser(res.data);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  // console.log(listUser?.links)
  const handleModalHeader = (index: number) => {
    setIsModalOpen(true);
    setLinkIndexToEdit(index);
  };

  // if (linkIndexToEdit) {
  //   console.log("linkIndexToEdit", listUser.links[linkIndexToEdit]);
  // }
  // console.log("listUser", listUser);

  return (
    <div className="h-[100vh]">
      <div className="flex justify-between px-[64px] h-[60px] items-center">
        <span>LOGO</span>
        {isLoading ? <Spin /> : null}
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
              <span>Links</span>
              <span>Posts</span>
              <span>Design</span>
              <span>Subscribers</span>
              <span>Stats</span>
              <span>Settings</span>
            </div>
            <hr />
            <div className="mt-3 ">
              <div className="flex">
                <div>
                  <Button
                    onClick={showModal}
                    className="font-semibold w-[424.73px] mr-4 h-[48px] bg-[linear-gradient(112.44deg,#ff5858_2.09%,#c058ff_75.22%)] text-white"
                  >
                    + ADD LINK
                  </Button>
                  <ModaleLink
                    linkIndexToEdit={linkIndexToEdit}
                    listUser={listUser}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    getUser={getUser}
                    setLinkIndexToEdit={setLinkIndexToEdit}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    // checkbox1={checkbox1}
                    // setCheckbox1={setCheckbox1}
                    // checkboxValue={checkboxValue}
                    // setCheckboxValue={setCheckboxValue}
                  />
                </div>
                <Button className="font-semibold w-[159.27px] h-[48px] text-white bg-blue-500">
                  + ADD EMBED
                </Button>
              </div>
              <div className="mt-[24px] font-semibold">+ Add header</div>

              {listUser?.links?.map((item: any, index: any) => {
                return (
                  <div key={index}>
                    <div
                      onClick={() => {
                        handleModalHeader(index);
                      }}
                      className="mt-[32px] flex justify-between items-center px-[25px] bg-white w-[600px]"
                    >
                      <div className="flex gap-3 justify-between items-center">
                        {item.image ? (
                          <img
                            className="w-[52px] h-[52px] object-cover"
                            src={item.image}
                            alt="no image"
                          />
                        ) : null}

                        <div className=" py-[20px] pr-[72px] w-[400px]">
                          {item.title ? (
                            <p className="font-semibold">{item.title}</p>
                          ) : (
                            <p className="font-semibold">
                              {listUser?.username}
                            </p>
                          )}

                          <span className="text-sm">{item.url}</span>
                        </div>
                      </div>
                      <div>
                        <span className="mr-3">
                          <i className="fa-regular fa-circle-check"></i>
                        </span>
                        <span>0</span>
                      </div>

                      <div>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <AddSocials listUser={listUser} getUser={getUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
