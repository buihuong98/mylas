"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Button, Spin } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../dashboard/dashboard.scss";
import ModaleLink from "@/components/modaleLink/modale";
import AddSocials from "@/components/socials/AddSocials";

const DashboardLink = () => {
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
          <span>bio.link/huongbuisg</span>
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
          <div className="w-[377.41px] h-[696.99px] absolute border-[15px] border-black rounded-3xl right-[64px]">
            <span>
              <i className="fa-solid fa-arrow-up-from-bracket w-[20px] h-[20px] ml-[18px] mt-[20px]"></i>
            </span>

            <div
              className={`flex flex-col justify-center items-center mt-7 gap-5`}
            >
              <div className="flex flex-col justify-center items-center gap-2">
                <img
                  className="w-[96px] h-[96px] object-cover rounded-full"
                  src={listUser?.avatar}
                  alt="no Image"
                />
                <span className="text-[16px] font-bold">
                  {listUser?.username}
                </span>
              </div>
                <div className="flex gap-2">
              {listUser?.socials?.map((item: any, index: any) => {
                return (<div key={index}>
                 <span className="text-xl"><i className={`${item.icon}`}></i></span>
                </div>)
              })}
              </div>

              {listUser?.links?.map((item: any, index: any) => {
                return (
                  <div key={index}>
                    {item && (
                      <Link href={item.url}>
                        <div
                          className={`flex border-2 rounded-3xl w-[200px] h-[40px] shadow-lg items-center gap-[37px] ${
                            !item.image ? "justify-center" : ""
                          }`}
                        >
                          {item.image ? (
                            <img
                              className="h-[30px] w-[30px] rounded-full object-cover ml-1"
                              src={item?.image}
                              alt=""
                            />
                          ) : null}
                          {item.title ? (
                            <span>{item?.title}</span>
                          ) : (
                            <span>{listUser?.username}</span>
                          )}
                        </div>
                      </Link>
                    )}
                  </div>
                );
              })}

              <span>LOGO</span>
            </div>
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

export default DashboardLink;
