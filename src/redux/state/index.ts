import * as Auth from '../actions/auth/AuthAction';
import * as Menu from '../actions/menu/MenuAction';

export type Root = {
    auth: Auth.AuthResp,
    menu: Array<Menu.Menu>
};