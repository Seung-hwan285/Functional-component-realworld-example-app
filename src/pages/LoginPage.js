import LoginFormInput from "../component/Login/LoginInput.js";
import LoginFormTitle from "../component/Login/LoginFormTitle.js";
import Header from "../layout/header.js";
import {route} from "../utils/routes.js";

function LoginPage(target){

    const LoginContainer = document.createElement('div');
    LoginContainer.className="Login__Container";


    const container = document.querySelector('.Login__Container');
    if(container){
        return;
    }

    const LoginWrapper = document.createElement('div');
    LoginWrapper.className="Login__Wrapper";

    const LoginFormBox = document.createElement('div');
    LoginFormBox.className="Login__Box";

    LoginContainer.appendChild(LoginWrapper);
    LoginContainer.appendChild(LoginFormBox);

    target.appendChild(LoginContainer);


    const render=()=>{
        const Banner = document.querySelector('.Banner__Container');

        if(Banner){
            Banner.innerHTML=''
            Banner.remove();
        }

        LoginFormTitle(LoginWrapper);
        LoginFormInput(LoginFormBox);
    }


    render();

}
export default LoginPage;