const howManyBoxIsShowing = 3;

const ShowHideBoxesButton = ({ events, setShowMoreBox, showMoreBox }) => {
  return (
    <div className="flex flex-col md:flex-row  justify-center items-center gap-5  my-4">
      {showMoreBox > 3 && (
        <button
          className="font-bold px-5 py-2.5 rounded-2xl bg-[#14b8a6] text-white w-[250px]  cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setShowMoreBox(3);
          }}>
          show Less
        </button>
      )}
      <button
        className="font-bold px-5 py-2.5 rounded-2xl bg-[#14b8a6] text-white w-[250px] cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setShowMoreBox((prev) => {
            const howManyClick =
              Math.floor(events.length / howManyBoxIsShowing) * howManyBoxIsShowing;
            const leftBoxes = events.length % howManyBoxIsShowing;
            return prev < events.length
              ? leftBoxes !== 0
                ? prev <= howManyClick
                  ? prev + howManyBoxIsShowing
                  : prev + leftBoxes
                : prev + howManyBoxIsShowing
              : events.length;
          });
        }}>
        show more
      </button>
    </div>
  );
};

export default ShowHideBoxesButton;
