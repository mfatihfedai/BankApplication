import DashboardHeader from "../../General/DashboardHeader";
import { useMenuItems } from "../../Core/useMenuItems";
import MenuItems from "../../General/MenuItems";
import "./user.style.css";
import { useAdminMenu } from "../../../context/AdminMenuContext";
import Invoice from "../GeneralComponent/Invoice/Invoice";
import AutomaticPayment from "../GeneralComponent/AutomaticPayment/AutomaticPayment";
import PersonalInfo from "../GeneralComponent/PersonalInfo/PersonalInfo";
import Receipt from "../GeneralComponent/Receipt/Receipt";
import Transfer from "../GeneralComponent/Transfer/Transfer";
import LogsInfo from "../GeneralComponent/LogsInfo/LogsInfo";
import Home from "../GeneralComponent/Home/Home";
import CircularMenu from "../../Home/MenuBar/CircularMenu";

function User() {
  const { componentName } = useAdminMenu();
  const { userList } = useMenuItems();

  return (
    <>
      <DashboardHeader />
      <div className="user-parent">
        <div className="list-item">
          <MenuItems list={userList} />
        </div>
        <div className="component-item">
          {componentName == "Home" && <Home />}
          {componentName == "Receipt" && <Receipt />}
          {componentName == "AutomaticPayment" && <AutomaticPayment />}
          {componentName == "LogsInfo" && <LogsInfo />}
          {componentName == "PersonalInfo" && <PersonalInfo />}
          {componentName == "Invoice" && <Invoice />}
          {componentName == "Transfer" && <Transfer />}
        </div>
      </div>
      <div className="circular-menu">
        <CircularMenu userType="user" />
      </div>
    </>
  );
}

export default User;
