import axios from 'axios';
import { URL_SERVICE } from 'config.js';

let response = {
    responseCode : 999,
    responseDesc : "",
    responseData : null,
};

export const GetAllUsers = async (token,paging) => {
    const params = new URLSearchParams();
    params.append('page',paging);

    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
    };
    const result = await axios.post( `${URL_SERVICE}users/alluserspage`, params, header)
    .then(res => {
        if(res) {
            if(res.data) {
                if(res.data.statusCode != undefined && res.data.statusCode != null) {
                    // console.log(res.data.data);
                    response = {
                        responseCode : res.data.statusCode,
                        responseDesc : res.data.message,
                        responseData : res.data.data,
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

export const FindUsers = async (token,paging,filter) => {
    const params = new URLSearchParams();
    params.append('page',paging);
    params.append('search',filter);

    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
    };
    const result = await axios.post( `${URL_SERVICE}users/finduserspage`, params, header)
    .then(res => {
        if(res) {
            if(res.data) {
                console.log(res.data);
                if(res.data.statusCode != undefined && res.data.statusCode != null) {
                    // console.log(res.data.data);
                    response = {
                        responseCode : res.data.statusCode,
                        responseDesc : res.data.message,
                        responseData : res.data.data,
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

export const GetAllArea = async (token) => {
    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
    };
    const result = await axios.post( `${URL_SERVICE}area/allarea`, { }, header)
    .then(res => {
        if(res) {
            if(res.data) {
                if(res.data.statusCode) {
                    // console.log(res.data.data);
                    response = {
                        responseCode : res.data.statusCode,
                        responseDesc : res.data.message,
                        responseData : res.data.data,
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

export const ManageUser = async (token,user,name,firstname,lastname,role,idarea,idsubarea,active) => {
    const params = new URLSearchParams();
    params.append('id_user',user);
    params.append('user',name);
    params.append('role',role);
    params.append('firstname',firstname);
    params.append('lastname',lastname);
    params.append('area',idarea);
    params.append('subarea',idsubarea);
    params.append('active',active);
    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
    };
    const result = await axios.post( `${URL_SERVICE}users/manageuser`,params, header)
    .then(res => {
        console.log('result',res.data);
        if(res) {
            if(res.data) {
                if(res.data.statusCode != undefined && res.data.statusCode != null) {
                    // console.log(res.data.data);
                    response = {
                        responseCode : res.data.statusCode,
                        responseDesc : res.data.message,
                        responseData : res.data.data,
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