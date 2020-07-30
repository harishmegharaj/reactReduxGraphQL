// Simple API wrapper
import axios from 'axios';
const API_URL = 'http://localhost:8080';

function makeApiCall(url, methodType, postData) {
    const promise = new Promise((resolve, reject) => {
        if (methodType === 'GET') {
            axios.get(url, {
                headers: {
                    'content-type': 'application/json'
                },
                // By default it is empty
            }).then(function (response) {
                resolve(response.data);
            })
                .catch(function (error) {
                    reject(error);
                });
        }
        if (methodType === 'POST') {
            let postJsonData = postData;
            axios.post(url,
                postJsonData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                },
            ).then(function (response) {
                console.log('SUCCESS!!');
                if (response.status == 200) {
                    resolve(response.data);
                }
            }).catch(function (error) {
                console.log('FAILURE!!6');
                reject(error);
            });
        }
        if (methodType === 'PUT') {
            let postJsonData = postData;
            axios.put(url,
                postJsonData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                },
            ).then(function (response) {
                console.log('SUCCESS!!');
                if (response.status == 200) {
                    resolve(response.data);
                }
            }).catch(function (error) {
                console.log('FAILURE!!6');
                reject(error);
            });
        }
        if (methodType === 'DELETE') {
            axios.delete(url, 
                {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: postData
                // data: { id: ['5f21a3e19892bc0abc5956c1', '5f21a4f681f8b143841cff70']},
            }).then(function (response) {
                if (response.status == 200) {
                    resolve(response.data);
                }
            }).catch(function (error) {
                reject(error);
            })
        }
    });
    return promise;
}

function getFetchData() {
    return makeApiCall(`http://localhost:8080/api/desserts`, `GET`);
}

function postCreateNut(postBody) {
    return makeApiCall(`http://localhost:8080/api/desserts`, `POST`, postBody);
}

function deleteCreateNut(deleteData) {
    return makeApiCall(`http://localhost:8080/api/desserts`, `DELETE`, deleteData);
}

export default {
    getFetchData,
    postCreateNut,
    deleteCreateNut
};
