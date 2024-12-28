import DashboardHeader from "../../General/DashboardHeader";
import { userList } from "../../Core/MenuLists";
import MenuItems from "../../General/MenuItems";
import "./user.style.css"
import Home from "../Admin/Home/Home";
import { useAdminMenu } from "../../../context/AdminMenuContext";

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
           {componentName == "Anasayfa" && <Home />}
        </div>
      </div>
    </>
  );
}

export default User;
