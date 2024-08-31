import { XIcon } from "@heroicons/react/outline";

const BaseModal = (props: any) => {
	return (
		props.open && (
			<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
				<div className="fixed inset-0 bg-tertiary bg-opacity-50 transition-opacity"></div>
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<div className="relative transform overflow-hidden rounded-lg bg-primary text-primary text-left border border-divider shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
							<div className="absolute top-0 right-0 pt-4 pr-4">
								<XIcon className="w-6 h-6 cursor-pointer opacity-60 hover:opacity-100" onClick={() => props.setOpen(false)} />
							</div>
							<div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
								{props.children ?? "Modal Content"}
							</div>
							{props.actions && props.actions.length > 0 && <div className="bg-secondary px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">{props.actions && props.actions.map((action: any, i: number) => <div key={i}>{action}</div>)}</div>}
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default BaseModal;
