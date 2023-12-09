import { Button, Modal } from "antd";
import { useState } from "react";
import "../socials/socials.scss";
import axios from "axios";

const listSocials = [
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

const AddSocials = (props: { listUser: any; getUser: () => Promise<void> }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkIndexToAdd, setLinkIndexToAdd] = useState<number>();
  const [modalLinkSoialsOpen, setModalLinkSoialsOpen] = useState(false);
  const [linkIndexSocailsToEdit, setLinkIndexSocailsToEdit] =
    useState<number>();
  const [linkInputValue, setLinkInputValue] = useState("");
  const [errorLinkInput, setErrorLinkInput] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCanced = () => {
    setIsModalOpen(false);
  };

  const handleModalSocials = (index: number) => {
    setModalLinkSoialsOpen(true);
    setLinkIndexToAdd(index);
  };
  const handleLinkSoialsOk = () => {
    setModalLinkSoialsOpen(false);
  };

  const handleLinkSoialsCancel = () => {
    setModalLinkSoialsOpen(false);
    setLinkInputValue("");
    setErrorLinkInput("");
  };
  //    console.log("props.listUser", props.listUser.socials)
  const handleSaverLinkInput = async (e: any) => {
    e.preventDefault(); // ngăn chặn hành động mặc định của sự kiện submit(ví dụ: k làm cho trang web reload)
    // sau khi ấn nút submit nếu k có nội dung name thì setErrorName báo lỗi
    if (linkIndexToAdd === undefined) {
      return;
    }

    const socials = props.listUser.socials;
    socials.push({
      id: listSocials[linkIndexToAdd].id,
      icon: listSocials[linkIndexToAdd].icon,
      application: listSocials[linkIndexToAdd].application,
      addLink: linkInputValue,
    });
    await sendLinkDataToServer({ socials: socials }), // dữ liệu gửi lên 1 object có key là socials, value là mảng socials
      props.getUser();
  };

  const sendLinkDataToServer = async (data: any) => {
    try {
      const res = await axios.put(`/api/bio/${props.listUser?.username}`, data);
      if (res.status === 200) {
        // handleLinkSoialsCancel()
        setIsModalOpen(false);
        setModalLinkSoialsOpen(false);
      } else {
        console.error("yêu cầu không thành công", res.status);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  };
  const handleModaleHeaderSocials = (index: number) => {
    setModalLinkSoialsOpen(true);
    setLinkIndexSocailsToEdit(index);
  };

  console.log("ModalLinkSoialsOpen", modalLinkSoialsOpen);
  // if(linkIndexToAdd !== undefined && typeof linkIndexToAdd === "number"){
  //   console.log(listSocials[linkIndexToAdd].application)
  //   console.log(listSocials[linkIndexToAdd].icon)
  // }
  //   console.log('linkInputValue', linkInputValue)
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
              <span>
                <i className={`${item.icon}`}></i>
              </span>

              <span>{item.application}</span>
            </div>
            <div>
              <span>{item.addLink}</span>
              <span>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </span>
            </div>
          </div>
        );
      })}

      <Button
        onClick={showModal}
        className="font-semibold w-[600px] mr-4 h-[48px] bg-white text-blue-600"
      >
        + Add socials
      </Button>
      <Modal
        footer={null}
        title="Socials"
        open={isModalOpen}
        onCancel={handleCanced}
      >
        <hr />
        <div className="mt-5">
          <span>
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input className="ml-2" type="text" placeholder="Search" />
        </div>
        <hr className="bg-blue-500 h-[2px]" />
        {listSocials.map((item, index: any) => {
          return (
            <div
              key={index}
              className="px-3 py-2 flex border w-full justify-between mt-2"
              onClick={() => {
                handleModalSocials(index); // dùng hàm callback lưu index để mk biết mk đang click vào phần tử thứ mấy trong mảng
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-xl mr-4">
                  {/* <i className="fa-solid fa-envelope mr-3"></i> */}
                  {item.icon}
                </span>
                <span>{item.application}</span>
              </div>
              <button className="text-blue-500">Add</button>
            </div>
          );
        })}
      </Modal>

      <Modal
        footer={null}
        title={
          linkIndexToAdd !== undefined && typeof linkIndexToAdd === "number"
            ? listSocials[linkIndexToAdd].application
            : null
        }
        open={modalLinkSoialsOpen}
        onOk={handleLinkSoialsOk}
        onCancel={handleLinkSoialsCancel}
      >
        <hr />
        <div className="border mt-5 px-3 py-3 rounded-lg font-semibold border-rose-500">
          {linkIndexToAdd !== undefined &&
          typeof linkIndexToAdd === "number" ? (
            <span>{listSocials[linkIndexToAdd].application}</span>
          ) : null}

          <input
            className="w-full focus-visible:outline-none"
            type="text"
            placeholder={
              linkIndexToAdd !== undefined && typeof linkIndexToAdd === "number"
                ? listSocials[linkIndexToAdd].addLink
                : ""
            }
            value={linkInputValue}
            onChange={(e) => {
              const value = e.target.value;
              setLinkInputValue(value);
              // khi setState trong hàm onchange thì state sẽ chưa render lại nên trả về dữ liệu không đúng
              if (value.length > 0) {
                setErrorLinkInput("");
              }
              if (!value && typeof linkIndexToAdd === "number") {
                setErrorLinkInput(
                  `Please enter a valid ${listSocials[linkIndexToAdd].application} link.`
                );
              }
              var linkPattern =
                /^(http(s)?:\/\/)(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\.[a-zA-Z]{2,})?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
              // Kiểm tra đường link
              if (value.length > 0 && !linkPattern.test(value)) {
                setErrorLinkInput("Invalid URL");
              }
            }}
          />
        </div>
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
