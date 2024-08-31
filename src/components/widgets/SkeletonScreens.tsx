import { sample } from "lodash";

export const CircleBlurbGrid = (props: any) => (
	<div className="rounded-lg animate-pulse">
		<div className="w-16 h-16 flex-shrink-0 mx-auto rounded-full bg-secondary bg-opacity-50 flex justify-center items-center"></div>
	</div>
);

export const RoundedSquareBlurbGrid = (props: any) => (
	<div className="rounded-lg animate-pulse">
		<div className="w-16 h-16 flex-shrink-0 mx-auto rounded-md bg-secondary flex justify-center items-center"></div>
	</div>
);

export const CardLoader = () => (
	<div className="w-full animate-pulse">
		<div className="h-full border-2 border-default rounded-lg overflow-hidden">
			<div className="lg:h-36 bg-secondary bg-opacity-50 md:h-36 w-full object-cover object-center"></div>
			<div className="p-6">
				<div className="bg-secondary h-4 w-1/4 mb-2"></div>
				<div className="w-1/2 mb-4 h-6 bg-secondary"></div>
				<p className="leading-relaxed mb-3 w-full h-3 bg-secondary bg-opacity-50"></p>
				<p className="leading-relaxed mb-3 w-2/3 h-3 bg-secondary bg-opacity-50"></p>
				<p className="leading-relaxed mb-3 w-1/2 h-3 bg-secondary bg-opacity-50"></p>
				<div className="flex items-center flex-wrap ">
					<div className="bg-secondary h-4 mt-2 w-32 inline-flex items-center md:mb-2 lg:mb-0"></div>
					<span className="bg-secondary w-16 mt-2 h-4 mr-3 px-2 inline-flex items-center ml-auto leading-none pr-5 py-1"></span>
				</div>
			</div>
		</div>
	</div>
);

export const CarouselLoader = () => (
	<div className="w-full animate-pulse flex items-center justify-center">
		<div className="h-64 border-2 border-default border-r-0 rounded-l-lg overflow-hidden w-64">
			<div className="lg:h-24 bg-primary bg-opacity-50 md:h-18 w-full object-cover object-center"></div>
			<div className="p-6">
				<div className="bg-primary bg-opacity-50 h-4 w-1/4 mb-2"></div>
				<div className="w-1/2 mb-4 h-6 bg-primary"></div>
				<p className="leading-relaxed mb-3 w-full h-3 bg-primary bg-opacity-50"></p>
				<div className="flex items-center flex-wrap ">
					<div className="bg-primary h-4 mt-2 w-32 inline-flex items-center md:mb-2 lg:mb-0"></div>
					<span className="bg-primary w-16 mt-2 h-4 mr-3 px-2 inline-flex items-center ml-auto leading-none text-sm pr-5 py-1"></span>
				</div>
			</div>
		</div>
		<div className="h-full border-2 border-default rounded-lg overflow-hidden w-96">
			<div className="lg:h-48 bg-primary bg-opacity-50 md:h-36 w-full object-cover object-center"></div>
			<div className="p-6">
				<div className="bg-primary bg-opacity-50 h-4 w-1/4 mb-2"></div>
				<div className="w-1/2 mb-4 h-6 bg-primary"></div>
				<p className="leading-relaxed mb-3 w-full h-3 bg-primary bg-opacity-50"></p>
				<p className="leading-relaxed mb-3 w-2/3 h-3 bg-primary bg-opacity-50"></p>
				<p className="leading-relaxed mb-3 w-1/2 h-3 bg-primary bg-opacity-50"></p>
				<div className="flex items-center flex-wrap ">
					<div className="bg-primary h-4 mt-2 w-32 inline-flex items-center md:mb-2 lg:mb-0"></div>
					<span className="bg-primary w-16 mt-2 h-4 mr-3 px-2 inline-flex items-center ml-auto leading-none text-sm pr-5 py-1"></span>
				</div>
			</div>
		</div>
		<div className="h-64 border-2 border-default border-l-0 rounded-r-lg overflow-hidden w-64">
			<div className="lg:h-24 bg-primary bg-opacity-50 md:h-18 w-full object-cover object-center"></div>
			<div className="p-6">
				<div className="bg-primary bg-opacity-50 h-4 w-1/4 mb-2"></div>
				<div className="w-1/2 mb-4 h-6 bg-primary"></div>
				<p className="leading-relaxed mb-3 w-full h-3 bg-primary bg-opacity-50"></p>
				<div className="flex items-center flex-wrap ">
					<div className="bg-primary h-4 mt-2 w-32 inline-flex items-center md:mb-2 lg:mb-0"></div>
					<span className="bg-primary w-16 mt-2 h-4 mr-3 px-2 inline-flex items-center ml-auto leading-none text-sm pr-5 py-1"></span>
				</div>
			</div>
		</div>
	</div>
);

