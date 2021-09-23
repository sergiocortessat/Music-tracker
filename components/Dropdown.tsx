/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

interface Props {
  listOfItems: {
    name: string;
    id: number;
  }[];
  label: string;
  changed: (value: string) => void;
  selectedValue: string;

}

const Dropdown = ({
  label, listOfItems, changed, selectedValue,
}: Props) => {
  const handleChange = (event: any) => {
    event.preventDefault();
    changed(event.target.value);
  };
  return (

    <div className="form">
      <label className="form-label" htmlFor="select-genre">{label}</label>
      <select id="select-genre" value={selectedValue} onChange={(e) => handleChange(e)} className="form-control">
        <option key={0}>Select...</option>
        {listOfItems.map((item, idx) => (
          <option
            key={idx + 1}
            value={item.id}
          >
            {item.name}
          </option>
        ))}
      </select>
    </div>

  );
};

export default Dropdown;
