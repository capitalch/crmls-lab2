import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { classNames } from "../../../util/helpers";

export type selectCheckProps = {
	id: string;
	label: string;
	value: string | number;
	options: { id: string | number; name: string }[];
	changeHandler: (e: any) => void;
	showDefault?: boolean;
};

type selectedType = {
	id: string | number;
	name: string;
};

const SelectCheck = (props: selectCheckProps) => {
	const [selected, setSelected] = useState<selectedType>(
		props.showDefault
			? props.options[0]
			: {
					id: "",
					name: "Select One",
			  }
	);

	const handleChange = (event: any) => {
		let sel = props.options.find((option) => option.id === event);
		if (sel) {
			setSelected(sel);
		}
		props.changeHandler(event);
	};

	useEffect(() => {
		let sel = props.options.find((option) => option.id === props.value);
		if (sel) {
			setSelected(sel);
		}
	}, [props.value, props.options]);

	return (
		<Listbox value={selected} onChange={handleChange}>
			{({ open }) => (
				<>
					<Listbox.Label className="block text-sm font-medium text-primary">{props.label}</Listbox.Label>
					<div className="mt-1 relative">
						<Listbox.Button className="bg-secondary text-secondary relative w-full border border-default rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
							<span className="block truncate">{selected.name}</span>
							<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
								<SelectorIcon className="h-5 w-5" aria-hidden="true" />
							</span>
						</Listbox.Button>

						<Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
							<Listbox.Options className="absolute z-10 mt-1 w-full bg-secondary text-secondary shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
								{props.options.map((option) => (
									<Listbox.Option key={option.id} className={({ active }) => classNames(active ? "text-primary bg-primary" : "text-secondary", "cursor-default select-none relative py-2 pl-3 pr-9")} value={option.id}>
										{({ selected, active }) => (
											<>
												<span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>{option.name}</span>

												{selected ? (
													<span className={classNames(active ? "text-primary" : "text-secondary", "absolute inset-y-0 right-0 flex items-center pr-4")}>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
};

export default SelectCheck;
