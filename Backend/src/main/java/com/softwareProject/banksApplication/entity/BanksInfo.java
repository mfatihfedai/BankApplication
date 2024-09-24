package com.softwareProject.banksApplication.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "banks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BanksInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bank_id")
    private int id;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "transfer_fee")
    private int transferFee;
}
