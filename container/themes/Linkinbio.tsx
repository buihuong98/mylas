import { Themes, themes } from "@/libs/theme";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";



const LinkInBio = (props: {listUser: any, getUser: any}) => {
  const [themeId, setThemeId] = useState<number>();
  const { user } = useUser(); // hook trong next/navigation dùng để lấy dữ liệu email vừa đăng nhập
  
  useEffect (() => {
    if(props.listUser.themeID){
      setThemeId(props.listUser.themeID)
    }
  }, [props.listUser])

  // console.log('listUser', props.listUser)
  const handleThemes = async(id: Themes['id']) => {
    setThemeId(id);

    await axios.put(`/api/bio/${user?.username}`,{themeID : id,})
    props.getUser()
  };

 
  return (
    <div className="flex gap-3 w-full mt-5">
      {themes.map((item, index) => {
        return (
          <div key={index}>
            <div
              className={`w-[169.33px] h-[212px] flex justify-center items-center ${
                themeId === item.id
                  ? " border-[2px] border-blue-400 rounded-xl"
                  : ""
              }`}
            >
              <div
                className="w-[157.33px] h-[200px]  border rounded-lg"
                style={{ background: item.background }}
                onClick={() => {
                  handleThemes(item.id)
                }}
              >
                <div className="pt-40px relative">
                  <button className=" w-[114px] h-5 bg-[#f1f2f5] top-[40px] left-[22px] absolute mb-[8px] border rounded-full"></button>
                  <button className=" w-[114px] h-5 bg-[#f1f2f5] top-[70px] left-[22px] absolute mb-[8px] border rounded-full"></button>
                  <button className=" w-[114px] h-5 bg-[#f1f2f5] top-[100px] left-[22px] absolute mb-[8px] border rounded-full"></button>
                  <button className=" w-[114px] h-5 bg-[#f1f2f5] top-[130px] left-[22px] absolute mb-[8px] border rounded-full"></button>
                </div>
              </div>
            </div>
            <span className="mt-3">{item.type}</span>
          </div>
        );
      })}

    </div>
  );
};

export default LinkInBio;
