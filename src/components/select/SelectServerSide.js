import React from "react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";

const SelectServerSide = ({ loadOptions, ...otherProps }) => {
  const formatOptionLabel = ({ title_goals }) => (
    <div>
      <div className="clearfix" />
      <div>{title_goals}</div>
    </div>
  );

  return (
    <AsyncSelect
      cacheOptions={false}
      defaultOptions
      classNamePrefix="react-select"
      loadOptions={loadOptions}
      formatOptionLabel={formatOptionLabel}
      // components={{ }}
      {...otherProps}
    />
  );
};

export default SelectServerSide;
