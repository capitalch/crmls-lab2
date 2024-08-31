import { MenuIcon } from "@heroicons/react/solid";
import { sidebarOptions } from "../../pages/Main";
import MobileUserMenu from "./MobileUserMenu";

const MobileNavContentFrame = ({ sidebarOpen, setSidebarOpen, isPublic }: sidebarOptions) => {
	return (
		<div className="relative z-10 flex-shrink-0 flex h-16 bg-secondary border-b border-divider lg:hidden">
			<button className="px-4 border-r border-divider text-secondary focus:outline-none lg:hidden" onClick={() => setSidebarOpen(true)}>
				<span className="sr-only">Open sidebar</span>
				<MenuIcon className="h-6 w-6" aria-hidden="true" />
			</button>
			<div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
				<div className="flex-1 items-center flex">
					{/* <form className="w-full flex md:ml-0" action="#" method="GET">
                        <label htmlFor="search_field" className="sr-only">
                            Search
                        </label>
                        <div className="relative w-full text-secondary focus-within:text-primary">
                            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <input
                                id="search_field"
                                name="search_field"
                                className="block w-full h-full pl-8 pr-3 py-2 border-transparent bg-secondary text-primary placeholder-secondary focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-primary sm:text-sm"
                                placeholder="Search"
                                type="search"
                            />
                        </div>
                    </form> */}
				</div>
				<div className="flex items-center justify-between">
                    {!isPublic && <MobileUserMenu />}
				</div>
			</div>
		</div>
	);
};

export default MobileNavContentFrame;
