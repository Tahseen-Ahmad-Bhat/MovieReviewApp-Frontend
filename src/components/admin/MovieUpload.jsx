import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNotification } from "../../hooks";
import { uploadMovie, uploadTrailer } from "../../api/movie";
import MovieForm from "./MovieForm";
import ModalContainer from "../modals/ModalContainer";

export default function MovieUpload({ visible, onClose }) {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [videoInfo, setVideoInfo] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const resetStates = () => {
    setVideoSelected(false);
    setVideoUploaded(false);
    setUploadProgress(0);
    setVideoInfo({});
  };

  const handleUploadTrailer = async (data) => {
    const { error, url, public_id } = await uploadTrailer(
      data,
      setUploadProgress
    );
    if (error) return updateNotification("error", error);
    setVideoUploaded(true);

    setVideoInfo({ url, public_id });
  };

  console.log(videoInfo);

  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("video", file);

    setVideoSelected(true);

    handleUploadTrailer(formData);
  };

  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing";
    }

    return `Upload progress ${uploadProgress}`;
  };

  const handleSubmit = async (data) => {
    if (!videoInfo.url || !videoInfo.public_id)
      return updateNotification("error", "Trailer is missing!");

    setBusy(true);
    data.append("trailer", JSON.stringify(videoInfo));

    const { error, movie } = await uploadMovie(data);
    setBusy(false);
    // console.log(res);
    if (error) return updateNotification("error", error);

    updateNotification("success", movie.message);
    resetStates();
    onClose();
  };

  return (
    <ModalContainer visible={visible}>
      <div className="mb-5">
        <UploadProgress
          visible={!videoUploaded && videoSelected}
          message={getUploadProgressValue()}
          width={uploadProgress}
        />
      </div>

      {!videoSelected ? (
        <TrailerSelector
          visible={!videoSelected}
          onTypeError={handleTypeError}
          handleChange={handleChange}
        />
      ) : (
        <MovieForm
          busy={busy}
          onSubmit={!busy ? handleSubmit : null}
          btnTitle="Upload"
        />
      )}
    </ModalContainer>
  );
}

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;

  return (
    <div className="h-full flex items-center justify-center ">
      <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]}
      >
        <label className="w-48 h-48 border border-dashed  border-light-subtle rounded-full flex flex-col items-center justify-center dark:text-dark-subtle text-secondary">
          <AiOutlineCloudUpload size={80} />
          <p>Drop your file here</p>
        </label>
      </FileUploader>
    </div>
  );
};

const UploadProgress = ({ width, message, visible }) => {
  if (!visible) return null;
  return (
    <div className="dark:bg-primary bg-white drop-shadow-lg rounded p-3">
      <div className="relative h-3 dark:bg-dark-subtle bg-light-subtle overflow-hidden rounded">
        <div
          style={{ width: width + "%" }}
          className="h-full w-14 absolute left-0 dark:bg-white bg-secondary"
        />
      </div>
      <p className="font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1">
        {message}
      </p>
    </div>
  );
};
