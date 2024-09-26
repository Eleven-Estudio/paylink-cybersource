const LinkWrong = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      <div className=" max-w-[45ch] text-center space-y-1 flex flex-col items-center px-2 py-1">
        <span className="text-lg font-semibold">Something went wrong</span>
        <span className="text-sm">
          The page you were looking for could not be found. Please check the URL
          or contact the merchant.
        </span>
      </div>
    </div>
  );
};

export default LinkWrong;
