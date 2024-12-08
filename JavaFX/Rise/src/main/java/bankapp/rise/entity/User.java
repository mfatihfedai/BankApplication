package bankapp.rise.entity;


import java.math.BigDecimal;

public class User {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private Long identityNumber;
    private Long accountNumber;
    private String role;
    private BigDecimal balance;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}
