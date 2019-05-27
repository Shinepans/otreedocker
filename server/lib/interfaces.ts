import {Document} from 'mongoose'

interface IDocument extends Document {
    updateAt: number;
    createAt: number;
}

export interface GameTemplateDoc extends IDocument {
    id: number;
    code: string;
    name: string;
    tags: Array<string>;
    namespace: string;
    charge: number;
    permitted: number;
    chargeFree: number;
    permittedFree: number;
    chargePro: number;
    permittedPro: number;
    status: number;
}

export interface GameOrgPermissionDoc extends IDocument {
    uniKey: string;
    orgCode: string;
    orgName: string;
    gameTemplateId: string & GameTemplateDoc;
    name: string;
    tags: Array<string>;
    charge: number;
    permitted: number;
}

export interface GameUserPermissionDoc extends IDocument {
    uniKey: string;
    userId: string & UserDoc;
    gameTemplateId: string & GameTemplateDoc;
    name: string;
    tags: Array<string>;
    charge: number;
    permitted: number;
}

export interface InviteCodeDoc extends IDocument {
    owner: string & UserDoc;
    ownerName: string;
    inviteeName: string;
    invitee: string & UserDoc;
    code: string;
    status: number;
}

export interface ElfPlayerDoc extends IDocument {
    userId: string & UserDoc;
    gameId: string & ElfGameDoc;
    reward: number;
}

export interface TagAttachDoc extends IDocument {
    tag: string & UserTagDoc;
    attachment: number;
    attachId: string & GroupItemDoc & RecruitDoc & RcrtTimeslotDoc & CourseDoc;
}

export interface RedpacketRelationDoc extends IDocument {
    taskType: number;
    task: string & SurveyDoc;
    provider: string & UserDoc;
    inviter: string & UserDoc;
    invitee: string & UserDoc;
    recipient: string & UserDoc;
    transaction: string & TransactionDoc;
}

export interface PicDoc extends IDocument {
    name: string;
    des: string;
    userPic: string;
    album: string;
    status: number;
    list: Array<any>;
    url: string;
    owner: string & UserDoc;
}

export interface UserTagDoc extends IDocument {
    label: string;
    values: Array<string>;
    creator: string & UserDoc;
    visible: number;
    orgCode: string;
    orgName: string;
    weight: number;
}

export interface MarkOneTagDoc extends IDocument {
    creator: string & UserDoc;
    subject: string & UserDoc;
    tag: string & UserTagDoc;
    chosen: Array<number>;
    subjectTagId: string;
}

export interface BespokePlayerDoc extends IDocument {
    game: string & BespokeGameDoc;
    user: string & UserDoc;
    uniKey: string;
    name: string;
    isRobot: boolean;
    point: number;
    state: any;
    reward: number;
    wxSent: number;
}

export interface IssueDoc extends IDocument {
    ownerId: string & UserDoc;
    ownerName: string;
    ownerOpenId: string;
    icNumber: string;
    icName: string;
    reqInvoiceName: string;
    reqInvoiceOwnerName: string;
    reqInvoiceAddress: string;
    reqInvoiceMobile: string;
    orgname: string;
    orgcode: string;
    pid: string;
    reqDepositeMobile: string;
    reqDepositeName: string;
    payType: number;
    orgCodeToChange: string;
    orgNameToChange: string;
    planInfo: {
        plan: number;
        duration: number;
        deadline: number;
        profile: string & OrgUserProfileDoc;
        dueDate: number;
        transaction: string & TransactionDoc;
    };
    reqMoney: number;
    mobile: string;
    reasons: string;
    status: number;
    type: number;
    handler: string & UserDoc;
}

export interface OrgPermissionRoleDoc extends IDocument {
    name: string;
    orgCode: string;
    orgName: string;
    permissions: Array<{
        name: string;
        type: string;
        url: string;
    }>;
    creator: string & UserDoc;
}

export interface OrgMessageReadDoc extends IDocument {
    records: [number];
    message: string & OrgMessageDoc;
    receiver: string & OrgUserProfileDoc;
}

export interface OrgMessageDoc extends IDocument {
    title: string;
    content: string;
    links: Array<string>
    files: [string & UploadFileDoc];
    creator: string & UserDoc;
    affiliation: string & DepartmentDoc;
    pushTo: {
        userIds: [string & OrgUserProfileDoc]
        departmentIds: [string & DepartmentDoc]
    },
    status: number;
    orgCode: string;
    orgName: string;
}

export interface DepartmentDoc extends IDocument {
    name: string;
    orgCode: string;
    orgName: string;
    creator: string & UserDoc;
    affiliation: string & DepartmentDoc;
}

