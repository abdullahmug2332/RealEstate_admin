

const Loader = () => {
  return (
    <div className="loader-container flex-col !fixed w-full top-0 left-0">
      <div className="loader"></div>
      <p className="mt-[10px] font-semibold">Please wait...</p>
    </div>
  );
};

export default Loader;
