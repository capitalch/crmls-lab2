/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { hideSlider, selectSlider } from "../../features/dashboard/sideSliderSlice";
<<<<<<< HEAD
=======
import { hideTooltips, rebuildTooltips } from "../settings/theme/ThemeTooltip";
>>>>>>> dev-1

const SlidePanel = ({ title, children }: { title: string; children: any; }) => {
	const dispatch = useAppDispatch();
	const currentSlider = useAppSelector(selectSlider);
	const [open, setOpen] = useState(false);

	useEffect(() => {
<<<<<<< HEAD
		if (currentSlider) {
			setOpen(currentSlider.showSlider)
=======
		hideTooltips();
		if (currentSlider) {
			setOpen(currentSlider.showSlider);
			setTimeout(() => {
				rebuildTooltips();
			}, 1000);
>>>>>>> dev-1
		}
	}, [currentSlider]);

	const closeSlider = () => {
		dispatch(
			hideSlider()
		);
<<<<<<< HEAD
=======
		hideTooltips();
>>>>>>> dev-1
	}
	
	return (
		<>
			<Transition.Root show={open} as={Fragment}>
<<<<<<< HEAD
				<Dialog as="div" className="z-10 fixed inset-0 overflow-hidden" onClose={closeSlider}>
=======
				<Dialog as="div" className="z-30 fixed inset-0 overflow-hidden" onClose={closeSlider}>
>>>>>>> dev-1
					<div className="absolute inset-0 overflow-hidden">
						<Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
							<Dialog.Overlay className="absolute inset-0 bg-secondary bg-opacity-75 transition-opacity" />
						</Transition.Child>

						<div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
							<Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500 sm:duration-700" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leaveFrom="translate-x-0" leaveTo="translate-x-full">
								<div className="w-screen max-w-2xl">
									<div className="h-full flex flex-col bg-primary text-primary shadow-xl overflow-y-scroll">
										<div className="py-6 px-4 bg-header text-inverse sm:px-6">
											<div className="flex items-center justify-between">
												<Dialog.Title className="text-xl font-medium">{title}</Dialog.Title>
												<div className="ml-3 h-7 flex items-center">
													<button type="button" className="rounded-md focus:outline-none" onClick={closeSlider}>
														<span className="sr-only">Close panel</span>
														<XIcon className="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>
										</div>
										<div className="relative flex-1 py-6 px-4 sm:px-6">{children}</div>
									</div>
								</div>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default SlidePanel;
