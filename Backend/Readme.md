# API Documentation

## User Endpoints

| **Endpoint**              | **HTTP Method** | **Access Level**           | **Description**                                                                 |
| ------------------------- | --------------- | -------------------------- | ------------------------------------------------------------------------------- |
| `/dev/v1/user`            | `POST`          | Public                     | Creates a new user. Accepts `UserSaveRequest` and returns the created user.     |
| `/dev/v1/user/{id}`       | `GET`           | User (for own info), Admin | Fetches user details by ID. Only the authenticated user or an admin can access. |
| `/dev/v1/user/{id}`       | `PUT`           | User (for own info), Admin | Updates user details by ID. Accepts `UserUpdateRequest`.                        |
| `/dev/v1/user`            | `GET`           | Admin                      | Provides paginated user details. Admin access required.                         |
| `/dev/v1/user`            | `DELETE`        | User (for own info)        | Deletes the logged-in user's account.                                           |
| `/dev/v1/user/search`     | `POST`          | Admin                      | Searches users by a keyword. Admin access required.                             |
| `/dev/v1/user/forgetPass` | `POST`          | Public                     | Handles forgotten passwords. Accepts email and returns user details.            |

## Bank Endpoints

| **Endpoint**         | **HTTP Method** | **Access Level** | **Description**                                           |
| -------------------- | --------------- | ---------------- | --------------------------------------------------------- |
| `/dev/v1/banks`      | `POST`          | Admin            | Creates a new bank entry. Accepts `BanksSaveRequest`.     |
| `/dev/v1/banks/{id}` | `PUT`           | Admin            | Updates a bank entry by ID. Accepts `BanksUpdateRequest`. |
| `/dev/v1/banks/{id}` | `GET`           | User, Admin      | Fetches bank details by ID.                               |
| `/dev/v1/banks`      | `GET`           | Admin            | Fetches paginated bank details. Admin access required.    |
| `/dev/v1/banks/{id}` | `DELETE`        | Admin            | Deletes a bank entry by ID.                               |

## Invoice Endpoints

| **Endpoint**                             | **HTTP Method** | **Access Level**           | **Description**                                                          |
| ---------------------------------------- | --------------- | -------------------------- | ------------------------------------------------------------------------ |
| `/dev/v1/invoices/create`                | `POST`          | User (for own info), Admin | Creates an invoice for the logged-in user. Accepts `InvoiceSaveRequest`. |
| `/dev/v1/invoices/autobill`              | `GET`           | User (for own info), Admin | Fetches autobill invoices for the logged-in user.                        |
| `/dev/v1/invoices/{id}`                  | `PUT`           | User (for own info), Admin | Updates an invoice by ID. Accepts `InvoiceUpdateRequest`.                |
| `/dev/v1/invoices/{id}`                  | `GET`           | User (for own info), Admin | Fetches invoice details by ID.                                           |
| `/dev/v1/invoices`                       | `GET`           | Admin                      | Fetches paginated invoice details. Admin access required.                |
| `/dev/v1/invoices/{id}`                  | `DELETE`        | Admin                      | Deletes an invoice by ID.                                                |
| `/dev/v1/invoices/lastFourInvoiceAmount` | `GET`           | User (for own info), Admin | Retrieves the last four invoice amounts.                                 |

## Receipt Endpoints

| **Endpoint**             | **HTTP Method** | **Access Level** | **Description**                                                      |
|--------------------------| --------------- | --------------- | -------------------------------------------------------------------- |
| `/dev/v1/receipt/get`    | `GET`           | Admin, User     | Fetches paginated receipt details.                                    |
| `/dev/v1/receipt/getAll` | `GET`           | Admin     | Fetches paginated receipt details.  |

## Log Endpoints

| **Endpoint**         | **HTTP Method** | **Access Level** | **Description**                                                      |
|----------------------| --------------- | --------------- | -------------------------------------------------------------------- |
| `/dev/v1/logs`       | `GET`           | Admin, User     | Fetches paginated receipt details.                                    |

## Transfer Endpoints

| **Endpoint**            | **HTTP Method** | **Access Level**           | **Description**                                                           |
| ----------------------- | --------------- | -------------------------- | ------------------------------------------------------------------------- |
| `/dev/v1/transfer`      | `POST`          | User (for own info), Admin | Creates a transfer for the logged-in user. Accepts `TransferSaveRequest`. |
| `/dev/v1/transfer/{id}` | `PUT`           | Admin                      | Updates a transfer by ID. Accepts `TransferUpdateRequest`.                |
| `/dev/v1/transfer/{id}` | `GET`           | User (for own info), Admin | Fetches transfer details by ID.                                           |
| `/dev/v1/transfer`      | `GET`           | Admin                      | Fetches paginated transfer details. Admin access required.                |
| `/dev/v1/transfer/{id}` | `DELETE`        | Admin, User                | Deletes a transfer by ID.                                                 |

## Security Configuration

| **Endpoint**          | **Access Level**                                                        | **Description**                                      |
| --------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------- |
| `/login`              | Public                                                                  | Open to all users.                                   |
| `/auth/dashboard`     | Role: USER                                                              | Access restricted to authenticated users.            |
| `/swagger-ui/**`      | Authenticated                                                           | Swagger UI access restricted to authenticated users. |
| `/dev/v1/banks/**`    | Role: ADMIN for POST, PUT, DELETE. Role: USER, ADMIN for GET            | Permissions vary by method and user role.            |
| `/dev/v1/user/**`     | Role: ADMIN for DELETE, Public for POST, Role: USER, ADMIN for GET, PUT | Permissions vary by method and user role.            |
| `/dev/v1/invoice/**`  | Role: ADMIN for DELETE, Role: USER, ADMIN for POST, PUT, GET            | Permissions vary by method and user role.            |
| `/dev/v1/receipt/**`  | Role: ADMIN, USER                                                       | Accessible by both roles.                            |
| `/dev/v1/transfer/**` | Role: ADMIN for DELETE, PUT. Role: USER, ADMIN for POST, GET            | Permissions vary by method and user role.            |

## Auth Endpoints

| **Endpoint**       | **HTTP Method** | **Access Level** | **Description**                                                                           |
| ------------------ | --------------- | ---------------- | ----------------------------------------------------------------------------------------- |
| `/auth/login`      | `POST`          | Public           | Authenticates the user with identity number and password. Generates an OTP if successful. |
| `/auth/logout`     | `POST`          | User             | Logs out the authenticated user and invalidates the session.                              |
| `/auth/verify-otp` | `POST`          | User             | Verifies OTP in front-end integration, granting session access upon success.              |

### Auth Endpoint Details

- **`/auth/login`**: Accepts identity number and password. On successful authentication, generates an OTP and returns the user's ID.
- **`/auth/logout`**: Invalidates the user's session, logs the logout event, and redirects to the login page.
- **`/auth/generate-otp/{id}`**: Generates an OTP and sends it to the user's registered email.
- **`/auth/verify`** and **`/auth/verify-otp`**: Handle OTP verification, store session attributes upon success, and direct users to the appropriate page based on their role (admin or user).

### Access Level Definitions:

- **User (for own info)**: Authenticated users can access or modify only their own data.
- **Admin**: Users with administrative privileges who can access and manage all data.

### Notes:

- `@PreAuthorize` is used to enforce authorization rules based on the roles and access levels.
- Pagination endpoints provide cursor-based pagination for efficient data retrieval.
