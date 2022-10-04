import axios from 'axios';
import { URL_SERVICE } from 'config.js';

let response = {
    responseCode : 999,
    responseDesc : "",
    responseData : null,
};

export const GetAllAreas = async (token,paging) => {
    const params = new URLSearchParams();
    params.append('page',paging);
    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
    };
    const result = await axios.post( `${URL_SERVICE}area/allareapage`,params, header)
    .then(res => {
        // console.log('result',res.data);
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

export const GetAllAreasSelection = async (token,id_area,id_sub_area) => {
    const params = new URLSearchParams();
    params.append('id_area',id_area);
    params.append('id_sub_area',id_sub_area);
    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
    };
    const result = await axios.post( `${URL_SERVICE}area/allarea`,params, header)
    .then(res => {
        let resData = [];
        // console.log('result',res.data);
        if(res) {
            if(res.data) {
                if(res.data.statusCode != undefined && res.data.statusCode != null) {
                    // console.log(res.data.data);
                    res.data.data.forEach(element => {
                        const obj = {};
                        if(element.id_sub_area != undefined && element.id_sub_area != null) {
                            obj.value = element.id_sub_area;
                            obj.label =  element.desc_sub_area;
                            resData.push(obj);
                        }
                    });
                    // console.log(resData);
                    response = {
                        responseCode : res.data.statusCode,
                        responseDesc : res.data.message,
                        responseData : resData,
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

export const GetParentAreasSelection = async (token,id_area) => {
    const params = new URLSearchParams();
    params.append('id_area',id_area);
    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
    };
    const result = await axios.post( `${URL_SERVICE}area/allparentarea`,params, header)
    .then(res => {
        let resData = [];
        // console.log('result',res.data);
        if(res) {
            if(res.data) {
                if(res.data.statusCode != undefined && res.data.statusCode != null) {
                    // console.log(res.data.data);
                    res.data.data.forEach(element => {
                        const obj = {};
                        if(element.id_sub_area != undefined && element.id_sub_area != null) {
                            obj.value = element.id_sub_area;
                            obj.label =  element.desc_sub_area;
                            resData.push(obj);
                        }
                    });
                    // console.log(resData);
                    response = {
                        responseCode : res.data.statusCode,
                        responseDesc : res.data.message,
                        responseData : resData,
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

export const FindAreas = async (token,paging,filter) => {
    const params = new URLSearchParams();
    params.append('page',paging);
    params.append('search',filter);
    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
    };
    const result = await axios.post( `${URL_SERVICE}area/findareapage`,params, header)
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

export const EditAreas = async (token,id_area,id_sub_area,desc_sub_area,id_parent_area,active) => {
    const params = new URLSearchParams();
    params.append('id_area',id_area);
    params.append('id_sub_area',id_sub_area);
    params.append('desc_sub_area',desc_sub_area);
    params.append('id_parent_area',id_parent_area);
    params.append('active',active);
    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
    };
    const result = await axios.post( `${URL_SERVICE}area/editarea`,params, header)
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

export const AddAreaService = async (token,id_area,desc_area,desc_sub_area,id_parent_area,active) => {
    const params = new URLSearchParams();
    params.append('id_area',id_area);
    params.append('desc_area',desc_area);
    params.append('desc_sub_area',desc_sub_area);
    params.append('id_parent_area',id_parent_area);
    params.append('active',active);
    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
    };
    const result = await axios.post( `${URL_SERVICE}area/addarea`,params, header)
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

export const AddRegionService = async (token,desc_area,desc_sub_area,active) => {
    const params = new URLSearchParams();
    params.append('desc_area',desc_area);
    params.append('desc_sub_area',desc_sub_area);
    params.append('active',active);
    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
    };
    const result = await axios.post( `${URL_SERVICE}area/addregion`,params, header)
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