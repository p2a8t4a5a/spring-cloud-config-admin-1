package org.springframework.cloud.config.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.config.admin.domain.Config;
import org.springframework.cloud.config.admin.domain.SaveConfigEntity;
import org.springframework.cloud.config.admin.repository.jpa.ConfigRepository;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/admin/ui/config", consumes = "application/json;charset=UTF-8", produces = "application/json;charset=UTF-8")
public class ConfigController {

    @Autowired
    ConfigRepository configRepository;

    @GetMapping("/namespaces")
    public List<String> getNamespaces() {
        return configRepository.distinctNamespaces();
    }

    @GetMapping("/namespaces/{namespace}/profiles")
    public List<String> getProfiles(@PathVariable(name = "namespace") String namespace) {
        return configRepository.distinctProfiles(namespace);
    }

    @GetMapping("/namespaces/{namespace}/profiles/{profile}/labels")
    public List<String> getProfiles(@PathVariable(name = "namespace") String namespace,
                                    @PathVariable(name = "profile") String profile) {
        return configRepository.distinctLabels(namespace, profile);
    }

    @GetMapping("/namespaces/{namespace}/profiles/{profile}/labels/{label}/configs")
    public List<Config> getConfigs(@PathVariable(name = "namespace") String namespace,
                                   @PathVariable(name = "profile") String profile,
                                   @PathVariable(name = "label") String label) {
        Sort sort = new Sort(Sort.Direction.ASC, "key");
        return configRepository.findAllByNamespaceAndProfileAndLabel(namespace, profile, label, sort);
    }

    @PostMapping("/namespaces/{namespace}/profiles/{profile}/labels/{label}/configs")
    public Iterable<Config> saveConfigs(@PathVariable(name = "namespace") String namespace,
                                        @PathVariable(name = "profile") String profile,
                                        @PathVariable(name = "label") String label,
                                        @RequestBody List<SaveConfigEntity> saveConfigEntitys) {
        List<Config> configs = new ArrayList<>();
        for (SaveConfigEntity entity : saveConfigEntitys) {
            Config config = new Config();
            config.setNamespace(namespace);
            config.setProfile(profile);
            config.setLabel(label);
            config.setKey(entity.getKey());
            config.setValue(entity.getValue());
            configs.add(config);
        }
        return configRepository.saveAll(configs);
    }

    @PostMapping("/configs")
    public Config deleteByID(@RequestBody Config config) {
        return configRepository.save(config);
    }


    @DeleteMapping("/configs/{id}")
    public List<String> deleteByID(@PathVariable(name = "id") String id) {
        List<String> result = new ArrayList<>();
        configRepository.deleteById(id);
        result.add(id);
        return result;
    }

}
