export default interface CampaignInterface {
    id: string;
    name: string;
    owner: string;
    audienceId: string;
    templateId: string;
    templateName: string;
    campaignType: string;
    executionDate: string; // will be Date but is coming from DB as datetime
    status: string;
    opens: number;
    bounces: number;
    unsubscribes: number;
    priority: number;
    createdOn: string; // will be Date but is coming from DB as datetime
    createdBy: string;
    modifiedOn: string; // will be Date but is coming from DB as datetime
    modifiedBy: string;
}