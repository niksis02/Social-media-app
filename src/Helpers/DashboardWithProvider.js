import Dashboard from "../components/Dashboard/Dashboard";
import { DashboardProvider } from "../Contexts/DashboardContext";

const DashboardWithProvider = () => {
    return ( 
        <DashboardProvider>
            <Dashboard />
        </DashboardProvider>
     );
}
 
export default DashboardWithProvider;