export const FormLoader = () => (
	<div className="mt-6 sm:mt-5 crmls-fields-wrap animate-pulse">
		<div className="crmls-field-wrap">
			<label htmlFor="message">
				<p className="w-full h-6 bg-secondary bg-opacity-60"></p>
			</label>
			<div className="mt-2 sm:col-span-2">
				<p className="w-full h-8 bg-secondary bg-opacity-50"></p>
			</div>
		</div>
		<div className="crmls-field-wrap">
			<label htmlFor="message">
				<p className="w-full h-6 bg-secondary bg-opacity-60"></p>
			</label>
			<div className="mt-2 sm:col-span-2">
				<p className="w-full h-8 bg-secondary bg-opacity-50"></p>
			</div>
		</div>
		<div className="crmls-field-wrap">
			<label htmlFor="message">
				<p className="w-full h-6 bg-secondary bg-opacity-60"></p>
			</label>
			<div className="mt-2 sm:col-span-2">
				<p className="w-full h-16 bg-secondary bg-opacity-50"></p>
			</div>
		</div>
		<div className="crmls-field-wrap">
			<label htmlFor="message">
				<p className="w-full h-6 bg-secondary bg-opacity-60"></p>
			</label>
			<div className="mt-2 sm:col-span-2">
				<p className="w-full h-8 bg-secondary bg-opacity-50"></p>
			</div>
		</div>
		<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:py-5">
			<p className="w-full h-8 bg-secondary bg-opacity-80"></p>
		</div>
	</div>
);

