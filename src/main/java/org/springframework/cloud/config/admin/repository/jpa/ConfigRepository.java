package org.springframework.cloud.config.admin.repository.jpa;


import org.springframework.cloud.config.admin.domain.Config;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

import java.util.List;

@RepositoryDefinition(domainClass = Config.class, idClass = String.class)
public interface ConfigRepository extends PagingAndSortingRepository<Config, String>, JpaSpecificationExecutor<Config> {

    @Query("select DISTINCT(c.namespace) from Config c")
    List<String> distinctNamespaces();

    @Query("select DISTINCT(c.profile) from Config c where c.namespace=:namespace")
    List<String> distinctProfiles(@Param("namespace") String namespace);

    @Query("select DISTINCT(c.label) from Config c where c.namespace=:namespace and c.profile=:profile")
    List<String> distinctLabels(@Param("namespace") String namespace, @Param("profile") String profile);

    List<Config> findAllByNamespaceAndProfileAndLabel(String namespace, String profile, String label, Sort sort);

    void deleteByNamespaceAndProfileAndLabel(String namespace, String profile, String label);

}
