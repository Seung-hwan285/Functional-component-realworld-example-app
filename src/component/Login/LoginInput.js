import {request} from "../../utils/request.js";
import {route} from "../../utils/routes.js";
import {getLocalStroage} from "../../utils/storage.js";

function LoginFormInput(LoginFormBox){


    const handleUserSubmit= ()=>{
        const form = document.querySelector('.form');

        form.addEventListener('submit',async(e)=>{
            e.preventDefault();
            const email = document.querySelector('.email').value;
            const password = document.querySelector('.password').value;

            const token = await request.userLogin(email,password);
            getLocalStroage('token',token);
            if(token){
                route("/");
            }
        })
    }

    const render=()=>{
        LoginFormBox.innerHTML=`
            <form class="form">
                   <div class="sign-in-box">
                <input  class="email" type="text" placeholder="Email">
                <input class="password" type="text" placeholder="Password">                       
                </div>
                
                <button class="form-button" type="submit">Sign in</button>
            </form>
        `
        handleUserSubmit();
    }
    render();
}
export default LoginFormInput;