export const InboxLoader = (props: any) => (
	<main className="min-w-0 flex-1 border-t border-default xl:flex animate-pulse">
		<section aria-labelledby="message-heading" className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last">
			<div className="flex-shrink-0 bg-primary border-b border-default">
				<div className="h-16 flex flex-col justify-center">
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="py-3 flex justify-between">
							<div>
								<span className="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3">
									<span className="inline-flex sm:shadow-sm">
										<button type="button" className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-default text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
											<p className="w-8 h-4 bg-secondary bg-opacity-50"></p>
										</button>
										<button type="button" className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 border border-default text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
											<p className="w-8 h-4 bg-secondary bg-opacity-50"></p>
										</button>
										<button type="button" className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-r-md border border-default text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
											<p className="w-8 h-4 bg-secondary bg-opacity-50"></p>
										</button>
									</span>
									<span className="hidden lg:flex space-x-3">
										<button type="button" className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border border-default text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
											<p className="w-8 h-4 bg-secondary bg-opacity-50"></p>
										</button>
										<button type="button" className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border border-default text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
											<p className="w-8 h-4 bg-secondary bg-opacity-50"></p>
										</button>
									</span>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="min-h-0 flex-1 overflow-y-auto">
				<div className="bg-primary pt-5 pb-6 shadow">
					<div className="px-4 sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-8">
						<div className="sm:w-0 sm:flex-1">
							<p className="w-1/4 h-6 bg-secondary mb-2"></p>
							<p className="w-1/6 h-4 bg-secondary bg-opacity-50"></p>
						</div>
						<div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
							<span className="inline-flex items-center px-3 py-0.5 rounded-full bg-secondary w-16 h-6"></span>
						</div>
					</div>
				</div>
				<ul className="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8">
					<li className="bg-primary px-4 py-6 shadow sm:rounded-lg sm:px-6">
						<div className="sm:flex sm:justify-between sm:items-baseline">
							<p className="w-1/6 h-6 bg-secondary mb-2"></p>
						</div>
						<div className="mt-4 space-y-6 text-sm text-gray-800">
							<p className="w-full h-4 bg-secondary bg-opacity-50 mb-2"></p>
							<p className="w-full h-4 bg-secondary bg-opacity-50 mb-2"></p>
							<p className="w-1/2 h-4 bg-secondary bg-opacity-50 mb-6"></p>
							<p className="w-full h-4 bg-secondary bg-opacity-50 mb-2"></p>
							<p className="w-full h-4 bg-secondary bg-opacity-50 mb-2"></p>
							<p className="w-3/4 h-4 bg-secondary bg-opacity-50 mb-2"></p>
						</div>
					</li>
				</ul>
			</div>
		</section>
		<aside className="hidden xl:block xl:flex-shrink-0 xl:order-first">
			<div className="h-full relative flex flex-col w-96 border-r border-default">
				<div className="flex-shrink-0">
					<div className="h-16 px-6 flex flex-col justify-center">
						<div className="flex items-baseline space-x-3">
							<div className="w-1/2 h-6 bg-secondary"></div>
							<p className="w-1/2 h-4 bg-secondary bg-opacity-50"></p>
						</div>
					</div>
					<div className="border-t border-b border-default px-6 py-2">
						<div className="w-1/2 h-4 bg-secondary bg-opacity-50"></div>
					</div>
				</div>
				<nav aria-label="Message list" className="min-h-0 flex-1 overflow-y-auto">
					<ul className="border-b border-default divide-y divide-default h-screen">
						<li className="relative py-5 px-6">
							<div className="flex justify-between space-x-3">
								<div className="min-w-0 flex-1">
									<div className="block focus:outline-none">
										<p className="w-1/2 h-6 bg-secondary mb-2"></p>
										<p className="w-3/4 h-4 bg-secondary bg-opacity-50 mb-2"></p>
									</div>
								</div>
							</div>
							<div className="mt-1">
								<p className="w-full h-4 bg-secondary bg-opacity-50 mb-2"></p>
								<p className="w-1/2 h-4 bg-secondary bg-opacity-50 mb-2"></p>
								<p className="w-3/4 h-4 bg-secondary bg-opacity-50 mb-2"></p>
								<p className="w-1/4 h-4 bg-secondary bg-opacity-50 mb-2"></p>
							</div>
						</li>
						<li className="relative py-5 px-6">
							<div className="flex justify-between space-x-3">
								<div className="min-w-0 flex-1">
									<div className="block focus:outline-none">
										<p className="w-1/2 h-6 bg-secondary mb-2"></p>
										<p className="w-3/4 h-4 bg-secondary bg-opacity-50 mb-2"></p>
									</div>
								</div>
							</div>
							<div className="mt-1">
								<p className="w-full h-4 bg-secondary bg-opacity-50 mb-2"></p>
								<p className="w-1/2 h-4 bg-secondary bg-opacity-50 mb-2"></p>
								<p className="w-3/4 h-4 bg-secondary bg-opacity-50 mb-2"></p>
								<p className="w-1/4 h-4 bg-secondary bg-opacity-50 mb-2"></p>
							</div>
						</li>
						<li className="relative py-5 px-6">
							<div className="flex justify-between space-x-3">
								<div className="min-w-0 flex-1">
									<div className="block focus:outline-none">
										<p className="w-1/2 h-6 bg-secondary mb-2"></p>
										<p className="w-3/4 h-4 bg-secondary bg-opacity-50 mb-2"></p>
									</div>
								</div>
							</div>
							<div className="mt-1">
								<p className="w-full h-4 bg-secondary bg-opacity-50 mb-2"></p>
								<p className="w-1/2 h-4 bg-secondary bg-opacity-50 mb-2"></p>
								<p className="w-3/4 h-4 bg-secondary bg-opacity-50 mb-2"></p>
								<p className="w-1/4 h-4 bg-secondary bg-opacity-50 mb-2"></p>
							</div>
						</li>
					</ul>
				</nav>
			</div>
		</aside>
	</main>
);

