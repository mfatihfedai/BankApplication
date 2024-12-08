package com.softwareProject.banksApplication.core.scheduler;

import com.softwareProject.banksApplication.core.auth.MailMessageService;
import com.softwareProject.banksApplication.entity.InvoiceInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.repo.InvoiceRepo;
import com.softwareProject.banksApplication.service.abstracts.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class InvoiceScheduler {

    private final InvoiceRepo invoiceRepo;
    private final UserService userService;
    private final MailMessageService mailMessageService;

    @Scheduled(cron = "0 0 0 1 * ?")  // Her ayın 1. günü saat 00:00'da çalışacak
    @Transactional
    @Async
    public void processAutobillInvoices() {
        List<InvoiceInfo> autobillInvoices = invoiceRepo.findLatestAutobillInvoices();
        Random random = new Random();

        for (InvoiceInfo invoice : autobillInvoices) {
            int randomAmount = generateRandomInvoiceAmount(invoice.getInvoiceAmount().intValue(), random); // BigDecimal int'e çevriliyor
            UserInfo user = invoice.getReceiptInfo().getUserInfo();

            BigDecimal randomAmountBigDecimal = BigDecimal.valueOf(randomAmount);
            if (user.getBalance().compareTo(randomAmountBigDecimal) >= 0) {
                InvoiceInfo newInvoice = new InvoiceInfo();
                newInvoice.setInvoiceNo(invoice.getInvoiceNo());
                newInvoice.setInvoiceType(invoice.getInvoiceType());
                newInvoice.setInvoiceAmount(randomAmountBigDecimal); // Random amount as BigDecimal
                newInvoice.setPayDate(LocalDateTime.now());
                newInvoice.setAutobill(true);
                newInvoice.setReceiptInfo(invoice.getReceiptInfo());
                invoiceRepo.save(newInvoice);

                user.setBalance(user.getBalance().subtract(randomAmountBigDecimal)); // Balance subtraction
                userService.save(user);  // Save updated balance
                mailMessageService.sendInvoiceNotification(user, randomAmount, true);  // Success notification
                System.out.println("Fatura ödendi: " + randomAmount + " TL. Kullanıcı bakiyesi: " + user.getBalance());
            } else {
                mailMessageService.sendInvoiceNotification(user, randomAmount, false);  // Insufficient balance notification
                System.out.println("Yetersiz bakiye. Fatura ödenemedi.");
            }
        }
    }


    private int generateRandomInvoiceAmount(int originalAmount, Random random) {
        int lowerBound = (int) (originalAmount * 0.5);
        int upperBound = (int) (originalAmount * 1.5);
        return random.nextInt(upperBound - lowerBound) + lowerBound;
    }
}
