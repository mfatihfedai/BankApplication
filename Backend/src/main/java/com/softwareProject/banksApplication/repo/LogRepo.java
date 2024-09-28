package com.softwareProject.banksApplication.repo;

import com.softwareProject.banksApplication.entity.LogInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepo extends JpaRepository<LogInfo, Long> {
}
