"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logoBlack.png";
import { FaSearch } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession, signIn } from "next-auth/react";
import { urlFor } from "@/lib/client";

type SearchResult = {
  _id: string;
  title: string;
  slug: string;
  image: { _type: string; asset: { _ref: string; _type: string } };
};

const Navbar = () => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(Array.isArray(data) ? data : []);
        setShowDropdown(true);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDev = process.env.NODE_ENV === "development";

  const navBarList = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Shop",
      link: "/shop",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    ...(isDev
      ? [
          {
            title: "Studio",
            link: "/studio",
          },
        ]
      : []),
  ];

  const handleNavLinkClick = (link: string) => {
    if ((link === "/cart" || link === "/profile") && !session) {
      signIn();
    } else {
      window.location.href = link;
    }
  };

  return (
    <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-400 sticky top-0 z-50">
      <nav className="h-full max-w-screen-xl mx-auto px-4 xl:px-0 flex items-center justify-between gap-2">
        <Link href={"/"}>
          <Image src={logo} alt="logo" className="w-20 p-1" />
        </Link>
        <div className="relative w-full hidden lg:block lg:w-[600px]" ref={dropdownRef}>
          <div className="h-10 text-base text-primeColor border-[1px] border-black items-center gap-2 justify-between px-6 rounded-md inline-flex w-full bg-white">
            <input
              type="text"
              placeholder="Search your products here"
              className="flex-1 h-full outline-none bg-transparent placeholder:text-gray-600 min-w-0"
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowDropdown(true)}
              value={searchQuery}
            />
            {searchQuery ? (
              <IoCloseOutline
                onClick={() => {
                  setSearchQuery("");
                  setShowDropdown(false);
                }}
                className="w-5 h-5 hover:text-red-500 hover:cursor-pointer shrink-0"
              />
            ) : (
              <FaSearch className="w-5 h-5 shrink-0" />
            )}
          </div>
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border-[1px] border-black rounded-md shadow-lg max-h-80 overflow-y-auto z-[100]">
              {isSearching ? (
                <div className="py-6 text-center text-gray-500 text-sm">Searching...</div>
              ) : searchResults.length === 0 ? (
                <div className="py-6 text-center text-gray-500 text-sm">
                  No products found
                </div>
              ) : (
                <ul className="py-1">
                  {searchResults.map((item) => (
                    <li key={item._id}>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <div className="w-10 h-10 relative shrink-0 bg-gray-100 rounded overflow-hidden">
                          {item.image?.asset?._ref && (
                            <Image
                              src={urlFor(item.image).url()}
                              alt={item.title}
                              fill
                              className="object-contain"
                              sizes="40px"
                            />
                          )}
                        </div>
                        <span className="text-primeColor font-medium truncate">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="hidden md:inline-flex items-center gap-2">
          {navBarList.map((item) => (
            <button
              onClick={() => handleNavLinkClick(item.link)}
              key={item.link}
              className={`flex hover:font-medium w-20 h-6 justify-center items-center px-12 text-gray-600 hover:underline underline-offset-4 decoration-[1px] hover:text-gray-950 md:border-r-[2px] border-r-gray-400 last:border-r-0 ${
                pathname === item.link && "text-gray-950 underline"
              }`}
            >
              {item.title}
            </button>
          ))}
          {session?.user && (
            <button
              onClick={() => signOut()}
              className="flex hover:font-medium w-20 h-6 justify-center items-center px-12 text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-red-600 md:border-r-[2px] border-r-gray-300 last:border-r-0"
            >
              Logout
            </button>
          )}
        </div>
        <div className="relative inline-flex md:hidden">
          <HiMenuAlt2
            className="cursor-pointer w-8 h-6"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          />
          {isMobileMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/20"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden
              />
              <div className="fixed top-20 right-4 z-50 w-56 bg-white border-[1px] border-gray-400 rounded-md shadow-lg py-2">
                {navBarList.map((item) => (
                  <button
                    key={item.link}
                    onClick={() => {
                      handleNavLinkClick(item.link);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-100 hover:font-medium ${
                      pathname === item.link ? "text-gray-950 font-medium bg-gray-50" : ""
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
                {session?.user && (
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-500 hover:bg-gray-100 hover:text-red-600"
                  >
                    Logout
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;