package org.springframework.cloud.config.admin.domain;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "config_properties")
public class Config {

    @Id
    @GeneratedValue(generator = "idGenerator")
    @GenericGenerator(name = "idGenerator", strategy = "uuid")
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

    public Config() {
    }

    public Config(String key, String value, String namespace, String profile, String label) {
        this.key = key;
        this.value = value;
        this.namespace = namespace;
        this.profile = profile;
        this.label = label;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getNamespace() {
        return namespace;
    }

    public void setNamespace(String namespace) {
        this.namespace = namespace;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
