import { Modal, QRCode, Space } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useState } from "react";
import "../qrcode/qrcode.scss";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const Qrcode = (props: {
  listUser: any;
  setIsModaleShowQrcode: Dispatch<SetStateAction<boolean>>;
  isModaleShowQrcode: boolean;
}) => {
  const { user } = useUser(); // hook trong next/navigation dùng để lấy dữ liệu email vừa đăng nhập
  const text = `${process.env.NEXT_PUBLIC_URL}/${user?.username}`;
  const size = 160;
  const [copyStatus, setCopyStatus] = useState<string>("Copy");

  const handleOk = () => {
    props.setIsModaleShowQrcode(false);
  };
  const handleCancel = () => {
    props.setIsModaleShowQrcode(false);
  };

  const inputRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopyStatus("Copied!");
    setTimeout(() => {
      setCopyStatus("Copy");
    }, 2000);
  };

  // console.log("props.listUser", props.listUser);

  return (
    <div>
      <Modal
        footer={null}
        title="Share this Bio Link"
        open={props.isModaleShowQrcode}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <hr />
        <div className="flex gap-10 mt-6 mb-3">
          <Space direction="vertical" align="center">
            <QRCode
              errorLevel="H"
              size={size}
              iconSize={size / 4}
              value={text || "-"}
              icon={props.listUser?.avatar}
            />
          </Space>

          <div>
            <Link
              href={`https://twitter.com/intent/tweet?text=Check%20out%20${props.listUser?.username}%27s%20bio%20link!${process.env.NEXT_PUBLIC_URL}/${user?.username}`}
            >
              <div className="flex justify-between items-center w-[235.72px] h-[58px]">
                <div className="w-[195px] flex gap-3 items-center font-semibold">
                  <div className="share-svgs">
                    <i className="fa-brands fa-x-twitter absolute right-[11px] top-[11px] text-blue-400 text-[16px]"></i>
                  </div>
                  <span>Share on Twitter</span>
                </div>
                <span>
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </div>
            </Link>

            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_URL}/${user?.username}`}
            >
              <div className="flex justify-between items-center w-[234.72px] h-[58px]">
                <div className="w-[195px] flex gap-3 items-center font-semibold">
                  <div className="share-svgs">
                    <i className="fa-brands fa-facebook absolute right-[9px] top-[10px] text-blue-500 text-[18px]"></i>
                  </div>
                  <span>Share on Facebook</span>
                </div>
                <span>
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </div>
            </Link>

            <Link
              href={`mailto:?subject=Check out this Biolink!&body=Check out ${props.listUser?.username}'s bio link! - ${process.env.NEXT_PUBLIC_URL}/${user?.username}"`}
            >
              <div className="flex justify-between items-center w-[234.72px] h-[58px]">
                <div className="w-[195px] flex gap-3 items-center font-semibold">
                  <div className="share-svgs">
                    <i className="fa-regular fa-envelope absolute right-[9px] top-[10px] text-[18px]"></i>
                  </div>
                  <span>Share via Email</span>
                </div>
                <span>
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex justify-between mt-4 mb-4">
          <div className="border border-blue-500 rounded-l-lg px-4 py-2 w-[400px]">
            <span className="text-lg">
              <i className="fa-solid fa-paperclip"></i>
            </span>

            <span className="ml-3">{text}</span>
          </div>
          <button
            onClick={handleCopy}
            className="text-white border rounded-r-lg w-[134px] h-[47px] bg-blue-500 "
          >
            {copyStatus}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Qrcode;
