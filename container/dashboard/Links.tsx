import ModaleLink from "@/components/modaleLink/modale";
import AddSocials from "@/components/socials/AddSocials";
import { Button, Spin } from "antd";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Embed from "@/components/addEmbed/embed";
import { useRecoilState } from "recoil";
import { isLoadingState } from "@/app/dashboard/doashbroard";
const Links = (props: { listUser: any; getUser: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkIndexToEdit, setLinkIndexToEdit] = useState<number>();
  const [loading, setLoading] = useRecoilState(isLoadingState);
  const { user } = useUser(); // hook trong next/navigation dùng để lấy dữ liệu email vừa đăng nhập
  const [isModalOpenEmbed, setIsModalOpenEmbed] = useState(false);

  const showModalEmbed = () => {
    setIsModalOpenEmbed(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  // console.log(listUser?.links)
  const handleModalHeader = (index: number) => {
    setIsModalOpen(true);
    setLinkIndexToEdit(index);
  };

  return (
    <div>
      {/* <Spin spinning={loading} > */}
      <div className="mt-3 ">
        <div className="flex">
          <div>
            <Button
              onClick={showModal}
              className="font-semibold w-[424.73px] mr-4 h-[48px] hover:!text-white bg-[linear-gradient(112.44deg,#ff5858_2.09%,#c058ff_75.22%)] text-white"
            >
              + ADD LINK
            </Button>
            <ModaleLink
              linkIndexToEdit={linkIndexToEdit}
              listUser={props.listUser}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              getUser={props.getUser}
              setLinkIndexToEdit={setLinkIndexToEdit}
              user={user}
            />
          </div>
          <Button
            onClick={showModalEmbed}
            className="font-semibold w-[159.27px] hover:!text-white h-[48px] text-white bg-blue-500"
          >
            + ADD EMBED
          </Button>
          <Embed
            isModalOpenEmbed={isModalOpenEmbed}
            setIsModalOpenEmbed={setIsModalOpenEmbed}
          />
        </div>
        

        {props.listUser?.links?.map((item: any, index: any) => {
          return (
            <div key={index}>
              <div
                onClick={() => {
                  handleModalHeader(index);
                }}
                className="mt-4 flex justify-between border-none rounded-lg items-center px-[25px] bg-white w-[600px]"
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
                        {props.listUser?.username}
                      </p>
                    )}

                    <span className="text-sm line-clamp-1">{item.url}</span>
                  </div>
                </div>
                <div className="flex justify-between gap-4">
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
            </div>
          );
        })}
      </div>
      <div className="mb-10">
        <AddSocials
          listUser={props.listUser}
          getUser={props.getUser}
          user={user}
        />
      </div>
      {/* </Spin> */}
    </div>
  );
};
export default Links;
