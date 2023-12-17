import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useState } from "react";

type Themes = { background: string; type: string; id: number; textcolor: string, shadow: string };

export const themes: Themes[] = [
  { id: 1, background: "#fff", type: "Basic", textcolor: "#000", shadow: "shadow-sm", },
  {
    id: 2,
    background: "#000",
    type: "Carbon",
    textcolor: "#fff",
    shadow: "",
   
  },
];

const LinkInBio = (props: {listUser: any, getUser: any}) => {
  const [backgroundTheme, setBackgroundTheme] = useState<number>();
  const { user } = useUser(); // hook trong next/navigation dùng để lấy dữ liệu email vừa đăng nhập
  
  
  // console.log('listUser', props.listUser)
  const handleThemes = async(index: number) => {
    setBackgroundTheme(index);

    await axios.put(`/api/bio/${user?.username}`,{themeID : themes[index].id,})
    props.getUser()
  };

  // console.log("backgroundTheme", backgroundTheme);
  return (
    <div className="flex gap-3 w-full mt-5">
      {themes.map((item, index) => {
        return (
          <div key={index}>
            <div
              className={`w-[169.33px] h-[212px] flex justify-center items-center ${
                index === backgroundTheme
                  ? " border-[2px] border-blue-400 rounded-xl"
                  : ""
              }`}
            >
              <div
                className="w-[157.33px] h-[200px]  border rounded-lg"
                style={{ background: item.background }}
                onClick={() => {
                  handleThemes(index);
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
