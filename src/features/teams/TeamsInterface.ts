export interface TeamPhone {
	brokerTeamID?: string;
	phoneNumber?: string;
	phoneTypeID?: number;
	order?: number;
	isPrimary?: boolean;
	createdBy?: string;
	createdOn?: string;
	id?: string;
	modifiedBy?: string;
	modifiedOn?: string;
}

export interface TeamEmail {
	brokerTeamID?: string;
	emailAddress?: string;
	emailTypeID?: number;
	emailTypeName?: string;
	order?: number;
	isPreferred?: boolean;
	createdBy?: string;
	createdOn?: string;
	id?: string;
	modifiedBy?: string;
	modifiedOn?: string;
	mode?: string;
}

export interface TeamMemberWithRoles {
	firstName?: string;
	lastName?: string;
	contactID?: string;
	roleIDs?: number[];
	brokerageFirmIDs?: string[];
	concatenatedRoleNames?: string;
}

export interface Team {
	phones?: TeamPhone[];
	rolePhones?: any[];
	emails?: TeamEmail[];
	roleEmails?: any[];
	brokerageFirmIDs?: string[];
	primaryBrokerageFirmID?: string;
	licenseIDs?: any[];
	teamMemberWithRoles?: TeamMemberWithRoles[];
	isMultiFirmTeam?: boolean;
	name?: string;
	brokerTeamStatusLookupID?: number | string | null;
	activeDate?: string | undefined;
	teamLeader?: string | undefined;
	inactiveDate?: string | null;
	dbaid?: string;
	isDeleted?: boolean;
	createdBy?: string;
	createdOn?: string | null;
	id?: string;
	modifiedBy?: string;
	modifiedOn?: string | null;
	getPerviousPrimaryBR?: () => void;
	isReadOnly?: boolean;
}

export interface TeamContact {
	contactLicenseNumber: string;
	concatenatedRoleNames: string;
	roleIDs: number[];
	licenseType: string;
	firstName: string;
	lastName: string;
	contactID: string;
	id: string;
}
