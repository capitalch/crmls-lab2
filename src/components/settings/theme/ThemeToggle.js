import { useContext, Fragment } from "react";
import { ThemeContext } from "./ThemeContext";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, SunIcon } from "@heroicons/react/solid";
import { hideTooltips } from "./ThemeTooltip";

const Toggle = () => {
	const { theme, setTheme } = useContext(ThemeContext);

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const changeTheme = (theme) => {
		setTheme(theme);
	};

	return (
		<Menu as="div" className="relative cursor-pointer">
			<div data-tip="Change Theme" onClick={() => hideTooltips()}>
				<Menu.Button className="text-secondary hover:text-primary flex text-sm rounded-full">
					<span className="sr-only">Choose Theme</span>
					<SunIcon className={`h-6 w-6`} aria-hidden="true" />
				</Menu.Button>
			</div>
			<Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
				<Menu.Items className="origin-top-left absolute right-0 mt-2 w-36 rounded-md shadow-lg py-1 bg-primary text-primary text-left border border-divider">
					<Menu.Item>
						{({ active }) => (
							<div className={classNames(active ? "bg-secondary" : "", "block px-4 py-2 text-sm")} onClick={() => changeTheme("light")}>
								<div className="flex justify-between items-center">
									<span>Light</span> {theme === "light" && <CheckIcon className="h-3 w-3 rounded-full text-header" />}
								</div>
							</div>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<div className={classNames(active ? "bg-secondary" : "", "block px-4 py-2 text-sm")} onClick={() => changeTheme("dark")}>
								<div className="flex justify-between items-center">
									<span>Dark</span> {theme === "dark" && <CheckIcon className="h-3 w-3 rounded-full text-header" />}
								</div>
							</div>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<div className={classNames(active ? "bg-secondary" : "", "block px-4 py-2 text-sm")} onClick={() => changeTheme("contrast")}>
								<div className="flex justify-between items-center">
									<span>High Contrast</span> {theme === "contrast" && <CheckIcon className="h-3 w-3 rounded-full text-header" />}
								</div>
							</div>
						)}
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default Toggle;
