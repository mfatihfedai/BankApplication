import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUser } from "../../../../context/UserContext";
import { useTranslation } from "react-i18next";

function PersonalInfoTable() {
  const { user } = useUser();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "max-content",
        padding: 3,
        paddingLeft: {md: 3, lg: 0},
      }}
    >
      <Card
        sx={{
          maxWidth: 800,
          minWidth: 300,
          width: "100%",
          boxShadow: 3,
          borderRadius: 2,
          background: "var(--color-box-background)",
          color: "var(--color-text)",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginBottom: 3,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "var(--color-primary)",
                width: 80,
                height: 80,
                mb: 2,
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 50 }} />
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              {user.name} {user.surname}
            </Typography>
            <Typography variant="body1">{user.role}</Typography>
          </Box>
          <Divider
            sx={{
              mb: 3,
              backgroundColor: "var(--color-text)",
            }}
          />
          <Grid
            container
            spacing={2}
            sx={{
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(5, 1fr)",
            }}
          >
            <Grid item xs={6}>
              <Typography variant="body2">Email:</Typography>
              <Typography variant="body1" style={{ wordBreak: "break-word" }}>
                {user.email}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{t("TC")}:</Typography>
              <Typography variant="body1">{user.identityNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{t("HesapNumarasi")}:</Typography>
              <Typography variant="body1">{user.accountNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{t("Bakiye")}:</Typography>
              <Typography variant="body1">{user.balance} ₺</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PersonalInfoTable;