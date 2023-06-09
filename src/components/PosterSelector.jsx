import React from "react";

const commonPosterUI =
  "flex justify-center items-center border border-dashed rounded aspect-video dark:border-dark-subtle border-light-subtle cursor-pointer";

export default function PosterSelector({
  name,
  accept,
  selectedPoster,
  className,
  label,
  onChange,
}) {
  //   console.log(selectedPoster);
  return (
    <div>
      <input
        accept={accept}
        name={name}
        onChange={onChange}
        type="file"
        id={name}
        hidden
      />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img
            className={commonPosterUI + " object-cover " + className}
            src={selectedPoster}
            alt=""
          />
        ) : (
          <PosterUI className={className} label={label} />
        )}
      </label>
    </div>
  );
}

const PosterUI = ({ className, label }) => {
  return (
    <div className={commonPosterUI + " " + className}>
      <span className="dark:text-dark-subtle text-light-subtle">{label}</span>
    </div>
  );
};
