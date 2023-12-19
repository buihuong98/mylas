"use client";
import UsernameProfile from "@/components/profile/usernameProfile";

const Username = (props: {
  data: any,
  theme: any | undefined
}) => {

  // console.log('listUser', data?.themeID)
  return (
    <div style={{ background: props.theme?.background }}>
      <div className="max-w-[680px] mx-auto h-[100vh]">
       
          <UsernameProfile size="large" listUser={props.data} theme={props.theme} />
        
      </div>
    </div>
  );
};
export default Username;
