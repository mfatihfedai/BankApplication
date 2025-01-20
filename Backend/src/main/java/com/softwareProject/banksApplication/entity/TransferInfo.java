package com.softwareProject.banksApplication.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
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
    private Long id;

    @Column(name = "receiver_account_no")
    private Long receiverAccountNo;

    @Column(name = "transfer_time")
    private LocalDateTime transferTime;

    @Column(name = "transfer_amount")
    private BigDecimal transferAmount;

    @Column(name = "message")
    private String message;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "transfer_fee")
    private BigDecimal transferFee;

    @Column(name = "is_receiver")
    private boolean isReceiver;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "transfer_receipt_id", referencedColumnName = "receipt_id")
    @JsonIgnore
    private ReceiptInfo receiptInfo;
}
