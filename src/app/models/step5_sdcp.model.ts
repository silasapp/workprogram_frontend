

export class HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_PLANNED_AND_ACTUAL {
    id : number =0;
    oML_ID : number = 0;
    oML_Name : string ='';
    year_of_WP : string ='';
    description_of_Projects_Planned : string ='';
    description_of_Projects_Actual : string ='';

}

export class HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_QUESTION {
    id : number =0;
    oML_id : number = 0;
    oML_Name : string ='';
    year_of_WP : string ='';
    have_you_submitted_all_MoUs_to_DPR : string ='';
    if_NO_why : string ='';
    do_you_have_an_MOU_with_the_communities_for_all_your_assets : string ='';
    mOUResponderInPlace : string ='';
    mOUResponderFilePath : string ='';
    mOUOSCPFilePath : string ='';
}

export class HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_MOU{
    id : number =0;
    oML_id : number = 0;
    oML_Name : string ='';
    year_of_WP : string ='';
    type_of_project_excuted : string ='';
    year_GMou_was_signed : string ='';
    project_Location : string ='';
    component_of_project : string ='';
    actual_Budget_Total_Dollars : string ='';
    beneficiary_Community : string ='';
    status_Of_Project : string ='';
    gMOUFilePath: File;
}

export class HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_SCHOLASHIP_SCHEME{
    id : number =0;
    oML_id : number = 0;
    oML_Name : string ='';
    year_of_WP : string ='';

    nameOfCommunity : string ='';
    year_GMou_was_signed : string ='';
    scholarshipYear : string ='';
    componentOfScholarship : string ='';
    actual_Budget_Total_Dollars : string ='';
    sSUploadFilePath : string ='';
}

export class HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_TRAINING_SCHEME
{
    id : number =0;
    oML_ID: string ='';
    oML_Name: string ='';
    year_of_WP: string ='';
    nameOfCommunity: string ='';
    year_GMou_was_signed: string ='';
    trainingYear: string ='';
    componentOfTraining: string ='';
    actual_Budget_Total_Dollars: string ='';
    statusOfTraining: string ='';
    tSUploadFilePath: File;
    tSUploadFilename: string ='';
}

export class HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Scholarship{
    id : number =0;
    oML_ID : number = 0;
    oML_Name : string ='';
    year_of_WP : string ='';

    cSR_ : string ='';
    budget_ : string ='';
    actual_Spent : string ='';
    percentage_Completion_ : string ='';
    beneficiary_Communities_host : string ='';
    beneficiary_Communities_National : string ='';
    actual_proposed : string ='';
}

export class HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Training_Skill_Acquisition{
    id : number =0;
    oML_id : number = 0;
    oML_Name : string ='';
    year_of_WP : string ='';

    cSR_ : string ='';
    budget_ : string ='';
    actual_Spent : string ='';
    percentage_Completion_ : string ='';
    beneficiary_Communities_host : string ='';
    beneficiary_Communities_National : string ='';
    actual_proposed : string ='';
}

export class HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW {
    id : number =0;
    oML_id : number = 0;
    oML_Name : string ='';
    year_of_WP : string ='';
    cSR_ : string ='';
    budget_ : string ='';
    actual_Spent : string ='';
    percentage_Completion_ : string ='';
    beneficiary_Communities : string ='';
    actual_proposed : string ='';
}


export class PICTURE_UPLOAD_COMMUNITY_DEVELOPMENT_PROJECT
{
    id : number =0;
    oML_id : number = 0;
    oML_Name : string ='';
    year_of_WP : string =''
    uploaded_presentation: File;
}
