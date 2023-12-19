import { Button, Modal, Select, Space } from "antd";
import { useState } from "react";
import "../socials/socials.scss";
import axios from "axios";
import { ExclamationCircleFilled } from "@ant-design/icons";

type SocialItem = {
  id: number;
  icon: JSX.Element;
  application: string;
  addLink: string;
  
};
const listSocials: SocialItem[] = [
  {
    id: 1,
    icon: <i className="fa-solid fa-envelope"></i>,
    application: "Email",
    addLink: "your@domain.com",
  },
  {
    id: 2,
    icon: <i className="fa-brands fa-facebook"></i>,
    application: "Facebook",
    addLink: "https://facebook.com/pageurl",
  },
  {
    id: 3,
    icon: <i className="fa-brands fa-square-x-twitter"></i>,
    application: "Twitter",
    addLink: "Twitter username",
  },
  {
    id: 4,
    icon: <i className="fa-brands fa-instagram"></i>,
    application: "Instagram",
    addLink: "Instagram username",
  },
  {
    id: 5,
    icon: <i className="fa-brands fa-youtube"></i>,
    application: "Youtube",
    addLink: "www.youtube.com/",
  },
  {
    id: 6,
    icon: <i className="fa-brands fa-pinterest"></i>,
    application: "Pinterest",
    addLink: "https://pinterest.com/",
  },
  {
    id: 7,
    icon: <i className="fa-brands fa-tiktok"></i>,
    application: "Tiktok",
    addLink: "Tiktok username",
  },
  {
    id: 8,
    icon: <i className="fa-brands fa-spotify"></i>,
    application: "Spotify",
    addLink: "https://open.spotify.com/user/username",
  },
  {
    id: 9,
    icon: <i className="fa-brands fa-github"></i>,
    application: "Github",
    addLink: "https://github.com/username",
  },
];

