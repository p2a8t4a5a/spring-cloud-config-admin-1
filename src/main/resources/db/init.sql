CREATE TABLE config_properties (
    conf_id          varchar(32) NOT NULL,
    conf_key         varchar(50)  DEFAULT NULL,
    conf_value       varchar(500) DEFAULT NULL,
    conf_name varchar(50)  DEFAULT NULL,
    conf_profile     varchar(50)  DEFAULT NULL,
    conf_label       varchar(50)  DEFAULT NULL,
    PRIMARY KEY (conf_id)
);

#
# Data for table "properties"
#

INSERT INTO config_properties VALUES (1, 'key1', 'value1', 'application', 'dev', 'master');
INSERT INTO config_properties VALUES (2, 'key2', 'value2', 'application', 'dev', 'master');
INSERT INTO config_properties VALUES (3, 'key2', 'value2', 'application', 'prod', 'master');
