type Themes = { background: string, type: string };

const themes: Themes[] = [
  { background: "#fff", type: "Basic" },
  {
    background: "#000",
    type: "Carbon",
  },
];
const LinkInBio = () => {
  return (
    <div className="flex gap-3 w-full mt-5">
      {themes.map((item, index) => {
        return (
          <div key={index}>
            <div className="w-[157.33px] h-[200px] border rounded-lg">
              <div className="pt-40px relative">
                <button className=" w-[114px] h-5 bg-[#f1f2f5] top-[40px] left-[22px] absolute mb-[8px] last:-mb-0" ></button>
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
