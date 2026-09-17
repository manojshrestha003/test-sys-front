import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes"
import LoginPage from "../../modules/auth/pages/LoginPage";
import { RegisterForm } from "@/modules/auth/pages/RegisterPage";
import { VerifyOTP } from "@/modules/auth/pages/VerifyOtp";
import { DashboardPage } from "@/modules/Admin/Dashboard/Pages";
import UserManagementPage from "@/modules/Admin/UserManagement/Pages";
import SettingsPage from "@/modules/Admin/Settings/pages";
import QuestionManagement from "@/modules/Admin/QuestionManagement/pages";
import CategoryPage from "@/modules/Admin/CategoryManagement/pages";

const AppRouter = () =>{
    return (
    <BrowserRouter>
    <Routes>
        <Route path= {routes.LOGIN} element = {<LoginPage/>}/>
        <Route path={routes.REGISTER} element = {<RegisterForm/>}/>
        <Route path= {routes.VERIFY_OTP} element = {<VerifyOTP/>}/>
        <Route path={routes.DASHBOARD} element ={<DashboardPage/>}/>
        <Route path = {routes.USER_MANAGEMENT} element = {<UserManagementPage/>}/>
        <Route path={routes.SETTINGS} element ={<SettingsPage/>}/>
        <Route path={routes.CATEGORY_MANAGEMENT}  element = {<CategoryPage/>}/>
        <Route path={routes.QUESTION_MANAGEMENT} element ={<QuestionManagement/>}/>
    </Routes>
    </BrowserRouter>
    )

}

export default AppRouter;