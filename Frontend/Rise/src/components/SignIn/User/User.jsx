import DashboardHeader from "../../General/DashboardHeader";
import { userList } from "../../Core/MenuLists";
import MenuItems from "../../General/MenuItems";
import "./user.style.css"
import { useAdminMenu } from "../../../context/AdminMenuContext";
import AccountActivities from "../GeneralComponent/AccountActivities/AccountActivities";
import AutomaticPayment from "../GeneralComponent/AutomaticPayment/AutomaticPayment";
import PersonalInfo from "../GeneralComponent/PersonalInfo/PersonalInfo";
import Receipt from "../GeneralComponent/Receipt/Receipt";
import Transfer from "../GeneralComponent/Transfer/Transfer";
import LogsInfo from "../GeneralComponent/LogsInfo/LogsInfo";
import Home from "../GeneralComponent/Home/Home";


function User() {

  const { componentName } = useAdminMenu();

  return (
    <>
      <DashboardHeader />
      <div className = "user-parent">
        <div className="list-item">
          <MenuItems list={userList} />
        </div>
        <div className="component-item">
          {componentName == "Home" && <Home />}
          {componentName == "AccountActivities" && <AccountActivities />}
          {componentName == "AutomaticPayment" && <AutomaticPayment />}
          {componentName == "LogsInfo" && <LogsInfo />}
          {componentName == "PersonalInfo" && <PersonalInfo />}
          {componentName == "Receipt" && <Receipt />}
          {componentName == "Transfer" && <Transfer />}
        </div>
      </div>
    </>
  );
}

export default User;
