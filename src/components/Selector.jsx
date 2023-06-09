import React from "react";

export default function Selector({ name, value, onChange, label, options }) {
  return (
    <select
      className="border-2 bg-white dark:bg-secondary dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary p-1 pr-10 rounded outline-none transition bg-transparent dark:text-dark-subtle text-light-subtle dark:focus:text-white focus:text-primary"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="">{label}</option>
      {options.map(({ title, value }) => {
        return (
          <option key={title} value={value}>
            {title}
          </option>
        );
      })}
    </select>
  );
}
