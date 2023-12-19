import { useEffect, useState } from "react";
import { ImageUpload } from "@/components/inputs/image-upload";
import axios from "axios";
import { Checkbox, Switch, Tabs, TabsProps } from "antd";
import LinkInBio from "../themes/Linkinbio";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const Design = (props: {
  listUser: any;
  nameProfile: any;
  setNameProfile: any;
  bioProfile: any;
  setBioProfile: any;
  image: string;
  setImage: any;
  user: any | null | undefined;
  getUser: any;
}) => {
  const [buttonSave, setButtonSave] = useState(false);

  const [errorNameProfile, setErrorNameProfile] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [showLogo, setShowLogo] = useState(false);
  const [shareButton, setShareButton] = useState(false);
  const [iconInTop, setIconInTop] = useState(false);
  const [iconInBottom, setIconInBottom] = useState(false);

  useEffect(() => {
    // console.log(props.listUser)
    if (props.listUser.iconPosition === "top") {
      setIconInTop(true);
    }
    if (props.listUser.iconPosition === "bottom") {
      setIconInBottom(true);
    }
  }, [props.listUser]);

  const handleSaveButton = async (e: any) => {
    e.preventDefault(); // ngăn chặn hành động mặc định của sự kiện submit(ví dụ: k làm cho trang web reload)
    // sau khi ấn nút submit nếu k có nội dung name thì setErrorName báo lỗi

    await senDataToServer({
      avatar: props.image,
      username: props.nameProfile,
      bio: props.bioProfile,
    });
    props.getUser();
  };
  // console.log("bio", props.bioProfile);
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
      children: <LinkInBio getUser={props.getUser} listUser={props.listUser} />,
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
  const onChangeTop = async (e: CheckboxChangeEvent) => {
    setIconInTop(true);
    setIconInBottom(false);
    if (e.target.checked === true) {
      await senDataToServer({ iconPosition: "top" });
      props.getUser();
    }
  };
  const onChangeBottom = async (e: CheckboxChangeEvent) => {
    setIconInBottom(true);
    setIconInTop(false);
    if (e.target.checked === true) {
      await senDataToServer({ iconPosition: "bottom" });
      props.getUser();
    }
  };

  const onChangeLogo = (checked: boolean) => {
    console.log(`switch Logo to ${checked}`);
  };
  const onChangeShareButton = (checked: boolean) => {
    console.log(`switch Button to ${checked}`);
  };
  return (
    <div className="w-[600px]">
      <div className="mt-9 bg-white px-9 py-9 w-full">
        <span className="text-lg font-semibold">Profile</span>
        <div className="mt-8 flex justify-between">
          <div className="w-[389px]">
            <div className="bg-[#f2f0f0] border px-2 py-2">
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
                value={props.bioProfile}
                onChange={(e) => {
                  props.setBioProfile(e.target.value);
                  setButtonSave(true);
                }}
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

      <div className="mt-9 bg-white px-9 py-9 w-full">
        <span className="text-lg font-semibold">
          Position to display socials
        </span>
        <div className="flex gap-[50px] mt-6">
          <div className="flex flex-col">
            <div
              className={`w-[164.33px] h-[100px] flex justify-center items-center ${
                props.listUser.iconPosition === "top"
                  ? " border-[2px] border-blue-400 rounded-xl"
                  : ""
              }`}
            >
              <div className="w-[149px] h-[87.84px] bg-[#f3f3f4] relative border rounded-lg">
                <div className="flex gap-2 absolute text-[12px] left-[50px] top-3">
                  <span>
                    <i className="fa-brands fa-instagram"></i>
                  </span>
                  <span>
                    <i className="fa-brands fa-facebook"></i>
                  </span>
                  <span>
                    <i className="fa-brands fa-tiktok"></i>
                  </span>
                </div>
                <button className=" w-[92.33px] h-4 bg-[#fff] top-[35px] left-[27px] absolute mb-[8px] border rounded-full"></button>
                <button className=" w-[92.33px] h-4 bg-[#fff] top-[55px] left-[27px] absolute mb-[8px] border rounded-full"></button>
              </div>
            </div>

            <Checkbox onChange={onChangeTop} checked={iconInTop}>
              Top
            </Checkbox>
          </div>
          <div className="flex flex-col">
            <div  className={`w-[164.33px] h-[100px] flex justify-center items-center ${
                props.listUser.iconPosition === "bottom"
                  ? " border-[2px] border-blue-400 rounded-xl"
                  : ""
              }`}>
              <div className="w-[149px] h-[87.84px] bg-[#f3f3f4] relative border rounded-lg">
                <button className=" w-[92.33px] h-4 bg-[#fff] top-4 left-[30px] absolute mb-[8px] border rounded-full"></button>
                <button className=" w-[92.33px] h-4 bg-[#fff] top-[37px] left-[30px] absolute mb-[8px] border rounded-full"></button>
                <div className="flex gap-2 absolute text-[12px] left-[50px] top-[58px]">
                  <span>
                    <i className="fa-brands fa-instagram"></i>
                  </span>
                  <span>
                    <i className="fa-brands fa-facebook"></i>
                  </span>
                  <span>
                    <i className="fa-brands fa-tiktok"></i>
                  </span>
                </div>
              </div>
            </div>
            <Checkbox onChange={onChangeBottom} checked={iconInBottom}>
              Bottom
            </Checkbox>
          </div>
        </div>
      </div>
      <div className="px-7 mb-9 bg-white">
        <div className="mt-9  py-9 w-full">
          <div className="flex justify-between mb-4">
            <span className="text-lg font-semibold">Show LOGO credit</span>
            <Switch defaultChecked onChange={onChangeLogo} />
          </div>
          <span>
            We appreciate you showing our logo credit in the footer, but feel
            free to hide it.
          </span>
        </div>
        <hr />
        <div className=" py-9 w-full">
          <div className="flex justify-between mb-4">
            <span className="text-lg font-semibold">Display Share button</span>
            <Switch defaultChecked onChange={onChangeShareButton} />
          </div>
          <span>
            Enables social sharing options on your page including a QR code.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Design;
