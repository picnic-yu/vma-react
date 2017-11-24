import * as React from 'react';
import * as ClassName from 'classnames';

import { Root as AppState } from '../redux/state';
import { connect, MapStateToPropsParam } from 'react-redux';
import * as AuthAction from '../redux/actions/auth/AuthAction';

interface ViewProps {
    permits?: Array<AuthAction.Permit>;
}

interface OwnProps {
    url: string;
    oper: AuthAction.OperType;
    hidden?: boolean;
}

interface PermitState {
    permitFlag?: boolean;    
}
const mapStateToPropsParam: MapStateToPropsParam<ViewProps, OwnProps, {}> = (appState: AppState) => {
    return {
        permits: appState.auth.permits
    };
};

class Permit extends React.Component<ViewProps & OwnProps, PermitState> {
    constructor(props: ViewProps & OwnProps) {
        super(props);
        this.state = {permitFlag: this.isPermit()};
    }

    render() {
        // console.log(`${JSON.stringify(this.props.permits)}`);
        let permitFlag = this.isPermit();
        return (
        <div className={ClassName({'action-disabled': permitFlag === false})} style={{display: 'inline-block'}}>
            {this.props.hidden === true ? (
                null
            ) : (
                this.props.children                
            )
            }
        </div>
        );
    }

    isPermit = (): boolean => {
        let permitFlag = false;
        let { url, oper, permits } = this.props;
        if (permits !== undefined) {
            permits.forEach(item => {
                if (item.url.indexOf(url) !== -1) {
                    if (item.oper !== undefined) {
                        if (item.oper.indexOf(oper) !== -1) {
                            permitFlag = true;
                        }
                    }
                }
            });
        }

        return permitFlag;
    }
}

export default connect<ViewProps, {}, OwnProps>(mapStateToPropsParam)(Permit);