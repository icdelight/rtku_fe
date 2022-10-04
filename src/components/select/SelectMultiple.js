import React from "react";
import Select from "react-select";

const SelectMultiple = ({ options = [], onChange, value, ...otherProps }) => {
  return (
    <Select
      classNamePrefix="react-select"
      isMulti
      options={options}
      onChange={onChange}
      value={value}
      {...otherProps}
    />
  );
};

export default SelectMultiple;
