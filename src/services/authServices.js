import * as request from '../utils/httpRequests';

export const validate = () => request.get('validate', { withCredentials: true });

export const login = (data) => request.post('login', data, { withCredentials: true });
