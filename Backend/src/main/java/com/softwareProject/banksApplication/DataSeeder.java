package com.softwareProject.banksApplication;

import com.github.javafaker.Faker;
import com.softwareProject.banksApplication.entity.*;
import com.softwareProject.banksApplication.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Locale;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final BanksRepo bankRepo;
    private final UserRepo userRepo;
    private final ReceiptRepo receiptRepo;
    private final InvoiceRepo invoiceRepo;
    private final TransferRepo transferRepo;
    private final LogRepo logRepo;

    private final Random random = new Random();
    private final Faker faker = new Faker(new Locale("en"));

    @Override
    public void run(String... args) {
//        createBanks();
//        createUsersWithData();
    }

    private void createBanks() {
        for (int i = 1; i <= 10; i++) {
            BanksInfo bank = new BanksInfo();
            bank.setBankName(faker.company().name() + " Bank");
            bank.setTransferFee(BigDecimal.valueOf(random.nextInt(5) + 1));
            bankRepo.save(bank);
        }
    }

    private void createUsersWithData() {
        List<BanksInfo> banks = bankRepo.findAll();

        for (int i = 1; i <= 25; i++) {
            UserInfo user = new UserInfo();
            user.setName(faker.name().firstName());
            user.setSurname(faker.name().lastName());
            user.setEmail(faker.internet().emailAddress());
            user.setIdentityNumber(10000000000L + i);
            user.setAccountNumber(20000000000L + i);
            user.setPassword("pass" + i);
            user.setRole(UserInfo.Role.USER);
            user.setBalance(BigDecimal.valueOf(random.nextInt(10000) + 1000));
            user = userRepo.save(user);

            ReceiptInfo receipt = new ReceiptInfo();
            receipt.setUserInfo(user);
            receipt = receiptRepo.save(receipt);
            user.setReceiptInfo(receipt);
            userRepo.save(user);
            receipt = user.getReceiptInfo();

            // 20 fatura
            for (int j = 0; j < 20; j++) {
                InvoiceInfo invoice = new InvoiceInfo();
                invoice.setInvoiceNo(300000L + random.nextInt(10000));
                invoice.setInvoiceType(randomEnum(InvoiceInfo.InvoiceType.class));
                invoice.setInvoiceAmount(BigDecimal.valueOf(random.nextInt(200) + 50));
                invoice.setPayDate(randomDateTimeThisYear());
                invoice.setAutobill(random.nextBoolean());
                System.out.println("faturaya girdi.");
                System.out.println(receipt);
                invoice.setReceiptInfo(receipt);
                invoiceRepo.save(invoice);
            }

            // 20 havale
            for (int j = 0; j < 20; j++) {
                TransferInfo transfer = new TransferInfo();
                transfer.setReceiverAccountNo(20000000000L + random.nextInt(25));
                transfer.setTransferAmount(BigDecimal.valueOf(random.nextInt(500) + 50));
                transfer.setTransferTime(randomDateTimeThisYear());
                transfer.setMessage(faker.lorem().sentence(3));
                BanksInfo bank = banks.get(random.nextInt(banks.size()));
                transfer.setBankName(bank.getBankName());
                transfer.setTransferFee(bank.getTransferFee());
                transfer.setReceiver(random.nextBoolean());
                transfer.setReceiptInfo(receipt);
                transferRepo.save(transfer);
            }

            // 60 log
            for (int j = 0; j < 60; j++) {
                LogInfo log = new LogInfo();
                LocalDateTime login = randomDateTimeThisYear();
                log.setLoginTime(login);
                log.setLogoutTime(login.plusMinutes(random.nextInt(60)));
                log.setUserInfo(user);
                logRepo.save(log);
            }
        }
    }

    private <T extends Enum<?>> T randomEnum(Class<T> clazz) {
        T[] values = clazz.getEnumConstants();
        return values[random.nextInt(values.length)];
    }

    private LocalDateTime randomDateTimeThisYear() {
        int day = random.nextInt(365);
        int hour = random.nextInt(24);
        int minute = random.nextInt(60);
        return LocalDateTime.of(LocalDate.now().withDayOfYear(1), LocalTime.MIDNIGHT)
                .plusDays(day).plusHours(hour).plusMinutes(minute);
    }
}
