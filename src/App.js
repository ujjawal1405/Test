
import PrivateRoutes from './privateRoute/PrivateRoutes';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <> 
        <Toaster />
        <PrivateRoutes />   
    </>
  );
}

export default App;