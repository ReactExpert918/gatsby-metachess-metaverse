import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import HeaderAccount from "../HeaderAccount";
import store from "../../store";
import { Actions } from "../../store/user/user.action";
import { MODES } from "../../constants/playModes";
import { MAIN_WEBSITE } from "../../config";
import BrainiacChessLogo from "../../lib/svgIcons/BrainiacChessLogo";
interface Props {
  transparent?: boolean;
  uri: string;
}

export const HeaderNavigatorItem = ({
  title,
  to,
  active,
  className,
}: {
  title: string;
  to: string;
  active?: boolean;
  className?: string;
}) => {
  return (
    <a
      onClick={() => {
        store.dispatch(Actions.setChoseMode(MODES.CHOSE_MODE));
        navigate("/");
      }}
      className={`headerNavigatorItem ${className || ""}`}
    >
      <p className={`headerNavigatorItemTitle ${active ? "active" : ""}`}>
        {title}
      </p>
      {/* <div
        className={`headerActiveIndicator ${
          active ? "headerActiveIndicatorActive" : ""
        }`}
      /> */}
    </a>
  );
};
export const HeaderLogo = ({setMenu,menu}) => {
  return (
    <div className="headerNavigatorContainer headerNavigatorMobile">
      <div>
      <Link className="mainLogo" to={MAIN_WEBSITE}>
        <BrainiacChessLogo className="headerNavigatorLogo" />
      </Link>
      </div>
      <div className="toggleBtn" onClick={()=>menu==='flex'?setMenu('none'):setMenu('flex')}>
      <img src="https://img.icons8.com/ios-filled/50/ffffff/menu--v1.png"/>
      </div>
    </div>
  );
};

export const HeaderNavigator = ({ currentUri,menu }: { currentUri: string }) => {
  return (
    <div className="headerNavigatorContainer headerNavigatorContainerMobile" style={{display:`${menu}`}}>
      <HeaderNavigatorItem to="/" title="PLAY" active={currentUri === "/"} />
      <HeaderNavigatorItem
        to="/learn"
        title="LEARN"
        active={currentUri === "/learn"}
      />
      <HeaderNavigatorItem
        to="/watch"
        title="WATCH"
        active={currentUri === "/watch"}
      />
      <HeaderNavigatorItem
        to="/community"
        title="COMMUNITY"
        active={currentUri === "/community"}
      />
    </div>
  );
};

export const withItemNumberIndicator = (
  component: JSX.Element,
  { number }: { number: number }
) => (
  <div className="withItemNumberIndicatorContainer">
    <div className="itemNumberIndicatorContainer">
      <p className="itemNumberIndicatorTitle"> {number}</p>
    </div>
    {component}
  </div>
);

// export const HeaderAccount = () => {
//   // const dispatch = useDispatch()
//   return (
//     <div className="headerNavigatorContainer">
//       {/* <div className="headerNavigatorItem">
//         {withItemNumberIndicator(<img src={MainLogo} style={{height: 38}} onClick={() => dispatch(chatActions.toggleSideChat())}/>, { number: 2 })}
//       </div>
//       <div className="headerNavigatorItem">
//         {withItemNumberIndicator(<img src={BellIcon} style={{height: 38}}/>, { number: 2 })}
//       </div> */}
//       <Link to="/account" className="headerNavigatorItem headerAccountContainer">
//         <img src={SmallPieceIcon} style={{height: '40px', width: '40px'}}/>
//         <p className="headerNavigatorAccountTitle">Akumasy</p>
//       </Link>
//     </div>
//   );
// };


const Header = ({ ...restProps }: Props) => {
  const [menu, setMenu] = useState("flex")
  return (
    <div className={`headerContainer`}>
      <HeaderLogo setMenu={setMenu} menu={menu} />
      <HeaderNavigator currentUri={restProps.uri}  menu={menu} />
      <HeaderAccount menu={menu}/>
      {/* <a className="test" onClick={()=>setMenu(true)}><i className="fas fa-bars"  aria-hidden="true"></i></a>
      {menu?
      <HeaderNavigator currentUri={restProps.uri} />
      
      :""} */}
    </div>
  );
};

export default Header;
