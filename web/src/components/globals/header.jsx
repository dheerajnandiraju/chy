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
          </div>
        </div>
      </div>
    );
};