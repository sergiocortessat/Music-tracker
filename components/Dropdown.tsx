/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

interface Props {
  listOfGenres: {
    name: string;
    id: number;
  }[];
  label: string;
  changed: (value: string) => void;
  selectedValue: string;

}

const Dropdown = ({
  label, listOfGenres, changed, selectedValue,
}: Props) => {
  const x = 0;
  const handleChange = (event: any) => {
    event.preventDefault();
    changed(event.target.value);
  };
  console.log(label, listOfGenres);
  return (

    <div className="col-sm-6 form-group row px-0">
      <label className="form-label col-sm-2" htmlFor="select-genre">{label}</label>
      <select id="select-genre" value={selectedValue} onChange={(e) => handleChange(e)} className="form-control form-control-sm col-sm-10">
        <option key={0}>Select...</option>
        {listOfGenres.map((item, idx) => (
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
