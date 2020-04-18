import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth'
import profile from './profile'
import chart from './chart'
import viewers from './viewers'


export default combineReducers({
    alert,
    auth,
    profile,
    chart,
    viewers
});