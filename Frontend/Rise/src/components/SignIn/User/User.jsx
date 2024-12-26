import DashboardHeader from "../../General/DashboardHeader";
import { userList } from "../../Core/MenuLists";
import MenuItems from "../../General/MenuItems";
import "./user.style.css"

function User() {
  return (
    <>
      <DashboardHeader />
      <div className = "user-parent">
        <div className="list-item">
          <MenuItems list={userList} />
        </div>
        <div className="component-item">
          <div>1</div>
        </div>
      </div>
    </>
  );
}

export default User;
