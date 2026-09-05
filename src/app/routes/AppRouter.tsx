import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes"
import LoginPage from "../../modules/auth/pages/LoginPage";
import { RegisterForm } from "@/modules/auth/pages/RegisterPage";
import { VerifyOTP } from "@/modules/auth/pages/VerifyOtp";
import { DashboardPage } from "@/modules/Admin/Dashboard/Pages";

const AppRouter = () =>{
    return (
    <BrowserRouter>
    <Routes>
        <Route path= {routes.LOGIN} element = {<LoginPage/>}/>
        <Route path={routes.REGISTER} element = {<RegisterForm/>}/>
        <Route path= {routes.VERIFY_OTP} element = {<VerifyOTP/>}/>
        <Route path={routes.DASHBOARD} element ={<DashboardPage/>}/>
    </Routes>
    </BrowserRouter>
    )

}

export default AppRouter;