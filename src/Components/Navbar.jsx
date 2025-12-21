import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function getUserProfile() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    enabled: !!user,
    select: (data) => data?.data?.user,
  });
  console.log(data);

  function signOut() {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-xl text-heading font-bold whitespace-nowrap">
              Social App
            </span>
          </Link>

          <div className="flex gap-4 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user ? (
              <>
                <button
                  type="button"
                  className="flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary"
                  id="user-menu-button"
                  aria-expanded={isDropdownOpen}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={data?.photo}
                    alt="user photo"
                  />
                </button>
                <div
                  className={`z-50 absolute top-10 right-0 ${isDropdownOpen ? "block" : "hidden"} bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3 text-sm border-b border-default">
                    <span className="block text-heading font-medium">
                      {data?.name}
                    </span>
                    <span className="block text-body truncate">
                      {data?.email}
                    </span>
                  </div>
                  <ul
                    className="p-2 text-sm text-body font-medium"
                    aria-labelledby="user-menu-button"
                  >
                    <li>
                      <Link
                        to="/profile"
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <span
                        onClick={signOut}
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded cursor-pointer"
                      >
                        Sign out
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <ul className="flex gap-4">
                <li>
                  <Link to="/login">login</Link>
                </li>
                <li>
                  <Link to="/register">register</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
