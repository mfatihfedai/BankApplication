package com.softwareProject.banksApplication.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "receipts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceiptInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "receipt_id")
    private Long id;

    @OneToOne()
    @JoinColumn(name = "receipt_user_id", referencedColumnName = "user_id")
    private UserInfo userInfo;

    @OneToMany(mappedBy = "receiptInfo",fetch = FetchType.LAZY)
    private List<InvoiceInfo> invoiceInfoList;

    @OneToMany(mappedBy = "receiptInfo",fetch = FetchType.LAZY)
    private List<TransferInfo> transferList;
}
