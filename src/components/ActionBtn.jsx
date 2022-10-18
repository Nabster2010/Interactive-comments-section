const ActionBtn = ({ setEditMode, openConfirmModal }) => {
  return (
    <div className="absolute bottom-8 md:bottom-auto md:top-8 right-6 flex justify-center items-center gap-4 ">
      <button
        onClick={openConfirmModal}
        className="flex justify-center items-center gap-2 text-SoftRed hover:text-PaleRed group transition"
      >
        <span>
          <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              className="group-hover:fill-PaleRed transition"
              d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
              fill="#ED6368"
            />
          </svg>
        </span>
        <span>Delete</span>
      </button>
      <button
        onClick={() => setEditMode(true)}
        className="flex justify-center items-center gap-2 text-ModerateBlue hover:text-LightGrayishBlue transition group"
      >
        <span>
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              className="group-hover:fill-LightGrayishBlue transition"
              d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
              fill="#5357B6"
            />
          </svg>
        </span>
        <span>Edit</span>
      </button>
    </div>
  );
};
export default ActionBtn;
