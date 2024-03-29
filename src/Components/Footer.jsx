import React from "react";
import { useSelector } from "react-redux";
const Footer = () => {
  const gradientColor = useSelector((state) => state.color.gradientColor);
  const accentColor = (gradientColor) => ({
    position: `absolute`,
    width: `100%`,
    height: `150px`,
    left: `0px`,
    bottom: `0px`,
    background: `#${gradientColor}`,
    filter: `blur(100px)`,
    zIndex: `-99999`,
  });
  const Contributors = [
    { key: 1, name: "Ayush Chauhan" },
    { key: 2, name: "Ashutosh Sharma" },
    { key: 3, name: "Chiranjeev patel" },
    { key: 4, name: "Aryan Bhaskar" },
  ];
  const techUsed = [
    { key: 1, name: "React" },
    { key: 2, name: "Redux" },
    { key: 3, name: "Tailwind CSS" },
    { key: 4, name: "Figma" },
  ];
  return (
    <div className="flex relative h-[200px] w-full bg-transparent bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10  text-white  font-poppins z-20 ">
      <div className="-z-30" style={accentColor(gradientColor)}>
        {" "}
      </div>
      <div className="container mx-[200px] p-6  flex flex-row justify-between mt-2">
        <div>
          <div className="font-poppins text-[25px] font-semibold tracking-wide mb-3">
            Contributors
          </div>
          <div>
            {Contributors.map((Contributor) => {
              return (
                <p className="text-gray-400 font-poppins" key={Contributor.key}>
                  {Contributor.name}
                </p>
              );
            })}
          </div>
        </div>
        <div>
          <div className="font-poppins text-[25px] font-semibold tracking-wide mb-3">
            Technology Used
          </div>
          <div>
            {techUsed.map((tech) => {
              return (
                <p className="text-gray-400" key={tech.key}>
                  {tech.name}
                </p>
              );
            })}
          </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Footer;
