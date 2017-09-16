import { connect, Dispatch } from 'react-redux';
import * as AuthAction from '../../redux/actions/auth/AuthAction';
import Login from '../../view/auth/Login';
import * as State from '../../redux/state';

/* 
mapStateToProps原型，TStteProps是Presentational Component的props的定义,state: any是redux的全部状态树
mapStateToProps就是一个转换过滤函数把redux的全部状态树在Presentational Component的props上完成映射
interface MapStateToProps<TStateProps, TOwnProps> {
    (state: any, ownProps?: TOwnProps): TStateProps;
}
*/

export function mapStateToProps(state: State.Root): AuthAction.AuthResp {
    // tslint:disable-next-line:no-console
    console.log('mapStateToProps:' + JSON.stringify(state));
    return state.auth;
}

/* 
mapDispatchToProps原型，TDispatchProps是Presentational Component的props中的回调函数句柄集合的定义
mapDispatchToProps函数实现的是当在Presentational Component的内部调用props中的回调函数时，本函数完成
回调函数调用的实现，实现为调用redux的调用
interface MapDispatchToPropsFunction<TDispatchProps, TOwnProps> {
    (dispatch: Dispatch<any>, ownProps?: TOwnProps): TDispatchProps;
}
*/
export function mapDispatchToProps(dispatch: Dispatch<AuthAction.AuthResp>): AuthAction.AccountDispatch {
    return {
        accountLogin: (request: AuthAction.AuthReqByAccount) => dispatch(AuthAction.accountLogin(request)),
    };
}

export default connect<{}, {}, AuthAction.AuthResp>(mapStateToProps, mapDispatchToProps)(Login);
