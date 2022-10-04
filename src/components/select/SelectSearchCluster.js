import React from "react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";

const SelectSearchCluster = ({ loadOptions, ...otherProps }) => {

    const formatOptionLabel = ({ nama_cluster }) => (
      <div>
        <div className="clearfix" />
        <div>{nama_cluster}</div>
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
  
  export default SelectSearchCluster;