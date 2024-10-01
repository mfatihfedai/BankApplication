package com.softwareProject.banksApplication.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_name")
    private String name;

    @Column(name = "user_surname")
    private String surname;

    @Column(name = "email")
    private String mail;

    @Column(name = "identitiy_number")
    private Long identityNumber;

    @Column(name = "account_no")
    private Long accountNumber;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @Column(name = "balance")
    private Long balance;

    @OneToOne(mappedBy = "userInfo")
    @JsonIgnore
    private ReceiptInfo receiptInfo;

    @OneToMany(mappedBy = "userInfo",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<LogInfo> logInfoList;

    public enum Role {
        ADMIN,
        USER
    }
}
