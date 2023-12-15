import { useState } from "react";
import { ImageUpload } from "@/components/inputs/image-upload";
import axios from "axios";
import { Tabs, TabsProps } from "antd";
import LinkInBio from "../themes/Linkinbio";

const Design = (props: {
  listUser: any;
  nameProfile: any;
  setNameProfile: any;
  image: string;
  setImage: any;
  user: any | null | undefined;
  getUser: any;
}) => {
  const [buttonSave, setButtonSave] = useState(false);
  const [errorNameProfile, setErrorNameProfile] = useState("");
  const [errorImage, setErrorImage] = useState("");

  const handleSaveButton = async (e: any) => {
    e.preventDefault(); // ngăn chặn hành động mặc định của sự kiện submit(ví dụ: k làm cho trang web reload)
    // sau khi ấn nút submit nếu k có nội dung name thì setErrorName báo lỗi
    const dataButton = [{ ...props.listUser }];

    await senDataToServer({ avata: props.image, username: props.nameProfile });
    props.getUser();
  };

  const senDataToServer = async (dataButton: any) => {
    try {
      const res = await axios.put(
        `/api/bio/${props.user?.username}`,
        dataButton
      );
      if (res.status === 200) {
        setButtonSave(false);
        setErrorNameProfile("");
        setErrorImage("");
      } else {
        console.error("yêu cầu không thành công", res.status);
      }
    } catch (error) {
      console.log("Lỗi khi gửi yêu cầu:", error);
    }
  };

  const onChangeTab = (key: string) => {
    // console.log(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Link in bio",
      children: <LinkInBio />,
    },
    {
      key: "2",
      label: "Blog",
      children: "Blog",
    },
    {
      key: "3",
      label: "Shop",
      children: "Shop",
    },
  ];
  return (
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
                value={props.nameProfile}
                onChange={(e) => {
                  props.setNameProfile(e.target.value);
                  setButtonSave(true);
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
              value={props.image}
              error={errorImage}
              // className="w-[115px] h-[115px] object-cover rounded-full"
              onChange={function (src: string): void {
                //chạy dòng 129 sau khi lấy đc url của ảnh, component đc render lại thì value= url ảnh, truyền vào componed con
                props.setImage(src);
                setButtonSave(true);
              }}
            />
          </div>
        </div>
        {buttonSave && (
          <button
            onClick={handleSaveButton}
            className="mt-[32px] w-full h-[40px] bg-[linear-gradient(112.44deg,#ff5858_2.09%,#c058ff_75.22%)] text-white rounded-md"
          >
            SAVE
          </button>
        )}
      </div>

      <div className="mt-9 bg-white px-9 py-9 w-full">
        <span className="text-lg font-semibold">Themes</span>
        <div className="mt-8 flex gap-3">
        <Tabs
            defaultActiveKey="1"
            centered
            items={items}
            onChange={onChangeTab}
          />
        </div>
        
      </div>
    </div>
  );
};

export default Design;
