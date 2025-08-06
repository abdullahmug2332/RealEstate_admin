import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full h-screen bg-[#1E1E22] flex items-center justify-center fixed top-0 right-0 " style={{ zIndex: 99 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 99
        }}
      >
        <div>
          <p className="text-white mb-[10px] text-[20px] font-medium">PLease Wait ......</p>
          <TailSpin
            height="70"
            width="70"
            color="#ffffffff"
            ariaLabel="tail-spin-loading"
            radius="3"
            visible={true}
          />
        </div>

      </div>
    </div>
  );
};

export default Loader;
