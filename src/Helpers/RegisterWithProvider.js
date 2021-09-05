import Register from "../components/Register/Register";
import { RegisterProvider } from "../Contexts/RegisterContext";

const RegisterWithProvider = () => {
    return ( 
        <RegisterProvider>
            <Register />
        </RegisterProvider>
     );
}
 
export default RegisterWithProvider;