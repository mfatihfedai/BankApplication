package bankapp.rise.entity;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@Getter
@Setter
public class User {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private Long identityNumber;
    private Long accountNumber;
    private String role;
    private BigDecimal balance;
}
