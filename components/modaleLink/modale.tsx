import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ImageUpload } from "@/components/inputs/image-upload";
import { Button, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";

const ModaleLink = (props: {
  linkIndexToEdit: number | undefined;
  listUser: any;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  getUser: () => Promise<void>;
  setLinkIndexToEdit: Dispatch<SetStateAction<number | undefined>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  // checkbox1: any;
  // checkboxValue: boolean;
  // setCheckboxValue: Dispatch<SetStateAction<boolean>>;
  // setCheckbox1: any
}) => {
  const [image, setImage] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [url, setUrl] = useState("");
  const [errorUrl, setErrorUrl] = useState("");
  const { confirm } = Modal;

  const handleSave = async (e: any) => {
    e.preventDefault(); // ngăn chặn hành động mặc định của sự kiện submit(ví dụ: k làm cho trang web reload)
    // sau khi ấn nút submit nếu k có nội dung name thì setErrorName báo lỗi
    if (!title) {
      setErrorTitle("Please enter your title");
      return;
    }

    if (!url) {
      setErrorUrl("Please add at least one link to continue");
      return;
    }

   
    // Biểu thức chính quy kiểm tra đường link hợp lệ
    var linkPattern =
      /^(http(s)?:\/\/)(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\.[a-zA-Z]{2,})?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    // Kiểm tra đường link
    if (url && !linkPattern.test(url)) {
      setErrorUrl("Invalid URL");
    }
    const data = [...props.listUser.links];

    if (props.linkIndexToEdit === undefined) {
      data.push({
        title: title,
        url: url,
        image: image,
      });
    } else {
      props.listUser.links[props.linkIndexToEdit].title = title;
      props.listUser.links[props.linkIndexToEdit].url = url;
      props.listUser.links[props.linkIndexToEdit].image = image;
    }

    // console.log("data", data);
    // dữ liệu gửi lên là object data có key là links
    await sendDataBasicToServer({ links: data }); // dùng async await trước hàm bất đồng bộ để khi dùng biến thì sẽ đợi hàm chạy xong code mới chạy tiếp
    props.getUser();
  };
  // console.log("props.linkIndexToEdit", props.linkIndexToEdit);

  const sendDataBasicToServer = async (data: any) => {
    try {
      const res = await axios.put(`/api/bio/${props.listUser?.username}`, data);
      // console.log("chạy dòng 77")
      if (res.status === 200) {
        handleCancel();
      } else {
        console.error("yêu cầu không thành công", res.status);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  };

  useEffect(() => {
    if (props.linkIndexToEdit !== undefined) {
      setTitle(props.listUser.links[props.linkIndexToEdit].title);
      setUrl(props.listUser.links[props.linkIndexToEdit].url);
      setImage(props.listUser.links[props.linkIndexToEdit].image);
    }
  }, [props.linkIndexToEdit]);

  const handleCancel = () => {
    props.setIsModalOpen(false);
    setTitle("");
    setUrl("");
    setImage("");
    setErrorImage("");
    setErrorTitle("");
    setErrorUrl("");
    props.setLinkIndexToEdit(undefined);
  };
  // console.log("Title",title);

  const showDeleteConfirm =  () => {
    confirm({
      title: "Delete link?",
      icon: <ExclamationCircleFilled />,
      content:
        "Are you sure you want to delete this link? This action cannot be undone.",
      okText: "Confirm",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        const dataDelete = [...props.listUser.links];
        if (props.linkIndexToEdit !== undefined) {
          dataDelete.splice(props.linkIndexToEdit, 1);
        //  console.log("số",dataDelete)
          // dùng async await trước hàm bất đồng bộ để khi dùng biến thì sẽ đợi hàm chạy xong code mới chạy tiếp
        await sendDataBasicToServer({links: dataDelete})
        
        }
        props.getUser();
        console.log("chạy dòng 127")
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div>
      <Modal
        footer={null}
        title={props.linkIndexToEdit !== undefined ? "Edit" : "Add Link"}
        open={props.isModalOpen}
        onCancel={handleCancel}
      >
        <hr />
        <div className="flex mt-5">
          <div>
            <input
              type="text"
              className="w-[264px] h-[40px] focus-visible:outline-none border border-[rgb(245 245 246)] mb-3 pl-3 rounded-md bg-gray-100"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.length > 0) {
                  setErrorTitle("");
                }
              }}
            />
            {errorTitle && (
              <p
                className="mb-3"
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "5px",
                }}
              >
                {errorTitle}
              </p>
            )}
            <input
              type="text"
              className="w-[264px] h-[40px] focus-visible:outline-none border-[rgb(245 245 246)] border bg-gray-100 pl-3 rounded-md"
              placeholder="URL"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);

                if (e.target.value.length > 0) {
                  setErrorUrl("");
                }
              }}
            />
            {errorUrl && (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "5px",
                }}
              >
                {errorUrl}
              </p>
            )}
          </div>
          <div className="ml-4">
            <ImageUpload
              value={image}
              error={errorImage}
              onChange={function (src: string): void {
                setImage(src);
                if (src.length > 0) {
                  setErrorImage("");
                }
              }}
            />
            {errorImage && (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "5px",
                }}
              >
                {errorImage}
              </p>
            )}
          </div>
        </div>

        {props.linkIndexToEdit !== undefined ? (
          <div>
            <div className="flex justify-between mt-6">
              <span>Make this an highlighted link</span>
              <label className="switch ml-4">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="flex justify-between mt-6">
              <Button
                onClick={showDeleteConfirm}
                className="text-rose-600 border-rose-600"
              >
                Delete
              </Button>
              <div>
                <span>Hide</span>
                <label className="switch ml-4">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        ) : null}

        <Button
          onClick={handleSave}
          className="bg-[linear-gradient(112.44deg,#ff5858_2.09%,#c058ff_75.22%)] text-white mt-7 w-full h-[48px] font-semibold uppercase"
        >
          Save
        </Button>
      </Modal>
    </div>
  );
};

export default ModaleLink;
