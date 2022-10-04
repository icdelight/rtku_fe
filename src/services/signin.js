
import axios from 'axios';
import { setCurrentUser } from 'auth/authSlice';
import { URL_SERVICE } from 'config.js';

let response = {
    responseCode : 999,
    responseDesc : "",
    responseData : null,
};
// const header = {
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//     }
// };

export const Signin = async (email,password,dispatch) => {
    const result = await axios.post( `${URL_SERVICE}auth/signin`, { user: email, pass: password })
    .then(res => {
        if(res) {
            if(res.data) {
                if(res.data.userData) {
                    if(res.data.userData.id && res.data.userData.fullname && res.data.userData.role && res.data.userData.name && res.data.tokens.access_token) {
                        const user = {
                            id: res.data.userData.id,
                            name: res.data.userData.fullname,
                            thumb: '/img/profile/profile-12.gif',
                            role: res.data.userData.role,
                            email: res.data.userData.name,
                            token: res.data.tokens.access_token,
                            id_area: res.data.userData.id_area,
                            id_sub_area: res.data.userData.id_sub_area,
                            desc_area: res.data.userData.desc_area,
                            desc_sub_area: res.data.userData.desc_sub_area,
                        };
                        dispatch(setCurrentUser(user));
                        // authReducer.bind();
                        response = {
                            responseCode : res.data.statusCode,
                            responseDesc : res.data.message,
                            responseData : user,
                        };
                    }else{
                        response = {
                            responseCode : 999,
                            responseDesc : 'Invalid response. 1',
                            responseData : null,
                        };
                    }
                }else{
                    response = {
                        responseCode : 999,
                        responseDesc : 'Invalid response. 2',
                        responseData : null,
                    };
                }
            }else{
                response = {
                    responseCode : 999,
                    responseDesc : 'Invalid response. 3',
                    responseData : null,
                };
            }
        }else{
            response = {
                responseCode : 999,
                responseDesc : 'Failled to parse response.',
                responseData : null,
            };
        }
        return response;
    })
    .catch( function(error) {
        if (error.response) {
            // Request made and server responded
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            response = {
                responseCode : error.response.status,
                responseDesc : error.response.data.message,
                responseData : null,
            };
        } else if (error.request) {
            // The request was made but no response was received
            // console.log(error.request);
            response = {
                responseCode : 999,
                responseDesc : error.request,
                responseData : null,
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
            response = {
                responseCode : 999,
                responseDesc : `Something went wrong, ${error.message}`,
                responseData : null,
            };
        }  
        return response; 
    });
    return result;
}

export const Signup = async (username,email,password,dispatch) => {
    const result = await axios.post( `${URL_SERVICE}auth/signup`, { user: email, pass: password, firstname: username, role: '2' })
    .then(res => {
        if(res) {
            if(res.data) {
                if(res.data.statusCode) {
                    response = {
                        responseCode : res.data.statusCode,
                        responseDesc : res.data.message,
                        responseData : null,
                    };
                }else{
                    response = {
                        responseCode : 999,
                        responseDesc : 'Invalid response. 2',
                        responseData : null,
                    };
                }
            }else{
                response = {
                    responseCode : 999,
                    responseDesc : 'Invalid response. 3',
                    responseData : null,
                };
            }
        }else{
            response = {
                responseCode : 999,
                responseDesc : 'Failled to parse response.',
                responseData : null,
            };
        }
        return response;
    })
    .catch( function(error) {
        if (error.response) {
            // Request made and server responded
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            response = {
                responseCode : error.response.status,
                responseDesc : error.response.data.message,
                responseData : null,
            };
        } else if (error.request) {
            // The request was made but no response was received
            // console.log(error.request);
            response = {
                responseCode : 999,
                responseDesc : error.request,
                responseData : null,
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
            response = {
                responseCode : 999,
                responseDesc : `Something went wrong, ${error.message}`,
                responseData : null,
            };
        }  
        return response; 
    });
    return result;
}