export const TableLoader = () => {
	return (
		<div className="animate-pulse">
			<div className="sm:flex sm:items-center">
				<div className="w-full flex justify-between">
					<button type="button" className="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary bg-opacity-50 px-4 py-2 w-36">
						<div className="h-6"></div>
					</button>
					<div>
						<button type="button" className="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary bg-opacity-50 px-4 py-2 w-36 mr-2">
							<div className="h-6"></div>
						</button>
						<button type="button" className="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary bg-opacity-50 px-4 py-2 w-36">
							<div className="h-6"></div>
						</button>
					</div>
				</div>
			</div>
			<div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
				<table className="min-w-full divide-y divide-default">
					<thead className="bg-primary bg-opacity-50">
						<tr>
							<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">
								<div className="h-6 w-1/4 bg-secondary"></div>
							</th>
							<th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold sm:table-cell">
								<div className="h-6 w-2/3 bg-secondary"></div>
							</th>
							<th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell">
								<div className="h-6 w-full bg-secondary"></div>
							</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
								<div className="h-6 w-3/4 bg-secondary"></div>
							</th>
							<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
								<div className="h-6 w-2/3 bg-secondary"></div>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-default bg-primary bg-opacity-50">
						{[...Array(4)].map((i, v) => (
							<tr key={v}>
								<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
									<div className="h-4 w-2/3 bg-secondary bg-opacity-50"></div>
								</td>
								<td className="hidden whitespace-nowrap px-3 py-4 sm:table-cell">
									<div className="h-4 w-1/4 bg-secondary bg-opacity-50"></div>
								</td>
								<td className="hidden whitespace-nowrap px-3 py-4 lg:table-cell">
									<div className="h-4 w-2/3 bg-secondary bg-opacity-50"></div>
								</td>
								<td className="whitespace-nowrap px-3 py-4">
									<div className="h-4 w-full bg-secondary bg-opacity-50"></div>
								</td>
								<td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
									<div className="h-4 w-1/4 bg-secondary bg-opacity-50"></div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export const ArticleLoader = () => {
	return (
		<div className="relative max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 lg:py-12 animate-pulse h-screen">
			<div className="hidden lg:block bg-secondary bg-opacity-50 absolute top-0 bottom-0 left-3/4 w-screen" />
			<div className="lg:grid lg:grid-cols-2 lg:gap-8 bg-secondary bg-opacity-50">
				<div className="relative lg:row-start-1 lg:col-start-2">
					<div className="relative text-base mx-auto max-w-prose lg:max-w-md">
						<div className="bg-secondary bg-opacity-50 shadow overflow-hidden sm:rounded-lg mt-6">
							<div className="px-4 py-5 sm:px-6 bg-secondary">
								<div className="h-8 bg-secondary bg-opacity-50 w-full"></div>
							</div>
							<div className="border-t border-default bg-secondary bg-opacity-50">
								<dl>
									<div className="bg-secondary bg-opacity-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="h-6 bg-secondary bg-opacity-50 w-1/4"></dt>
										<dd className="h-6 bg-secondary bg-opacity-50 w-full"></dd>
									</div>
									<div className="bg-secondary bg-opacity-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="h-6 bg-secondary w-3/4"></dt>
										<dd className="h-6 bg-secondary w-2/3"></dd>
									</div>
									<div className="bg-secondary bg-opacity-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="h-6 bg-secondary bg-opacity-50 w-1/4"></dt>
										<dd className="h-6 bg-secondary bg-opacity-50 w-full"></dd>
									</div>
									<div className="bg-secondary bg-opacity-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="h-6 bg-secondary w-3/4"></dt>
										<dd className="h-6 bg-secondary w-2/3"></dd>
									</div>
								</dl>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-8 lg:mt-0 h-full bg-primary bg-opacity-50 p-4">
					<p className="h-48 bg-secondary bg-opacity-50 w-full mb-6"></p>
					<p className="h-6 bg-secondary w-3/4 mb-4"></p>
					<p className="h-4 bg-secondary bg-opacity-50 w-full mb-2"></p>
					<p className="h-4 bg-secondary bg-opacity-50 w-full mb-2"></p>
					<p className="h-4 bg-secondary bg-opacity-50 w-full mb-2"></p>
					<p className="h-4 bg-secondary bg-opacity-50 w-2/3 mb-2"></p>

					<p className="h-6 bg-secondary w-1/2 mb-4"></p>
					<p className="h-4 bg-secondary bg-opacity-50 w-full mb-2"></p>
					<p className="h-4 bg-secondary bg-opacity-50 w-full mb-2"></p>
					<p className="h-4 bg-secondary bg-opacity-50 w-full mb-2"></p>
					<p className="h-4 bg-secondary bg-opacity-50 w-1/3 mb-8"></p>

					<p className="h-6 bg-secondary w-3/4 mb-4"></p>
					<p className="h-4 bg-secondary bg-opacity-50 w-full mb-2"></p>
					<p className="h-4 bg-secondary bg-opacity-50 w-full mb-2"></p>
					<p className="h-4 bg-secondary bg-opacity-50 w-full mb-2"></p>
					<p className="h-4 bg-secondary bg-opacity-50 w-2/3 mb-4"></p>

					<p className="h-6 bg-secondary w-3/4 mb-4"></p>
					<p className="h-6 bg-secondary bg-opacity-50 w-full mb-2"></p>
					<p className="h-6 bg-secondary bg-opacity-50 w-full mb-2"></p>
					<p className="h-36 bg-secondary bg-opacity-50 w-full mb-2"></p>
				</div>
			</div>
		</div>
	);
};

export const NavLoader = () => {
	return (
		<nav className="px-3 mt-6 animate-pulse">
			<div className="space-y-1">
				{[...Array(10)].map((i, v) => {
					return <div key={v} className="h-6 bg-menucollapse bg-opacity-50 w-full mb-2"></div>;
				})}
			</div>
			<div className="mt-8">
				{/* Secondary navigation */}
				<div className="px-3 text-xs font-semibold text-secondary uppercase tracking-wider" id="teams-headline">
					Quick Links
				</div>
				<div className="mt-1 space-y-1" role="group" aria-labelledby="teams-headline">
					{[...Array(10)].map((i, v) => {
						return <div key={v} className="h-6 bg-menucollapse bg-opacity-50 w-full mb-2"></div>;
					})}
					{/* Dynamic tailwind classes needed for alerts */}
					<div className="hidden bg-purple-500 bg-pink-500 bg-blue-500 bg-yellow-500 bg-green-500 bg-red-500 bg-blue-50 bg-yellow-50 bg-green-50 bg-red-50 bg-blue-100 bg-yellow-100 bg-green-100 bg-red-100 text-blue-800 text-green-800 text-red-800 text-yellow-800 border-blue-200 border-green-200 border-red-200 border-yellow-200" />
				</div>
			</div>
		</nav>
	);
};

export const DashboardLoader = () => {
	return (
		<div className="animate-pulse">
			{[...Array(5)].map((i, v) => {
				let bg = `h-96 bg-tertiary bg-opacity-${sample([20, 30, 40, 50, 60, 70, 80, 90])}`;
				return <div key={v} className={bg}></div>;
			})}
		</div>
	);
};

export const RectangleLoader = () => {
	return (
		<div className="flex items-center justify-center space-x-3 animate-pulse">
			{[...Array(5)].map((i, v) => {
				let bg = `h-20 w-60 bg-tertiary rounded-lg bg-opacity-50`;
				return <div key={v} className={bg}></div>;
			})}
		</div>
	);
};

export const CalendarLoader = () => {
	return (
		<div className="animate-pulse w-full">
			<div className="h-12 w-full bg-tertiary bg-opacity-50"></div>
			<div className="grid grid-cols-7">
			{[...Array(35)].map((i, v) => {
				let bg = `h-24 border border-default`;
				return <div key={v} className={bg}></div>;
			})}
			</div>
		</div>
	);
};
