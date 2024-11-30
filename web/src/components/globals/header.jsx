import { CiBellOn, CiUser } from "react-icons/ci";

export const Header = (
    props
) => {
    return (
        <div className="bg-white shadow-md py-4 px-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            {props.title}
          </h1>
          <div className="flex items-center gap-5">
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 mr-2"
              placeholder="Search..."
            />
            <button>
              <CiBellOn size={30} className="text-gray-800" />
            </button>
            <button className="">
              <CiUser size={30} className="text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    );
};