import React from "react";

const NotFound = () => {
	return (
		<div className="bg-primary min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
			<div className="max-w-max mx-auto">
				<main className="sm:flex">
					<p className="text-4xl font-extrabold text-header sm:text-5xl">404</p>
					<div className="sm:ml-6">
						<div className="sm:border-l sm:border-divider sm:pl-6">
							<h1 className="text-4xl font-extrabold text-primary tracking-tight sm:text-5xl">Page not found</h1>
							<p className="mt-1 text-base text-secondary">Please check the URL in the address bar and try again.</p>
						</div>
						<div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
							<a href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-header hover:bg-opacity-80 focus:outline-none">
								Go back home
							</a>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default NotFound;
