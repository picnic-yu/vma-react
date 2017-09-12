// import 'fetch';
import 'whatwg-fetch';

export interface RemoteResult {
    code: number;
    codeMsg: string;
    data: {
        name: string;
        icon?: string;
        token: string;
    };
}

export async function login(userName: string, password: string): Promise<RemoteResult> {
    // let response = await fetch('http://localhost:8080/login.json', {mode: 'cors',
    let response = await fetch('/login.json', {mode: 'cors',
    // method: 'POST',
    // headers: {
    //     'Cotent-Type': 'application/json'
    // },
    // body: JSON.stringify({
    //     userName: userName,
    //     password: password
    // })
    });
    // let response = await fetch('/login.json');
    let data = response.json();
    return data;        

    // fetch('http://localhost:3000/login.json').then(function (response) {
    //         return response.json();
    //     }).then(function(data) {
    //             console.log(data);
    //     }).catch(function(ex) {
    //         console.log(ex);
    //     });
}
