package org.springframework.cloud.config.admin.domain;

/**
 * @author humbinal
 * @version V1.0
 * @description
 * @date 2018/6/30 16:40
 */

@lombok.Data
public class SaveConfigEntity {
    private String key;
    private String value;
}
