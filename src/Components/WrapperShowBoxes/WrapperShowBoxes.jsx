const WrapperShowBoxes = ({ children }) => {
  return (
    <div className="fixed inset-0 w-full h-screen  bg-[#000000b7]   z-60  flex justify-center items-center overflow-y-auto">
      <div className="w-[340px] md:w-[500px]  bg-white rounded-md border border-gray-200 mt-10 md:mt-5  max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default WrapperShowBoxes;
