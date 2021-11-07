import React from "react";
import { Link, navigate } from "gatsby";
import { useDispatch } from "react-redux";
import { chatActions } from "../../store/chat/chat.actions";
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
}: {
  title: string;
  to: string;
  active?: boolean;
}) => {
  return (
    <a
      onClick={() => {
        store.dispatch(Actions.setChoseMode(MODES.CHOSE_MODE));
        navigate("/");
      }}
      className="headerNavigatorItem"
    >
      <p className={`headerNavigatorItemTitle ${active ? "active" : ""}`}>{title}</p>
      {/* <div
        className={`headerActiveIndicator ${
          active ? "headerActiveIndicatorActive" : ""
        }`}
      /> */}
    </a>
  );
};
export const HeaderLogo = () => {
  return (
    <div className="headerNavigatorContainer">
      <Link className="mainLogo" to={MAIN_WEBSITE}>
        <BrainiacChessLogo className="headerNavigatorLogo" />
      </Link>
    </div>
  );
};

export const HeaderNavigator = ({ currentUri }: { currentUri: string }) => {
  return (
    <div className="headerNavigatorContainer">
      <HeaderNavigatorItem to="/" title="PLAY" active={currentUri === "/"} />
      <HeaderNavigatorItem to="/learn" title="LEARN" active={currentUri === '/learn'}/>
      <HeaderNavigatorItem to="/watch" title="WATCH" active={currentUri === '/watch'}/>
      <HeaderNavigatorItem to="/community" title="COMMUNITY" active={currentUri === '/community'}/>
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
  return (
    <div className={`headerContainer`}>
      <HeaderLogo />
      <HeaderNavigator currentUri={restProps.uri} />
      <HeaderAccount />
    </div>
  );
};

export default Header;
