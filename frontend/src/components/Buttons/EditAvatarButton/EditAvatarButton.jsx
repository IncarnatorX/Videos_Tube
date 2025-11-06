import { useAvatarStore } from "../../../store/avatarStore";

const EditAvatarButton = () => {
  const { setAvatarFile, setAvatarPreviewFile } = useAvatarStore(
    (store) => store
  );

  return (
    <>
      <input
        type="file"
        name="avatar"
        id="avatar"
        accept="image/jpg image/png"
        className="hidden"
        onChange={(e) => {
          const file = e.target?.files[0];
          // console.log("FILE", file);
          setAvatarFile(file);
          setAvatarPreviewFile(URL.createObjectURL(file));
          e.target.value = null; // required since selecting the same file will not trigger onChange
        }}
      />
      <label
        htmlFor="avatar"
        className="flex items-center justify-center gap-2 bg-red-500 py-2 px-4 rounded-md cursor-pointer mb-2 w-fit"
      >
        <img
          src="/icons/edit-icon.svg"
          alt="Edit icon"
          className="hidden lg:block"
        />
        <span>Edit Avatar</span>
      </label>
    </>
  );
};

export default EditAvatarButton;
