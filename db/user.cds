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
        SALES_GROUPS        : Association to many USER_SALES_GROUP_MAP
                                  on SALES_GROUPS.USER_ID = $self.ID;
}

@cds.persistence.exists
entity USER_SALES_GROUP_MAP {
    key ID          : Integer;
        USER_ID     : Integer;
        SALES_GROUP : String(5);
        IS_ARCHIVED : hana.TINYINT;
        CREATED_AT  : DateTime;
        UPDATED_AT  : DateTime


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
        UPDATED_BY  : Integer
}
