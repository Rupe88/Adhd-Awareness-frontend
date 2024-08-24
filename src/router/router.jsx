import React from "react";
import { createBrowserRouter } from "react-router-dom";
const Home = React.lazy(() => import("../pages/home/Home"));
const About = React.lazy(() => import("../pages/about/About"));
const PrivacyPolicy = React.lazy(() => import("../pages/privacy-policy/PrivacyPolicy"));
const SingleBlog = React.lazy(() => import("../pages/blogs/singleBlog/SingleBlog"));
const Login = React.lazy(() => import("../pages/auth/login/Login"));
const Register = React.lazy(() => import("../pages/auth/login/Register"));
const AdminLayout = React.lazy(() => import("../pages/admin/AdminLayout"));
const Dashboard = React.lazy(() => import("../pages/admin/dashboard/Dashboard"));
const AddPost = React.lazy(() => import("../pages/admin/post/AddPost"));
const ManagePost = React.lazy(() => import("../pages/admin/post/ManagePost"));
const ManageUser = React.lazy(() => import("../pages/admin/user/ManageUser"));
const UpdatePost = React.lazy(() => import("../pages/admin/post/UpdatePost"));
const Books = React.lazy(() => import("../pages/contact-us/Books"));
const App = React.lazy(() => import("../App"));
const PrivateRouter=React.lazy(()=>import("../router/PrivateRouter"))
const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },

            {
                path:"/about-us",
                element:<About/>
            },
            {
                path:"/privacy-policy",
                element:<PrivacyPolicy/>
            },
            {
                path:"/books",
                element:<Books/>
            },
            {
                path:"/blog/:id",
                element:<SingleBlog/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/register",
                element:<Register/>
            },


            {
                path:"dashboard",
                element:<PrivateRouter><AdminLayout/></PrivateRouter>, // it will be protected by the admin: Use Private Routes
                children:[
                 {
                    path:"",
                    element:<Dashboard/>
                 },
                 {
                    path:"add-new-post",
                    element:<AddPost/>
                 },
                 {
                    path:"manage-items",
                    element:<ManagePost/>
                 },
                 {
                    path:"users",
                    element:<ManageUser/>
                 },
                 {
                    path:"update-items/:id",
                    element:<UpdatePost/>
                 }
                ]
            },
        ]
    }
])

export default router;