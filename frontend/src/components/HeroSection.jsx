import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 mt-10 my-5">
        <span className=" mx-auto px-4 py-2 rounded-full bg-[#DBD8E3] text-[#5C5470] font-medium">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold leading-tight whitespace-pre-wrap text-[#a294c5]">
          Search, Apply & <br />
          Get Your <span className="text-[#c5b4ef]">Dream Jobs</span>
        </h1>
        <p className="text-[#a294c5]">
          Explore limitless job opportunities, apply with confidence, and secure
          your ideal position !!
        </p>
        <div className="flex w-[40%] border-2 border-solid border-[#DBD8E3] pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />
          <Button
            onClick={searchJobHandler}
            className=" bg-[#DBD8E3] rounded-r-full"
            style={{ minWidth: "unset", height: "auto" }}
          >
            <Search className=" text-black bg-[#DBD8E3]" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
