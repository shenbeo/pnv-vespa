import React, { lazy,Suspense } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


const Dashboard = React.lazy(() => import("../admin/Dashboard"));
const Home = React.lazy(() => import("../admin/dashboard_List/Home"));
const Home_Page = React.lazy(() => import("../pages/Home_Page"));


const Login_client = React.lazy(() => import("../pages/Login_client"));
const Edit_User = React.lazy(() => import("../client/Edit_User"));
const Add_User = React.lazy(() => import("../client/Add_User"));


const List_User = React.lazy(() => import("../admin/dashboard_List/List_User"));
const List_Products = React.lazy(() => import("../admin/dashboard_List/List_Products"));
const Add_Products = React.lazy(() => import("../admin/dashboard_List/Add_Products"));


const Edit_Products = React.lazy(() => import("../admin/dashboard_List/Edit_Products"));
const Start = React.lazy(() => import("../pages/Start"));
const Products = React.lazy(() => import("../pages/Products"));


const Login_admin = React.lazy(() => import("../pages/Login_admin"));
// const Loader = React.lazy(() => import("../components/Loading/Loader"));



export default function Router ()  {
  return (
    <div >
      <BrowserRouter>
          <Suspense>
            <Routes>
                  <Route path="/ad" element={<Dashboard/>}>
                        <Route path="" element={<Home/>}/>
                        <Route path="/ad/listUser" element={<List_User/>}/>
                        <Route path="/ad/Edit_User/:id" element={<Edit_User/>}/>
                        <Route path="/ad/Edit_Products/:id" element={<Edit_Products/>}/>
                        <Route path='/ad/listProducts' element={<List_Products/>}/>
                        <Route path='/ad/addProducts' element={<Add_Products/>}/>
                  </Route>
  
                  <Route path='/loginadmin' element={<Login_admin/>}/>
                  <Route path='/' element={<Start/>}/>
                  <Route path='/loginclient' element={<Login_client/>}/>
                  <Route path='/products/:id' element={<Products/>}/>
                  <Route path="/addUser" element={<Add_User/>}/>


                  <Route path='/homePage/:id' element={<Home_Page/>}/>

  
            </Routes>
          </Suspense>
        </BrowserRouter>

    </div>
  )
}


