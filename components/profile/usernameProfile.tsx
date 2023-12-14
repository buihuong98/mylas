import Link from "next/link";
const UsernameProfile = (props: {
  listUser: any;
  size?: "nornal" | "large";
}) => {
  const { size = "nornal" } = props;
  return (
    <div className="w-full">
      <span>
        <i className="fa-solid fa-arrow-up-from-bracket w-[20px] h-[20px] ml-[18px] mt-[20px]"></i>
      </span>

      <div className={`flex flex-col justify-center items-center mt-7 gap-5`}>
        <div className="flex flex-col justify-center items-center gap-2">
          <img
            className="w-[96px] h-[96px] object-cover rounded-full"
            src={props.listUser?.avatar}
            alt="no Image"
          />
          <span className="text-[16px] font-bold">
            {props.listUser?.username}
          </span>
        </div>

        <div className="flex gap-5">
          {props.listUser?.socials?.map((item: any, index: any) => {
            return (
              <div key={index}>
                <span className="text-xl">
                  <i className={`${item.icon}`}></i>
                </span>
              </div>
            );
          })}
        </div>

        {props.listUser?.links?.map((item: any, index: any) => {
          return (
            <Link
              key={index}
              href={item.url}
              className={`flex border rounded-full w-full relative ${
                size === "nornal" ? "h-10" : "h-[60px]"
              }  shadow-sm items-center gap-[37px] text-center justify-center`}
            >
              {item.image && (
                <img
                  className={`${size === "large" ? "h-[54px] w-[54px]" : "h-[34px] w-[34px]"}  absolute left-[2px] top-[2px] rounded-full object-cover`}
                  src={item?.image}
                  alt=""
                />
              )}

              <span>{item?.title || props.listUser?.username}</span>
            </Link>
          );
        })}

        <span>LOGO</span>
      </div>
    </div>
  );
};

export default UsernameProfile;
