import Form from "next/form";
import React from "react";
import SearchReserbtn from "./SearchReserbtn";
import { SearchIcon } from "lucide-react";

const SearchForm = ({query}:{query?:string}) => {
  console.log(query)
  return (
    <Form action={"/"} scroll={false} className="search-form">
        <input
          name="query"
          defaultValue={query}
          className="search-input"
          placeholder="Search startups"
        />
      <div className=" flex gap-2 ">
        {query && <SearchReserbtn />}
        <button type="submit" className="search-btn text-white "><SearchIcon/></button>
      </div>
    </Form>
  );
};

export default SearchForm;
