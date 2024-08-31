import ContentContainer from "../../components/content/ContentContainer";
import userManager from "../../util/userManager";
import swoosh from "../../assets/crmls-swoosh-pattern.svg";

function PublicDashboard() {
	// Test for custom logins
	// const tempAors = [
	// 	{ id: "AR", name: "Arcadia" },
	// 	{ id: "CV", name: "Cirtrus Valley" },
	// 	{ id: "DW", name: "Downey" },
	// 	{ id: "JT", name: "Joshua Tree Gateway" },
	// 	{ id: "LG", name: "Laguna" },
	// 	{ id: "MD", name: "Madera" },
	// 	{ id: "MP", name: "Mariposa County" },
	// 	{ id: "NP", name: "Newport Beach" },
	// 	{ id: "ND", name: "North San Diego" },
	// 	{ id: "OC", name: "Orange County" },
	// 	{ id: "PT", name: "Pacific Southwest" },
	// 	{ id: "SB", name: "South Bay" },
	// ];

	// const handleCustomLogin = (e: any) => {
	// 	e.preventDefault();
	// 	window.location.href = `?loginAor=${e.target.value}`;
	// };

	const handleLoginRedirect = () => {
		userManager.signinRedirect();
	};

	const cardDisplay = () => {
		return (
			<div className="flex flex-wrap -mx-1 lg:-mx-4">
				<div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 z-10">
					<div className="bg-menu w-full mb-4 h-48 shadow-lg border border-menu rounded-lg">
						<div className="flex flex-col items-center p-8 justify-center">
							<img className="w-16 h-16" src="https://cdn.crmls.org/mace/campaigns/REcenterhub Dashboard/Market-Stats-Icon.png" alt="Stats" />
							<h5 className="text-center text-lg font-medium text-primary mt-3">
								Market
								<br />
								Statistics
							</h5>
						</div>
					</div>
				</div>
				<div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 z-10">
					<div className="bg-menu w-full mb-4 h-48 shadow-lg border border-menu rounded-lg">
						<div className="flex flex-col items-center p-8 justify-center">
							<img className="w-16 h-16" src="https://cdn.crmls.org/mace/campaigns/REcenterhub Dashboard/Helpful-Articles-Icon.png" alt="Articles" />
							<h5 className="text-center text-lg font-medium text-primary mt-3">
								Helpful
								<br />
								Articles
							</h5>
						</div>
					</div>
				</div>
				<div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 z-10">
					<div className="bg-menu w-full mb-4 h-48 shadow-lg border border-menu rounded-lg">
						<div className="flex flex-col items-center p-8 justify-center">
							<img className="w-16 h-16" src="https://cdn.crmls.org/mace/campaigns/REcenterhub Dashboard/Custom-User-Apps-Icon.png" alt="User Applications" />
							<h5 className="text-center text-lg font-medium text-primary mt-3">
								Custom User
								<br />
								Applications
							</h5>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<ContentContainer cssClass="public-dashboard">
			<section className="h-full">
				<div className="p-0 container h-full">
					<div className="g-6 flex h-full flex-wrap items-center justify-center text-primary">
						<div className="w-full">
							<div className="public-dashboard-wrapper">
								<div className="w-full sm:w-1/2 2xl:w-1/3 px-8 py-4 sm:px-24 sm:py-16 sm:-mt-16">
									<img src="https://cdn.crmls.org/mace/campaigns/REcenterhub Dashboard/REcenterhub-logoTMFullColorVertical.png" className="transform scale-80 3xl:scale-100" alt="REcenterhub" />
									<div className="flex align-center justify-center">
										<button className="cta-button" onClick={handleLoginRedirect}>
											Click Here To Login
										</button>
									</div>
								</div>
								<div className="w-full sm:w-1/2 2xl:w-2/3 p-8 2xl:p-0">
									<div className="rounded-tl-2xl rounded-br-2xl 2xl:rounded-tl-7xl 2xl:rounded-br-7xl bg-nb-blue overflow-hidden mb-8 shadow-solid">
										<div className="flex items-center p-16 sm:p-20 2xl:p-48 3xl:p-64 justify-center relative">
											<img src={swoosh} alt="swoosh" className="hidden 2xl:block absolute transform scale-125 z-1 opacity-30" />
											<div className="text-md sm:text-3xl text-white font-medium">
												<p>Your reinvented dashboard awaits.</p>
												<p>Welcome to REcenterhub.</p>
											</div>
										</div>
									</div>
									<div className="hidden 2xl:block container my-12 mx-auto px-4 md:px-12 mt-8 sm:-mt-24 pb-24 sm:pb-0">{cardDisplay()}</div>
								</div>
							</div>

							<div className="block 2xl:hidden container mx-auto px-4 md:px-12 pb-24 sm:pb-0">{cardDisplay()}</div>
						</div>
					</div>
				</div>
			</section>
		</ContentContainer>
	);
}

export default PublicDashboard;
