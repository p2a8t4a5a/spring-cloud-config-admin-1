package org.springframework.cloud.config.admin.domain;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "config_properties")
@lombok.Data
public class Config {

    @Id
    @GeneratedValue(generator="idGenerator")
    @GenericGenerator(name="idGenerator", strategy="uuid")
    @Column(name = "conf_id")
    private String id;

    @Column(name = "conf_key")
    private String key;

    @Column(name = "conf_value")
    private String value;

    @Column(name = "conf_name")
    private String namespace;

    @Column(name = "conf_profile")
    private String profile;

    @Column(name = "conf_label")
    private String label;
}
