import {cleanHTML} from "../utils/helper/cleanHTML.js";

function RegisterPage(target){

    const RegisterContainer = document.createElement('div');
    RegisterContainer.className='Register__Container';

    const container = document.querySelector('.Register__Container');

    if(container){
        return;
    }


    const RegisterWrapper = document.createElement('div');
    RegisterWrapper.className='Register__Wrapper';

    const RegisterFormBox = document.createElement('div');
    RegisterFormBox.className='Register__Box';

    RegisterContainer.appendChild(RegisterWrapper);
    RegisterContainer.appendChild(RegisterFormBox);

    target.appendChild(RegisterContainer);


    const render=()=>{
        cleanHTML.RegisterPage();

    }
    render();
}
export default RegisterPage;