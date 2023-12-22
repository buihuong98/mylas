import { isLoadingState } from "@/app/dashboard/doashbroard";
import { Spin } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useRecoilState } from "recoil";
import Qrcode from "../qrcode/qrcode";

const UsernameProfile = (props: {
  listUser: any;
  size?: "nornal" | "large";
  theme: any;
}) => {
  const { size = "nornal" } = props;
  const [loading, setLoading] = useRecoilState(isLoadingState);
  const [isModaleShowQrcode, setIsModaleShowQrcode] = useState(false);
  // console.log("lisUser", props.listUser)
  const showModale = () => {
    setIsModaleShowQrcode(true);
  };
  return (
    <Spin spinning={loading} >
      <div className="w-full flex flex-col justify-between min-h-[665.99px] items-center">
        <div className="flex flex-col w-full h-full ">
          <button className="border rounded-full w-[30px] h-[30px] mt-5 shadow-2xl">
            <i onClick={showModale}
              className="fa-solid fa-arrow-up-from-bracket w-[20px] h-[20px] ml-[1.5px] mt-[5px]"
              style={{ color: props.theme?.textcolor }}
            ></i>
          </button>
         <Qrcode listUser={props.listUser} isModaleShowQrcode={isModaleShowQrcode} setIsModaleShowQrcode={setIsModaleShowQrcode} />
          <div
            className={`flex flex-col justify-center items-center mt-7 gap-5`}
          >
            <div className="flex flex-col justify-center items-center gap-2">
              <img
                className="w-[96px] h-[96px] object-cover rounded-full"
                src={props.listUser?.avatar}
                alt="no Image"
              />
              <span
                className="text-[23px] font-bold"
                style={{ color: props.theme?.textcolor }}
              >
                {props.listUser?.username}
              </span>
              <p style={{ color: props.theme?.textcolor }}>
                {props.listUser?.bio}
              </p>
            </div>

            {props.listUser?.iconPosition === "top" ? (
              <div className="flex gap-5">
                {props.listUser?.socials?.map((item: any, index: any) => {
                  return (
                    <div key={index}>
                      <span className="text-xl">
                        <i
                          className={`${item.icon}`}
                          style={{ color: props.theme?.textcolor }}
                        ></i>
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {props.listUser?.links?.map((item: any, index: any) => {
              return (
                <Link
                  key={index}
                  href={item.url}
                  className={`flex border rounded-full w-full relative ${
                    size === "nornal" ? "h-10" : "h-[60px]"
                  } ${
                    props.theme && props.theme?.shadow
                  } items-center gap-[37px] text-center justify-center`}
                  style={{ color: props.theme?.textcolor }}
                >
                  {item.image && (
                    <img
                      className={`${
                        size === "large"
                          ? "h-[54px] w-[54px]"
                          : "h-[34px] w-[34px]"
                      }  absolute left-[2px] top-[2px] rounded-full object-cover`}
                      style={{ color: props.theme?.textcolor }}
                      src={item?.image}
                      alt=""
                    />
                  )}

                  <span style={{ color: props.theme?.textcolor }}>
                    {item?.title || props.listUser?.username}
                  </span>
                </Link>
              );
            })}

            {props.listUser?.iconPosition === "bottom" ? (
              <div className="flex gap-5">
                {props.listUser?.socials?.map((item: any, index: any) => {
                  return (
                    <div key={index}>
                      <span className="text-xl">
                        <i
                          className={`${item.icon}`}
                          style={{ color: props.theme?.textcolor }}
                        ></i>
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
        <span className="mt-8 mb-8" style={{ color: props.theme?.textcolor }}>
          LOGO
        </span>
      </div>
    </Spin>
  );
};

export default UsernameProfile;
