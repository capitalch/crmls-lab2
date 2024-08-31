import { UserGroupIcon } from "@heroicons/react/solid";

const NoMemberData = () => {
	return (
		<div className="bg-primary min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
			<div className="max-w-max mx-auto">
				<main className="sm:flex">
					<p className="text-4xl font-extrabold text-header sm:text-5xl"><UserGroupIcon className="h-16 w-16" /></p>
					<div className="sm:ml-6">
						<div className="sm:border-l sm:border-divider sm:pl-6">
							<h1 className="text-4xl font-extrabold text-primary tracking-tight sm:text-5xl">No Member Data</h1>
							<p className="mt-1 text-base text-secondary">No member data was found for this user. Please contact your administrator.</p>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default NoMemberData;
