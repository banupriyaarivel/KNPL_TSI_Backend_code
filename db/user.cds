@cds.persistence.exists
entity USER {
    key ID                  : Integer;
        FIRST_NAME          : String(255);
        LAST_NAME           : String(255);
        EMAIL               : String(255);
        PROFILE_IMAGE       : String(1000);
        IS_ARCHIVED         : hana.TINYINT;
        CREATED_AT          : DateTime;
        UPDATED_AT          : DateTime;
        APP_VERSION         : String(5);
        LAST_LOGIN_AT       : DateTime;
        EMPLOYEE_CODE       : String(20);
        ZONE                : String(10);
        DESIGNATION         : String(10);
        MANAGER             : String(255);
        MOBILE              : String(15);
        DIVISION_IDENTIFIER : String(10);
        IS_ACTIVATED        : hana.TINYINT;


        SALES_GROUPS        : Composition of many USER_SALES_GROUP_MAP
                                  on SALES_GROUPS.USER_ID = $self.ID;

        ROLE                : Composition of many MAP_USER_ROLE
                                  on ROLE.USER_ID = $self.ID;

        ASM                 : Association to many ZEMP_MASTER_ECC
                                  on ASM.EMAIL_ASM = $self.EMAIL;

        TSI                 : Association to many ZEMP_MASTER_ECC
                                  on TSI.EMAIL_TSI = $self.EMAIL;

        RSM                 : Association to many ZEMP_MASTER_ECC
                                  on RSM.RSMID = $self.EMPLOYEE_CODE;

        RSMDepos            : Association to many ZEMP_MASTER_ECC
                                  on RSMDepos.EMAIL_DSM = $self.EMAIL;
}

@cds.persistence.exists
entity USER_SALES_GROUP_MAP {
    key ID          : Integer;
        USER_ID     : Integer;
        SALES_GROUP : String(5);
        IS_ARCHIVED : hana.TINYINT;
        CREATED_AT  : DateTime;
        UPDATED_AT  : DateTime;


}

@cds.persistence.exists
entity MAP_USER_ROLE {
    key ID          : Integer;
        USER_ID     : Integer;
        ROLE_ID     : Integer;
        IS_ARCHIVED : hana.TINYINT;
        CREATED_AT  : DateTime;
        CREATED_BY  : Integer;
        UPDATED_AT  : DateTime;
        UPDATED_BY  : Integer;
}

@cds.persistence.exists
define entity ZEMP_MASTER_ECC {
    key MANDT          : String(3) default '300';
    key TOWN           : String(40) default '0000';
        VWERK          : String(4);
        RSMID          : String(12);
        RSMBP          : String(10);
        RSMNAME        : String(40);
        RSMUNIQUE_SG   : String(3);
        RSMUNIQUE_DEPO : String(4);
        DSMID          : String(12);
        DSMUNIQUE_SG   : String(3);
        DSMUNIQUE_DEPO : String(4);
        EMAIL_DSM      : String(241);
    key ASMID          : String(12);
    key ASMBP          : String(10);
        ASMUNIQUE      : String(4);
        ASMNAME        : String(40);
        ASMUNIQUE_SG   : String(3);
        EMAIL_ASM      : String(241);
        ASM_PHN_NO     : String(10);
    key SALESMANID     : String(12);
    key TSIBP          : String(10);
        TSINAME        : String(40);
        EMAIL_TSI      : String(241);
        TSI_PHN_NO     : String(10);
        VKGRP          : String(3);
        DIVISION       : String(2);
        USNAM          : String(12);
        TIMESTAMP      : Decimal(15, 0);

}


define view VIEW_RSM as
    select from USER as u
    inner join MAP_USER_ROLE as r
        on u.ID = r.USER_ID
    left outer join USER_SALES_GROUP_MAP as sgm
        on u.ID = sgm.USER_ID
    {
        u.ID   as USER_ID,
        u.FIRST_NAME,
        u.LAST_NAME,
        u.EMAIL,
        u.PROFILE_IMAGE,
        u.IS_ARCHIVED,
        u.APP_VERSION,
        u.LAST_LOGIN_AT,
        u.EMPLOYEE_CODE,
        u.ZONE,
        u.DESIGNATION,
        u.MANAGER,
        u.MOBILE,
        u.DIVISION_IDENTIFIER,
        u.IS_ACTIVATED,
        sgm.SALES_GROUP,
        sgm.ID as SALES_GROUP_ID,
        r.ROLE_ID
    }
    where
            r.ROLE_ID     = 1
        and r.IS_ARCHIVED = 0
        and (
               sgm.IS_ARCHIVED is null
            or sgm.IS_ARCHIVED =  0
        );


define view VIEW_ASM as
    select from USER as u
    inner join MAP_USER_ROLE as r
        on u.ID = r.USER_ID
    left outer join USER_SALES_GROUP_MAP as sgm
        on u.ID = sgm.USER_ID
    {
        u.ID   as USER_ID,
        u.FIRST_NAME,
        u.LAST_NAME,
        u.EMAIL,
        u.PROFILE_IMAGE,
        u.IS_ARCHIVED,
        u.APP_VERSION,
        u.LAST_LOGIN_AT,
        u.EMPLOYEE_CODE,
        u.ZONE,
        u.DESIGNATION,
        u.MANAGER,
        u.MOBILE,
        u.DIVISION_IDENTIFIER,
        u.IS_ACTIVATED,
        sgm.SALES_GROUP,
        sgm.ID as SALES_GROUP_ID,
        r.ROLE_ID
    }
    where
            r.ROLE_ID     = 2
        and r.IS_ARCHIVED = 0
        and (
               sgm.IS_ARCHIVED is null
            or sgm.IS_ARCHIVED =  0
        );


define view VIEW_TSI as
    select from USER as u
    inner join MAP_USER_ROLE as r
        on u.ID = r.USER_ID
    left outer join USER_SALES_GROUP_MAP as sgm
        on u.ID = sgm.USER_ID
    {
        u.ID   as USER_ID,
        u.FIRST_NAME,
        u.LAST_NAME,
        u.EMAIL,
        u.PROFILE_IMAGE,
        u.IS_ARCHIVED,
        u.APP_VERSION,
        u.LAST_LOGIN_AT,
        u.EMPLOYEE_CODE,
        u.ZONE,
        u.DESIGNATION,
        u.MANAGER,
        u.MOBILE,
        u.DIVISION_IDENTIFIER,
        u.IS_ACTIVATED,
        sgm.SALES_GROUP,
        sgm.ID as SALES_GROUP_ID,
        r.ROLE_ID
    }
    where
            r.ROLE_ID     = 3
        and r.IS_ARCHIVED = 0
        and (
               sgm.IS_ARCHIVED is null
            or sgm.IS_ARCHIVED =  0
        );
