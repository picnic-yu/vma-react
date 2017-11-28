import * as React from 'react';
import Dialog from '../../components/Dialog';
import { FileUpLoad } from '../../components/FileUpLoad';
class Order extends React.Component {
    state = {  };
    render() {
        const files = 
        [
            'http://lorempixel.com/200/200/sports/', 
            'http://lorempixel.com/200/200/sports/', 
            'http://lorempixel.com/200/200/sports/', 
            'http://lorempixel.com/200/200/sports/'
        ];
        return (
            <div>
                <p>order infor</p>
                <Dialog/>
                <FileUpLoad files={files} multiple={true} accept="image/jpg, image/gif, image/png" />
            </div>
        );
    }
}

export default Order;