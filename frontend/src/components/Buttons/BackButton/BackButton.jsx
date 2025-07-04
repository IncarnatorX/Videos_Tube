import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="w-fit">
      <button
        onClick={() => navigate(-1)}
        className="group flex justify-center items-center h-12 w-24 bg-[#eeeeee4b] rounded-sm tracking-wide transition-all duration-200 ease-in-out border-0 text-black ml-2.5 gap-2 self-start cursor-pointer hover:shadow-[3px_3px_5px_#292828,_-3px_-3px_3px_#a75353] hover:-translate-x-0.5"
      >
        <svg
          height="16"
          width="16"
          className="mx-1.5 text-xl transform transition-all duration-200 ease-in-out group-hover:text-xl group-hover:-translate-x-1.5"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 1024 1024"
        >
          <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
        </svg>
        <span className="text-black">Back</span>
      </button>
    </div>
  );
};

export default BackButton;
