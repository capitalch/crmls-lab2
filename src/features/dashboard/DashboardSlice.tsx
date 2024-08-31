export interface ApplicationCardEntity {
    application: ApplicationEntity;
    showFavorite?: boolean | null;
}
export interface ApplicationEntity {
    name?: string | null;
    applicationCategory?: string | null;
    description?: string | null;
    createdBy?: string | null;
    iconUrl?: string | null;
    url?: string | null;
    isDefaultApp?: boolean | null;
    hoverText?: string | null;
    mlsSystem?: boolean | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string | number | undefined;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface KpiCardEntity {
    kpi: KpiEntity;
    showFavorite?: boolean | null;
    itemId: string;
}

export interface KpiEntity {
    kpiDefinitionID: string,
    title: string,
    description?: string,
    viewOrder: number,
    iconUrl: string,
    measure: string,
    changeType?: string,
    changeMeasure?: string,
    order?: number
}

export interface ArticleCategoryEntity {
    name?: string | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string | number | undefined;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface ArticleTemplateEntity {
    body?: string | null;
    campaigns?: Array<any> | null;
    footer: string | null;
    header: string | null;
    indexedOn: string | null;
    name: string | null;
    status: string | null;
    subject: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string | number | undefined;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface ArticleAuthor {
    campaigns?: Array<any> | null;
    createdBy?: string | null;
    department?: string | null;
    displayName?: string | null;
    email?: string | null;
    firstName?: string | null;
    indexedOn?: string | null;
    lastName?: string | null;
    userType?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string | number | undefined;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}
export interface ArticleEntity {
    author?: ArticleAuthor | null;
    authorPhotoUrl?: string | null;
    title?: string | null;
    articleCategoryId?: number;
    articleCategory?: ArticleCategoryEntity;
    templateId?: string | null;
    template: ArticleTemplateEntity | null;
    summary?: string | null;
    content?: string | React.FC | null;
    renderedContent?: string | null;
    imageUrl?: string | null;
    audienceId?: string | null;
    audience?: string | null;
    status?: string | null;
    createdBy?: string | null;
    byline?: string | null;
    publishOn?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string | number | undefined;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}
  