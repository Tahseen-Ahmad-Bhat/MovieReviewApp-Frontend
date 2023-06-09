import React, { useEffect, useState } from "react";
import { commonInputClasses } from "../../utils/theme";
import PosterSelector from "../PosterSelector";
import Selector from "../Selector";
import { useNotification } from "../../hooks";
import { ImSpinner3 } from "react-icons/im";

const defaultActorInfo = {
  name: "",
  about: "",
  avatar: null,
  gender: "",
};

const genderOptions = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
  { title: "Other", value: "other" },
];

const validateActor = ({ name, about, avatar, gender }) => {
  if (!name.trim()) return { error: "Actor name is missing!" };

  if (!about.trim()) return { error: "About section is missing!" };

  if (!gender.trim()) return { error: "Actor gender is missing!" };

  if (avatar && !avatar.type?.startsWith("image"))
    return { error: "Invalid image/avatar file!" };

  return { error: null };
};

export default function ActorForm({
  title,
  btnTitle,
  busy,
  onSubmit,
  actorToUpdate,
}) {
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
  const [selectedAvatarForUI, setSelectedAvatarForUI] = useState("");

  const { updateNotification } = useNotification();

  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedAvatarForUI(url);
    // console.log(url);
  };

  const handleChange = ({ target }) => {
    const { value, files, name } = target;

    if (name === "avatar") {
      const file = files[0];
      updatePosterForUI(file);

      return setActorInfo({ ...actorInfo, avatar: file });
    }

    setActorInfo({ ...actorInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(actorInfo);

    const { error } = validateActor(actorInfo);

    if (error) return updateNotification("error", error);

    // Submit form
    const formData = new FormData();
    for (let key in actorInfo) {
      if (key) formData.append(key, actorInfo[key]);
    }

    onSubmit(formData);

    // setActorInfo({ ...defaultActorInfo });
    // setSelectedAvatarForUI("");
  };

  useEffect(() => {
    console.log(actorToUpdate);
    if (actorToUpdate) {
      setActorInfo({ ...actorToUpdate, avatar: null });
      setSelectedAvatarForUI(actorToUpdate.avatar);
    }
  }, [actorToUpdate]);

  return (
    <form
      className="dark:bg-primary bg-white p-3 w-[35rem] rounded"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-semiblod text-xl dark:text-white text-primary">
          {title}
        </h1>
        <button
          type="submit"
          className="h-8 w-24 bg-primary dark:bg-white text-white dark:text-primary hover:opacity-80 transition rounded flex items-center justify-center "
        >
          {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
        </button>
      </div>
      <div className="flex space-x-2">
        <PosterSelector
          accept="image/jpg, image/jpeg, image/png"
          selectedPoster={selectedAvatarForUI}
          className="w-36 h-36 aspect-square object-cover"
          label="Select Avatar"
          name="avatar"
          onChange={handleChange}
        />
        <div className="flex-grow flex flex-col space-y-2">
          <input
            placeholder="Enter Name"
            type="text"
            className={commonInputClasses + " border-b-2"}
            name="name"
            value={actorInfo.name}
            onChange={handleChange}
          />
          <textarea
            placeholder="About"
            className={commonInputClasses + " border-b-2 resize-none h-full"}
            name="about"
            value={actorInfo.about}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <div className="mt-3">
        <Selector
          options={genderOptions}
          label="Gender"
          value={actorInfo.gender}
          onChange={handleChange}
          name="gender"
        />
      </div>
    </form>
  );
}
