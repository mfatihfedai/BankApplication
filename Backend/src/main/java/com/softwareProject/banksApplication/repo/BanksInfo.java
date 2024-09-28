package com.softwareProject.banksApplication.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BanksInfo extends JpaRepository<com.softwareProject.banksApplication.entity.BanksInfo, Long> {
}
