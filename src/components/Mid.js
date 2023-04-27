import { Route, Routes } from "react-router-dom"
import MyTables from "./business/MyTables"
import TableAdd from "./business/TableAdd"
import Dashboard from "./Dashboard"
import Login from "./Login"
import Logout from "./Logout"
import Register from "./Register"
import UpdateTable from "./business/UpdateTable"
import Profile from "./Profile"
import AddItem from "./business/AddItem"
import ShowItem from "./business/ShowItem"
import AddCategory from "./business/AddCategory"
import UpdateItem from "./business/UpdateItem"
import ShowBooking from "./business/ShowBooking"
import BulkTableAdd from "./business/BulkTableAdd"
import CategoryList from "./admin/CategoryList"
import CategoryUpdate from "./admin/CategoryUpdate"
import AdminCatAdd from "./admin/AdminCatAdd"
import Restaurant from "./customer/Restaurant"
import AvailableTables from "./customer/AvailableTables"
import BookTable from "./customer/BookTable"
import MyBooking from "./customer/MyBooking"
import UpdateBooking from "./customer/UpdateBooking"
import PrivateRoute, { AdmminRoute, AuthenticatedRoute, BusinessRoute, CustomerRoute } from './ProtectedRoute'
import RestroProfile from "./customer/RestroProfile"
import Home from "./Home"

const Mid = () => {
    return (
        <div className="">
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" 
                element={
                    <AuthenticatedRoute>
                        <Login/>
                    </AuthenticatedRoute>
                } />
                <Route path="/register"
                element={
                    <AuthenticatedRoute>
                        <Register/>
                    </AuthenticatedRoute>
                } />
                <Route path="/home" 
                element={
                    <PrivateRoute>
                        <Dashboard/>
                    </PrivateRoute>
                } />
                <Route path="/profile" 
                element={
                    <PrivateRoute>
                        <Profile/>
                    </PrivateRoute>
                } />
                {/* Business routes */}
                <Route path="/table-add" 
                element={
                    <BusinessRoute> 
                        <TableAdd/>
                    </BusinessRoute> 
                } />
                <Route path="/bulk-table-add" 
                element={
                    <BusinessRoute> 
                        <BulkTableAdd/>
                    </BusinessRoute> 
                } />
                <Route path="/my-tables" 
                element={
                    <BusinessRoute> 
                        <MyTables/>
                    </BusinessRoute>
                } />
                <Route path="/add-item" 
                element={
                    <BusinessRoute> 
                        <AddItem/>
                    </BusinessRoute>
                } />
                <Route path="/my-items" 
                element={
                    <BusinessRoute> 
                        <ShowItem/>
                    </BusinessRoute>
                } />
                <Route path="/my-items/update/:iid" 
                element={
                    <BusinessRoute> 
                        <UpdateItem/>
                    </BusinessRoute>
                } />
                <Route path="/show-bookings" 
                element={
                    <BusinessRoute> 
                        <ShowBooking/>
                    </BusinessRoute>
                } />
                <Route path="/add-category" 
                element={
                    <BusinessRoute> 
                        <AddCategory/>
                    </BusinessRoute>
                } />
                <Route path="/my-tables/update/:tid" 
                element={
                    <BusinessRoute> 
                        <UpdateTable/>
                    </BusinessRoute>
                } />
                {/* Admin Routes */}
                <Route path="/category-list" 
                element={
                    <AdmminRoute> 
                        <CategoryList/>
                    </AdmminRoute>
                } />
                <Route path="/admin/add-category" 
                element={
                    <AdmminRoute> 
                        <AdminCatAdd/>
                    </AdmminRoute>
                } />
                <Route path="/admin/update-category/:cid" 
                element={
                    <AdmminRoute> 
                        <CategoryUpdate/>
                    </AdmminRoute>
                } />
                {/* Customer Route */}
                <Route path="/all-restaurants" 
                element={
                    <CustomerRoute> 
                        <Restaurant/>
                    </CustomerRoute>
                
                } />
                <Route path="/:rid/available-tables" 
                element={
                    <CustomerRoute> 
                        <AvailableTables/>
                    </CustomerRoute>
                } />
                <Route path="/table/:tid/book" 
                element={
                    <CustomerRoute> 
                        <BookTable/>
                    </CustomerRoute>
                } />
                <Route path="/my-bookings" 
                element={
                    <CustomerRoute> 
                        <MyBooking/>
                    </CustomerRoute>
                } />
                <Route path="/booking/:bid/update" 
                element={
                    <CustomerRoute> 
                        <UpdateBooking/>
                    </CustomerRoute>
                } />
                <Route path="/restaurant/:rid" 
                element={
                    <CustomerRoute> 
                        <RestroProfile/>
                    </CustomerRoute>
                } />
                <Route path="/logout" element={<Logout/>} />
            </Routes>
        </div>
    )
}
export default Mid