export interface UploadFileDoc extends IDocument {
    name: string;
    orgCode: string;
    orgName: string;
    fileKey: string;
    fileHash: string;
    status: string;
    creator: string & UserDoc;
}

export interface OrgUserProfileDoc extends IDocument {
    name: string;
    gender: string;
    email: string;
    address: string;
    englishName: string;
    position: string;
    orgCode: string;
    orgName: string;
    stuNumber: string;
    jobNumber: string;
    mobile: string;
    uniKey: string;
    user: string & UserDoc;
    isActive: boolean;
    affiliation: Array<string & DepartmentDoc>;
    permissionRole: string & OrgPermissionRoleDoc;
    plan: number;
    isResearcher: boolean;
    isAdmin: boolean;
}

export interface TransactionDoc extends IDocument {
    subject: number;
    task: string &
        UserDoc &
        WalletDoc &
        RecruitDoc &
        SurveyDoc &
        CourseDoc &
        BespokeGameDoc;
    tasker: string & RcrtMemberDoc & SurveyAnswerDoc & CourseMemberDoc;
    money: number;
    amount: number;
    payee: string & UserDoc & WalletDoc;
    payeeType: string;
    payeeName: string;
    payer: string & UserDoc & WalletDoc;
    payerType: string;
    payerName: string;
    comment: string;
    status: number;
    body: string;
    attach: string;
    total_fee: string;
    spbill_create_ip: string;
    trade_type: string;
    openid: string;
    partner_trade_no: string;
    payment_no: string;
    payment_time: string;
    code_url: string;
    feetype: string;
    timeend: string;
    banktype: string;
    tag: string;
}

export interface AnswerDoc extends IDocument {
    surveyId: string & SurveyDoc;
    questionId: string & GroupItemDoc;
    creator: string & UserDoc;
    content: Array<{
        index: number;
        type: number;
        value: string;
    }>;
    reward: number;
}

export interface SurveyCountDoc extends IDocument {
    surveyId: string & SurveyDoc;
    questionId: string & GroupItemDoc;
    num: number;
    analytics: {
        counts: { [key: string]: number };
        ranges: { [key: string]: number };
        answers: Array<{
            name: string;
            text: string;
            time: number;
        }>;
        status: number;
    };
}

export interface SurveyAnswerDoc extends IDocument {
    surveyPartId: string;
    surveyId: string & SurveyDoc;
    partId: string & UserDoc;
    wxSent: number;
    status: number;
    reward: number;
}

export interface RcrtMemberDoc extends IDocument {
    uniKey: string;
    user: string & UserDoc;
    recruit: string & RecruitDoc;
    timeslot: string & RcrtTimeslotDoc;
    reward: number;
    channel: number;
    inviter: string & UserDoc;
    status: number;
    orgCode: string;
    orgName: string;
}

export interface RcrtLocationDoc extends IDocument {
    owner: string & UserDoc;
    address: string;
    name: string;
    site: string;
    lng: number;
    lat: number;
    type: number;
}

export interface RcrtTimeslotDoc extends IDocument {
    recruit: string & RecruitDoc;
    start: number;
    end: number;
    max: number;
    type: number;
    location: string & RcrtLocationDoc;
    link: string;
    task: string & SurveyDoc;
    taskType: string;
    status: number;
    item: number;
    orgCode: string;
    orgName: string;
    orderNum: number;
}

export interface RecruitDoc extends IDocument {
    title: string;
    detail: string;
    isClosed: number;
    doubleBlind: number;
    isOpenShareCode: number;
    shareCode: string;
    password: string;
    needVerify: number;
    owner: string & UserDoc;
    ownerName: string;
    orgCode: string;
    orgName: string;
    costFee: number;
    trash: number;
    openAutoDeposit: number
}

export interface BespokeMoveDoc extends IDocument {
    params: any;
}

export interface BespokeRoundDoc extends IDocument {
    moves: Array<string & BespokeMoveDoc>;
    params: any;
}

export interface BespokePhaseDoc extends IDocument {
    params: any;
    name: string;
    rounds: Array<string & BespokeRoundDoc>;
}

export interface BespokeGameDoc extends IDocument {
    params: any;
    owner: string & UserDoc;
    phases: Array<string & BespokePhaseDoc>;
    namespace: string;
    title: string;
    desc: string;
    status: string;
    ownerName: string;
    costFee: number;
    orgCode: string;
    orgName: string;
}

export interface CourseFileDoc extends IDocument {
    name: string;
    courseId: string & CourseDoc;
    orgCode: string;
    orgName: string;
    fileKey: string;
    fileHash: string;
    uniKey: string;
    status: string;
    creator: string & UserDoc;
}