const AddSocials = (props: { listUser: any; getUser: () => Promise<void>, user: any }) => {
  const [modalLinkSoialsOpen, setModalLinkSoialsOpen] = useState(false);
  const { confirm } = Modal;
  const [linksocialsToEdit, setLinksocialsToEdit] = useState<number>();
  const [linkInputValue, setLinkInputValue] = useState("");
  const [applicationValue, setAppLicationValue] = useState("");
  const [errorLinkInput, setErrorLinkInput] = useState("");
  const [appValue, setAppValue] = useState("");

  const handleChange = (value: string) => {
    setAppValue(value);
    // console.log(value);
    setAppLicationValue(value);
  };
  const appWidth = listSocials.find(
    (listSocial) => listSocial.application === appValue
  );

  // console.log("appWidth", appWidth);
  const handleModalAddLink = () => {
    setModalLinkSoialsOpen(true);
    setLinksocialsToEdit;
  };

  const handleLinkSoialsOk = () => {
    setModalLinkSoialsOpen(false);
  };

  const handleLinkSoialsCancel = () => {
    setModalLinkSoialsOpen(false);
    setLinkInputValue("");
    setErrorLinkInput("");
    setLinksocialsToEdit(undefined);
  };
  // console.log("props.listUser", props.listUser);

  const handleSaverLinkInput = async (e: any) => {
    e.preventDefault(); // ngăn chặn hành động mặc định của sự kiện submit(ví dụ: k làm cho trang web reload)
    // sau khi ấn nút submit nếu k có nội dung name thì setErrorName báo lỗi
    const socials = props.listUser.socials;

    if (linksocialsToEdit === undefined) {
      socials.push({
        id: appWidth?.id,
        icon: appWidth?.icon?.props?.className,
        application: appValue,
        addLink: linkInputValue,
      });
    } else {
      for (let i = 0; i < socials.length; i++) {
        if (linksocialsToEdit === i) {
          socials[i].addLink = linkInputValue;
          // console.log("đã tìm thấy cái cần sửa", socials[i]);
        }
      }
    }

    await sendLinkDataToServer({ socials: socials }), // dữ liệu gửi lên 1 object có key là socials, value là mảng socials
      props.getUser();
  };

  const sendLinkDataToServer = async (data: any) => {
    try {
      const res = await axios.put(`/api/bio/${props.user?.username}`, data);
      if (res.status === 200) {
        // handleLinkSoialsCancel()
        setModalLinkSoialsOpen(false);
      } else {
        console.error("yêu cầu không thành công", res.status);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  };
  const handleModaleHeaderSocials = (index: number) => {
    // console.log("linkIndexToEdit", linksocialsToEdit);

    setLinkInputValue(props.listUser.socials[index].addLink);
    setAppLicationValue(props.listUser.socials[index].application);
    setModalLinkSoialsOpen(true);
    setLinksocialsToEdit(index);
  };

  const showDeleteConfirmLink = () => {
    setModalLinkSoialsOpen(false);
    confirm({
      title: "Delete social?",
      icon: <ExclamationCircleFilled />,
      content: "Are you sure you want to delete this social?",
      okText: "Confirm",
      okType: "danger",
      cancelText: "No",
      onOk:  async() =>  {
        const dataDelete = [...props.listUser.socials]
        if(linksocialsToEdit !== undefined){
          dataDelete.splice(linksocialsToEdit, 1)
          await sendLinkDataToServer({socials: dataDelete})
        }
        props.getUser();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // console.log("linkIndexToEdit", linksocialsToEdit);
  // if (linksocialsToEdit !== undefined) {
  //   console.log(
  //     "linkInputValue",
  //     props.listUser.socials[linksocialsToEdit].addLink
  //   );
  // }
  // console.log('lisUser', props.listUser)
  // console.log('appWidth', appWidth)
  return (
    <div>
      <div className="mt-[48px] pb-5">SOCIALS</div>

      {props.listUser?.socials?.map((item: any, index: any) => {
        return (
          <div
            key={index}
            className="flex justify-between bg-white text-black mb-3 px-[25px] py-3 w-[600px]"
            onClick={() => {
              handleModaleHeaderSocials(index);
            }}
          >
            <div>
              <span className="mr-3">
                <i className={`${item.icon}`}></i>
              </span>

              <span>{item.application}</span>
            </div>
            <div>
              <span>{item.addLink}</span>
              <span className="ml-3">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </span>
            </div>
          </div>
        );
      })}

      <Button
        onClick={handleModalAddLink}
        className="font-semibold w-[600px] mr-4 h-[48px] bg-white text-blue-600"
      >
        + Add socials
      </Button>

      <Modal
        footer={null}
        title={linksocialsToEdit !== undefined ? "Edit" : "+ Add socials"}
        open={modalLinkSoialsOpen}
        onOk={handleLinkSoialsOk}
        onCancel={handleLinkSoialsCancel}
      >
        <hr />

        <Select
          value={applicationValue}
          style={{ width: "100%" }}
          placeholder="Select one country"
          onChange={handleChange}
          options={listSocials}
          fieldNames={{
            label: "application",
            value: "application",
          }}
          optionRender={(option) => (
            <Space>
              {option.data.icon}
              {option.data.application}
            </Space>
          )}
        ></Select>
        <div className="border mt-5 px-3 py-3 rounded-lg font-semibold border-rose-500">
          <span>
            {linksocialsToEdit !== undefined
              ? props.listUser.socials[linksocialsToEdit].application
              : appWidth?.application}
          </span>

          <input
            className="w-full focus-visible:outline-none"
            type="text"
            placeholder="link"
            value={linkInputValue}
            onChange={(e) => {
              const value = e.target.value;

              setLinkInputValue(value);
              // khi setState trong hàm onchange thì state sẽ chưa render lại nên trả về dữ liệu không đúng
              if (value.length > 0) {
                setErrorLinkInput("");
              }
              if (!value) {
                setErrorLinkInput(`Please enter a valid ${appValue} link.`);
                return
              }
              var linkPattern =
                /^(http(s)?:\/\/)(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\.[a-zA-Z]{2,})?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
              // Kiểm tra đường link
              if (value.length > 0 && !linkPattern.test(value)) {
                setErrorLinkInput("Invalid URL");
                return
              }
            }}
          />
        </div>
        {linksocialsToEdit !== undefined ? (
          <div className=" mt-5 flex justify-center">
            <Button
              className="border-none text-rose-400 hover:text-rose-400"
              onClick={showDeleteConfirmLink}
              type="dashed"
            >
              Remove icon
            </Button>
          </div>
        ) : null}

        {errorLinkInput ? (
          <p className="text-rose-400">{errorLinkInput}</p>
        ) : null}
        <Button
          onClick={handleSaverLinkInput}
          className="bg-[linear-gradient(112.44deg,#ff5858_2.09%,#c058ff_75.22%)] text-white mt-7 w-full h-[48px] font-semibold uppercase"
        >
          Save
        </Button>
      </Modal>
    </div>
  );
};

export default AddSocials;
