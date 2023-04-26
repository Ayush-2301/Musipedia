import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
const Searchbar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (value === "") {
        navigate("/");
      } else {
        navigate(`/search/${value}`);
      }
    }, 1000);

    return () => {
      clearTimeout(debounce);
    };
  }, [value]);

  function handleChange(e) {
    const newValue = e.target.value;
    setValue(newValue);
  }
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search/${value}`);
  }

  // function handleChange(e) {
  //   const newValue = e.target.value;
  //   setValue(newValue);
  //   if (newValue === "") {
  //     navigate("/");
  //   } else {
  //     navigate(`search/${newValue}`);
  //   }
  // }

  return (
    <form autoComplete="off" onSubmit={handleSubmit} onChange={handleChange}>
      <div className="flex flex-row justify-center items-center py-1  bg-gray-400 rounded-full bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5">
        <FiSearch
          onClick={handleSubmit}
          className="w-8 h-8 ml-2 mr-1 hover:cursor-pointer hover:bg-gray-400  rounded-full p-1"
        />
        <input
          autoComplete="off"
          placeholder="Search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="bg-transparent placeholder:text-lg  placeholder:text-white border-none outline-none"
        />
      </div>
    </form>
  );
};

export default Searchbar;
