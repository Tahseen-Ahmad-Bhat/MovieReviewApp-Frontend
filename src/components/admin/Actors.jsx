import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { deleteActor, getActors, searchActor } from "../../api/actor";
import { useNotification, useSearch } from "../../hooks";
import NextAndPrevButton from "../NextAndPrevButton";
import UpdateActor from "../modals/UpdateActor";
import AppSearchForm from "../form/AppSearchForm";
import NotFoundText from "../NotFoundText";
import ConfirmModal from "../modals/ConfirmModal";

let currentPageNo = 0;
const limit = 2;

export default function Actors() {
  const [actors, setActors] = useState([]);
  const [results, setResults] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [selectedProfile, setSelectedProfile] = useState(null);

  const { updateNotification } = useNotification();
  const { handleSearch, resetSearch, resultNotFound } = useSearch();

  const fetchActors = async (pageNo) => {
    const { profiles, error } = await getActors(pageNo, limit);
    if (error) return updateNotification("error", error);

    if (!profiles.length) {
      currentPageNo = pageNo - 1;
      setShowNextButton(false);
      return setReachedToEnd(true);
    }

    setActors([...profiles]);
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    setShowPrevButton(true);

    fetchActors(currentPageNo);
  };

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    currentPageNo -= 1;
    if (currentPageNo === 0) setShowPrevButton(false);
    if (reachedToEnd) setReachedToEnd(false);

    setShowNextButton(true);

    fetchActors(currentPageNo);
  };

  const handleOnEditClick = (profile) => {
    setShowUpdateModal(true);

    setSelectedProfile(profile);
  };

  // handlerFunction for deleting actor
  const handleOnDeleteClick = (profile) => {
    setShowConfirmModal(true);

    setSelectedProfile(profile);
  };

  // handlerFunction for handling confirm delete actor
  const handleOnDeleteConfirm = async () => {
    // setBusy(true);
    // const { id } = selectedProfile;
    // const { message, error } = await deleteActor(id);
    // setBusy(false);
    // if (error) return updateNotification("error", error);
    // updateNotification("success", message);
    // hideConfirmModal();
    // // refreshing the UI after deleting an actor
    // fetchActors(currentPageNo);
  };

  const hideUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleOnSearchSubmit = (value) => {
    handleSearch(searchActor, value, setResults);
    console.log(value);
  };

  // for resetting the results both in this and search provider components
  const handleSearchFormReset = (value) => {
    resetSearch();
    setResults([]);
  };

  // function to update UI instantaneously after editing any actor
  const handleOnActorUpdate = (profile) => {
    const updatedActors = actors.map((actor, index) =>
      actor.id === profile.id ? (actors[index] = profile) : actor
    );
    setActors([...updatedActors]);
  };

  useEffect(() => {
    fetchActors(currentPageNo);
  }, []);

  return (
    <>
      <div className="p-5">
        <div className="flex justify-end mb-5">
          <AppSearchForm
            placeholder="Search Actors..."
            onSubmit={handleOnSearchSubmit}
            showResetIcon={results.length || resultNotFound}
            onReset={handleSearchFormReset}
          />
        </div>

        <NotFoundText text="Record not found!" visible={resultNotFound} />

        <div className="grid grid-cols-2 gap-5">
          {results.length || resultNotFound
            ? results.map((actor) => (
                <ActorProfile
                  profile={actor}
                  key={actor.id}
                  onEditClick={() => handleOnEditClick(actor)}
                  onDeleteClick={() => handleOnDeleteClick(actor)}
                />
              ))
            : actors.map((actor) => (
                <ActorProfile
                  profile={actor}
                  key={actor.id}
                  onEditClick={() => handleOnEditClick(actor)}
                  onDeleteClick={() => handleOnDeleteClick(actor)}
                />
              ))}
        </div>

        {!results.length && !resultNotFound ? (
          <NextAndPrevButton
            className="mt-5"
            onNextClick={handleOnNextClick}
            onPrevClick={handleOnPrevClick}
            showNextBtn={showNextButton}
            showPrevBtn={showPrevButton}
          />
        ) : null}
      </div>

      <UpdateActor
        visible={showUpdateModal}
        onClose={hideUpdateModal}
        actorToUpdate={selectedProfile}
        onActorUpdate={handleOnActorUpdate}
      />

      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure?"
        subtitle="This action is going to remove this actor permanently!"
        busy={busy}
        onCancel={hideConfirmModal}
        onConfirm={handleOnDeleteConfirm}
      />
    </>
  );
}

const ActorProfile = ({ profile, onEditClick, onDeleteClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const acceptedNameLength = 15;

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };

  if (!profile) return null;

  const formatName = (name) => {
    if (name.length <= acceptedNameLength) return name;

    return name.substring(0, acceptedNameLength) + "...";
  };
  const { name, avatar, about = "" } = profile;

  return (
    <div className="bg-white shadow dark:bg-secondary rounded h-20  overflow-hidden">
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className="flex cursor-pointer relative h-full"
      >
        <img
          className="w-20 aspect-square object-cover"
          src={avatar}
          alt={name}
        />
        <div className="px-2">
          <h1 className="text-xl text-primary dark:text-white font-semibold whitespace-nowrap">
            {formatName(name)}
          </h1>
          <p className="text-primary dark:text-white opacity-70">
            {about.substring(0, 50)}
          </p>
        </div>

        <Options
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          visible={showOptions}
        />
      </div>
    </div>
  );
};

const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null;
  return (
    <div className="h-full absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex items-center justify-center space-x-5">
      <button
        onClick={onDeleteClick}
        className="p-2 rounded-full bg-white text-primary hover:bg-red-600 transition
  "
        type="button"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEditClick}
        className="p-2 rounded-full bg-white text-primary hover:bg-green-500 transition
  "
        type="button"
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};
