import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="
      flex flex-col items-center justify-center
      min-h-[70vh] px-5 py-[60px]
      text-center
    ">
      <h1 className="text-[6rem] font-bold mb-5 text-[#f97316]">
        404
      </h1>

      <p className="text-2xl mb-8 text-[#e3e0dc]">
        Sorry, the page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="
          text-lg
          text-[#cd8e37]
          border-2 border-[#cd8e37]
          px-5 py-2.5
          rounded-lg
          transition-all duration-300
          hover:bg-[#ffaa4d] hover:text-[#1f2937]
        "
      >
        Go back
      </Link>
    </div>
  );
}
