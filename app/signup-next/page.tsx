"use client";

import { ImageUpload } from "@/components/inputs/image-upload";
import { UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState(""); // lưu trữ dữ liệu ban đầu của name
  const [errorName, setErrorName] = useState(""); // lưu trữ lỗi ban đầu của name là rỗng
  const [errorImage, setErrorImage] = useState("");
  const [linkName, setLinkName] = useState("");
  const [errorLinkName, setErrorLinkName] = useState("");
  const [url, setUrl] = useState("");
  const [errorUrl, setErrorUrl] = useState("");

  // state lưu trạng thái của button
  const [inputParirs, setInputParirs] = useState([
    { id: 1, input1: "", input2: "" },
  ]);

  const { push } = useRouter(); // hook trong next dùng để chuyển trang
  const { user } = useUser(); // hook trong next/navigation dùng để lấy dữ liệu email vừa đăng nhập
  // console.log("userId", user);

  const addInputPart = () => {
    //sét biến InputParirs bằng 1 callback nhan dau vao la mảng objet,
    setInputParirs((prevPairs) => [
      ...prevPairs, // trả về 1 mảng object đã nhận và khi ấn vào nút add thì trả về thêm 1 object
      {
        id: prevPairs.length + 1,
        input1: "",
        input2: "",
      },
    ]);
  };

  const handleInputChange = (id: any, inputType: any, value: any) => {
    // id là giá trị duy nhấtđại diện cho cặp ô input,
    // inputType là chuỗi chỉ định loại input mà bạn muốn thay đổi giá trị: input1 or input2, value: giá trị mới của ô input

    setInputParirs(
      (
        prevPairs // sét InputParirs  dùng hàm map để tạo mảng mới (prevPairs k bị thay đổi)
      ) =>
        //
        prevPairs.map((pair) =>
          // nếu pair.id === id thì nó trả về 1 cặp giá trị mới với giá trị của InputType đc cập nhật thành value,
          //ngược lại nó sẽ giữ nguyên cặp ô input đó
          pair.id === id ? { ...pair, [inputType]: value } : pair
        )
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault(); // ngăn chặn hành động mặc định của sự kiện submit(ví dụ: k làm cho trang web reload)
    // sau khi ấn nút submit nếu k có nội dung name thì setErrorName báo lỗi
    if (!name) {
      setErrorName("Please enter your name");
    }

    if (!image) {
      setErrorImage("Please upload a profile image");
    }

    if (!url) {
      setErrorUrl("Please add at least one link to continue");
    }
    // Biểu thức chính quy kiểm tra đường link hợp lệ
    var linkPattern =
      /^(http(s)?:\/\/)(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\.[a-zA-Z]{2,})?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    // Kiểm tra đường link
    if (url && !linkPattern.test(url)) {
      setErrorUrl("Invalid URL");
    }
    const data = {
      // lưu dữ liệu người dùng nhập lên server dùng axios.post(api và dữ liệu truyền vào muốn lưu trữ)
      username: user?.username,
      name: name,
      avatar: image,
      links: [
        {
          url: url,
        },
      ],
    };

    senDataToServer(data);
  };
  const senDataToServer = async (data: any) => {
    try {
      const response = await axios.post("/api/bio", data);
      // console.log('response.status', response.status)
      if (response.status === 200) {
        push("/dashboard"); // nếu gửi dữ liệu lên server thành công thì chuyển trang
      } else {
        console.error("Yêu cầu không thành công", response.status);
      }
    } catch (error) {
      // Xử lý lỗi kết nối hoặc lỗi từ server
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between px-5 py-5">
        <span>LOGO</span>
        <div className="flex gap-2">
          {/* <span>{user?.primaryEmailAddress?.emailAddress}</span> */}
          {/* userButton là icon thư viện clerk viết sẵn sau khi đăng nhập */}
          <UserButton />
          <span>
            <i className="fa-solid fa-chevron-down"></i>
          </span>
        </div>
      </div>
      <div className="max-w-[480px] mx-auto">
        <div className="mb-[24px] flex flex-col items-center">
          <span className="font-inter font-bold text-blDark text-[24px]">
            Setup your page
          </span>

          <span className="text-sm">{user?.username} 🎉</span>
        </div>
        <div className="bg-white border-none rounded-lg px-[32px] py-[32px] ">
          <div className="flex gap-6">
            <div>
              <ImageUpload
                value={image}
                error={errorImage}
                onChange={function (src: string): void {
                  //chạy dòng 129 sau khi lấy đc url của ảnh, component đc render lại thì value= url ảnh, truyền vào componed con
                  setImage(src);
                }}
              />
            </div>

            <div>
              <input
                className={`${
                  errorName ? "border-rose-500 border bg-white" : ""
                } mt-2 w-[278px] h-[40px] bg-[#f0f0f0] focus-visible:outline-none px-3 py-1 text-sm`}
                type="text"
                placeholder="Your name"
                onChange={(e) => {
                  setName(e.target.value); // lấy dữ liệu khi người dùng nhập

                  if (e.target.value.length > 0) {
                    setErrorName("");
                  }
                }}
              />

              {/* nếu có lỗi thì hiện thị dòng chữ sau khi ấn nút get started */}
              {errorName && (
                <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                  {errorName}
                </p>
              )}

              <input
                className="border-none mt-3 w-[278px] h-[40px] bg-[#f0f0f0] focus-visible:outline-none px-3 py-1 text-sm"
                type="text"
                placeholder="bio"
              />
            </div>
          </div>
          {errorImage && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {errorImage}
            </p>
          )}

          <div className="mt-[32px]">
            <p className="font-semibold">Add your first link</p>
            {inputParirs.map((pair) => (
              <div
                key={pair.id}
                className={`${
                  errorUrl ? "border-rose-600 border" : ""
                } border-[1px] px-3 mt-4`}
              >
                <input
                  className="w-[390px] h-[45px] border-none focus-visible:outline-none  "
                  type="text"
                  placeholder="Link name (My Instagram)"
                  value={pair.input1}
                  onChange={(e) => {
                    setLinkName(e.target.value); // lấy dữ liệu khi người dùng nhập
                    handleInputChange(pair.id, "input1", e.target.value);
                    if (e.target.value.length > 0) {
                      // set đk nếu value >0 thì setError("")
                      setErrorLinkName("");
                    }
                  }}
                />
                <hr />
                <input
                  className="w-[390px] h-[45px] border-none focus-visible:outline-none  "
                  type="text"
                  placeholder="URL (https://instagram.com/yourname)"
                  value={pair.input2}
                  onChange={(e) => {
                    setUrl(e.target.value); // lấy dữ liệu khi người dùng nhập
                    handleInputChange(pair.id, "input2", e.target.value);
                    if (e.target.value.length > 0) {
                      setErrorUrl("");
                    }
                  }}
                />
              </div>
            ))}
            {/* nếu có lỗi thì hiện thị dòng chữ sau khi ấn nút get started */}

            {errorUrl && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {errorUrl}
              </p>
            )}
          </div>
          <div className="mt-[16px] text-[14px] text-sky-400">
            <button onClick={addInputPart}>+ Add another link</button>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-[24px] w-full h-[40px] bg-[linear-gradient(112.44deg,#ff5858_2.09%,#c058ff_75.22%)] text-white rounded-md"
          >
            GET STARTED
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
