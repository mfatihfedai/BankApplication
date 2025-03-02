package com.softwareProject.banksApplication.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

import java.time.LocalDateTime;

@Entity
@Table(name = "invoices")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_id")
    private Long id;

    @Column(name = "invoice_no")
    private Long invoiceNo;

    @Column(name = "invoice_type")
    private InvoiceType invoiceType;

    @Column(name = "invoice_amount")
    private BigDecimal invoiceAmount;

    @Column(name = "pay_date")
    private LocalDateTime payDate;

    @Column(name = "autobill")
    private boolean autobill;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "invoice_receipt_id", referencedColumnName = "receipt_id")
    @JsonIgnore
    private ReceiptInfo receiptInfo;

    public enum InvoiceType {
        Doğalgaz,
        Elektrik,
        Su,
        Telefon
    }
    @Override
    public String toString() {
        return "UserInfo{" +
                "id=" + id +
                ", invoiceNo='" + invoiceNo + '\'' +
                ", invoiceType='" + invoiceType + '\'' +
                ", invoiceAmount='" + invoiceAmount + '\'' +
                ", payDate=" + payDate + '\'' +
                ", autobill=" + autobill +
                '}';
    }
}
