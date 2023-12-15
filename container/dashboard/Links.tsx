import ModaleLink from "@/components/modaleLink/modale";
import AddSocials from "@/components/socials/AddSocials";
import { Button } from "antd";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
const Links = (props: {listUser: any,getUser: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [linkIndexToEdit, setLinkIndexToEdit] = useState<number>();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser(); // hook trong next/navigation dùng để lấy dữ liệu email vừa đăng nhập
  
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
              listUser={props.listUser}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              getUser={props.getUser}
              setLinkIndexToEdit={setLinkIndexToEdit}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              user={user}
            />
          </div>
          <Button className="font-semibold w-[159.27px] h-[48px] text-white bg-blue-500">
            + ADD EMBED
          </Button>
        </div>
        <div className="mt-[24px] font-semibold">+ Add header</div>

        {props.listUser?.links?.map((item: any, index: any) => {
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
                      <p className="font-semibold">{props.listUser?.username}</p>
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
      <AddSocials listUser={props.listUser} getUser={props.getUser} user={user} />
    </div>
  );
};
export default Links;