export interface CourseTalkDoc extends IDocument {
    ownerId: string & UserDoc;
    ownerName: string;
    courseId: string & CourseDoc;
    comments: string;
    sentToId: string & CourseTalkDoc;
    sentToName: string;
    status: number;
    orgName: string;
    orgCode: string;
}

export interface CourseMemberDoc extends IDocument {
    courseId: string & CourseDoc;
    ownerId: string & UserDoc;
    ownerName: string;
    uniqueId: string;
    wxSent: number;
    attend: Array<{
        lessonId: string & CourseLessonDoc;
        time: number;
        source: number;
    }>;
    stuNum: string;
    stuName: string;
    status: number;
    str: string;
    reward: number;
    orgName: string;
    orgCode: string;
}

export interface CourseMsgDoc extends IDocument {
    ownerId: string & UserDoc;
    ownerName: string;
    courseId: string & CourseDoc;
    msg: string;
    wxSent: number;
    status: number;
    orgName: string;
    orgCode: string;
}

export interface CourseDoc extends IDocument {
    ownerId: string & UserDoc;
    ownerName: string;
    name: string;
    hour: number;
    startDate: number;
    detail: string;
    isPublic: number;
    status: number;
    type: number;
    spends: number;
    year: number;
    quarter: number;
    costFee: number;
    doubleBlind: boolean;
    orgName: string;
    orgCode: string;
    trash: number;
}

export interface LocationDoc extends IDocument {
    orgCode: string;
    orgName: string;
    site: string;
    status: number;
    latitude: string;
    longitude: string;
}

export interface CourseLessonDoc extends IDocument {
    orgCode: string;
    orgName: string;
    courseId: string & CourseDoc;
    ownerId: string & UserDoc;
    ownerName: string;
    name: string;
    startedAt: number;
    date: string;
    startTime: string;
    endTime: string;
    location: string & LocationDoc
}

interface IPhaseConfig<ICreateParam = any> {
    namespace: string;
    key: string;
    title: string;
    param: ICreateParam;
    suffixPhaseKeys: Array<string>;
}

export interface GroupItemDoc extends IDocument {
    public: boolean;
    creator: string & UserDoc;
    updatedBy: string & UserDoc;
    sub: boolean;
    name: string;
    desc: string;
    children: Array<string & GroupItemDoc>;
    title: string;
    typeId: number;
    myChoice: boolean;
    important: boolean;
    items: Array<{
        type: number;
        option: string;
    }>;
    range: Array<number>;
    trackType: number;
}

export interface GroupDoc extends IDocument {
    name: string;
    desc: string;
    public: boolean;
    creator: string & UserDoc;
    updatedBy: string & UserDoc;
    groupItems: Array<string & GroupItemDoc>;
}

export interface SurveyDoc extends IDocument {
    ownerId: string & UserDoc;
    ownerName: string;
    title: string;
    summary: string;
    orgCode: string;
    orgName: string;
    public: boolean;
    password: number;
    authenticated: boolean;
    members: number;
    heads: number;
    bonus: number;
    mode: number;
    typeId: number;
    deadline: number;
    status: number;
    costFee: number;
    groups: Array<string & GroupDoc>;
    style: {
        bgColor: string;
        fontColor: string;
        hasMargin: boolean;
        hasOpacity: boolean;
    };
    doubleBlind: boolean;
    redpacketSum: number;
    accessible: number;
    trash: number;
    openAutoDeposit: number
}

export interface WalletDoc extends IDocument {
    balance: number;
    owner: string & UserDoc & SurveyDoc;
    ownerName: string;
    type: string;
    walletType: string;
}

export interface PermissionRoleDoc extends IDocument {
    name: string;
    permissions: Array<string>;
}

export interface UserDoc extends IDocument {
    phone: string;
    mobile: string;
    role: number;
    name: string;
    password: string;
    email: string;
    stuNum: string;
    status: number;
    gender: string;
    headimg: string;
    orgCode: string;
    orgName: string;
    wallet: string & WalletDoc;
    icName: string;
    icNumber: string;
    wxmedia: string;
    wxname: string;
    wxOpenId: string;
    wxUnionId: string;
    wxprovince: string;
    wxcity: string;
    wxcountry: string;
    wxSubscribe: number;
    permissionRole: string & PermissionRoleDoc;
    lastLogin: number;
    birth: Date;
    comparePassword: (
        password: string,
        cb: (err: Error, isMatch: boolean) => any
    ) => any;
}

export interface ElfGameDoc extends IDocument {
    orgCode: string;
    orgName: string;
    title: string;
    desc: string;
    owner: string;
    published: boolean;
    mode: string;
    phaseConfigs: Array<IPhaseConfig<{}>>;
    costFee: number;
    trash: number;
}
