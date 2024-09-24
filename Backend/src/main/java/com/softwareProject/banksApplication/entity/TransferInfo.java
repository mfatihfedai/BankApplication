package com.softwareProject.banksApplication.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "transfers")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transfer_id")
    private int id;

    @Column(name = "receiver_account_no")
    private int receiverAccountNo;

    @Column(name = "transfer_time")
    private LocalDateTime transferTime;

    @Column(name = "transfer_amount")
    private int transferAmount;

    @Column(name = "message")
    private String message;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "transfer_fee")
    private int transferFee;

    @ManyToOne()
    @JoinColumn(name = "transfer_receipt_id", referencedColumnName = "receipt_id")
    @JsonIgnore
    private ReceiptInfo receiptInfo;
}
