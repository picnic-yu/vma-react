import * as Config from '../actions/config/ConfigAction';
import * as Auth from '../actions/auth/AuthAction';
import * as Menu from '../actions/menu/MenuAction';

export type Root = {
    config: Config.Config,
    auth: Auth.AuthResp,
    menu: Array<Menu.Menu>
};