import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { Search, Home, Users, CalendarCheck, Moon, MessageCircleQuestion, ClipboardCheck, Utensils, Layers, Bell, User, ChevronRight, Menu, X, ChevronDown, Sun, TableProperties } from 'lucide-react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Outlet } from 'react-router-dom';
import DummyContentPage from './DummyContentPage';
import paLogo from './assets/layout/Cherry.png';
import useClickOutside from './hooks/useClickOutside';
import findMenuByPath from './functions/locationFunctions';
import { getMenuList, ICON_MAP, MENU } from './Sidemenu';
import Reservation from './Hotel/Reservation/Reservation';
import LogoLoaderComponent from './Authentication/Pages/LogoLoaderComponent';
import GuestEnquiry from './Hotel/Guest Enquiry/GuestEnquiry';
import FloorLayout from './Restaurant/Floor & Table Setup/FloorLayout';
import TableMaster from './Restaurant/Floor & Table Setup/TableMaster';
import Employee from './Hotel/HRM/Employee';
import AddNewReservation from './Hotel/Reservation/AddNewReservation';
import Booking from './Hotel/Reservation/Booking';
import RoomView from './Hotel/Reservation/RoomView';
import ReservationView from './Hotel/Reservation/ReservationView';
import UserReserved from './Hotel/Night Audit/UserReserved';
import RoomBooked from './Hotel/Night Audit/RoomBooked';
import SettlementSummary from './Hotel/Night Audit/SettlementSummary';
import TaskAssign from './Hotel/House Keeper/TaskAssign';
import RoomIncidentLog from './Hotel/House Keeper/RoomIncidentLog';
import Orders from './Restaurant/Order Management/Orders';
import TableReservation from './Restaurant/Table Reservation/TableReservation';
import MenuManagement from './Restaurant/Menu Management/MenuManagement';
import MainKitchen from './Restaurant/Kitchen Orders/MainKitchen';
import Grill from './Restaurant/Kitchen Orders/Grill';
import Dessert from './Restaurant/Kitchen Orders/Dessert';
import Bar from './Restaurant/Kitchen Orders/Bar';
import BillingPayments from './Restaurant/Billing & Payments/BillingPayments';
import Stock from './Restaurant/Inventory/Stock';
import ReceipeManagement from './Restaurant/Inventory/ReceipeManagement';
import StaffMaster from './Restaurant/Staff Management/StaffMaster';
import StaffPlanning from './Restaurant/Staff Management/StaffPlanning';
import GuestManagement from './Restaurant/Guest Management/GuestManagement';
import ReportAnalytics from './Restaurant/Report & Analytics/ReportAnalytics';


const AdminDashboard = lazy(() => import('./Hotel/Dashboard/AdminDashboard'));
const ForgotPassword = lazy(() => import('./Authentication/Pages/ForgotPassword'));
const LockScreen = lazy(() => import('./Authentication/Pages/LockScreen'));
const Login = lazy(() => import('./Authentication/Pages/Login'));
const OTP = lazy(() => import('./Authentication/Pages/OTP'));
const Register = lazy(() => import('./Authentication/Pages/Register'));

const Facilities = lazy(() => import('./MasterData/Facilities'));
const RoomType = lazy(() => import('./MasterData/RoomType'));
const BedType = lazy(() => import('./MasterData/BedType'));
const HallFloor = lazy(() => import('./MasterData/HallFloor'));
const Rooms = lazy(() => import('./MasterData/Rooms'));
const DiscountType = lazy(() => import('./MasterData/DiscountType'));
const TaxTypes = lazy(() => import('./MasterData/TaxTypes'));
const PaymentMethods = lazy(() => import('./MasterData/PaymentMethods'));
const IdentificationProof = lazy(() => import('./MasterData/IdentificationProof'));
const CurrencyCountry = lazy(() => import('./MasterData/CurrencyCountry'));
const HskTaskType = lazy(() => import('./MasterData/HskTaskType'));
const Complementary = lazy(() => import('./MasterData/Complementary'));
const ReservationStatus = lazy(() => import('./MasterData/ReservationStatus'));


const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <div className="logo-container">
          <img src={paLogo} alt="Cherry" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        {/* SEARCH (near notification) */}
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search anything"
          />
        </div>

        {/* NOTIFICATION */}
        <button className="icon-button" title="Notifications">
          <Bell size={18} />
          <span className="notify-dot"></span>
        </button>

        {/* PROFILE */}
        <div className="profile-box">
          <img
            src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=80"
            alt="user"
            className="profile-avatar"
          />
          <div className="profile-info">
            <span className="profile-name">Johan Abraham</span>
            <span className="profile-role">Senior Staff</span>
          </div>
          <ChevronDown size={16} />
        </div>

        {/* MOBILE MENU */}
        <button
          className="icon-button mobile-only"
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
        >
          <Menu size={22} />
        </button>
      </div>
    </nav>
  );
};

const RecursiveMenu = ({ items, activePath, setActivePath, level = 0 }) => {
  const navigate = useNavigate();
  return (
    <>
      {items.map((item, index) => {
        const pathKey = [...activePath.slice(0, level), index];
        const isActive =
          JSON.stringify(activePath.slice(0, level + 1)) ===
          JSON.stringify(pathKey);
        const hasChildren = item.children?.length;
        console.log(hasChildren);

        const isExpanded = activePath[level] === index;
        return (
          <div key={index}>
            <div
              className={`sub-item ${isActive ? "active" : ""}`}
              style={{ paddingLeft: `${16 + level * 16}px` }}
              onClick={() => {
                setActivePath(pathKey);
                if (!item.children || item.children.length === 0) {
                  navigate(item.path);
                }
              }}
            >
              {hasChildren && (
                <span className="submenu-arrow">
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
              )}
              {item.label}
            </div>
            {hasChildren && isExpanded && (
              <RecursiveMenu
                items={item.children}
                activePath={activePath}
                setActivePath={setActivePath}
                level={level + 1}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

const AppContext = ({ menuList, activeMenu, setActiveMenu, activePath, setActivePath, children }) => {
  const navigate = useNavigate();
  return (
    <div className="app-body">
      <aside className="side-nav">
        {menuList.map((item) => {
          const Icon = ICON_MAP[item.id];

          const isActive = item.id === activeMenu?.id;
          return (
            <div
              key={item.id}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => {
                
                setActiveMenu(item);
                // setActivePath([0]);
                // if (!item.children)
                if(item.path === undefined) {
                  return navigate(item.children[0].path);
                } 
                  navigate(item.path);
              }}
            >
              {Icon && <Icon size={22} />}
              <span>{item.label}</span>
            </div>
          );
        })}
      </aside>
      <div className="content-area">
        {Array.isArray(activeMenu?.children) &&
          activeMenu.children.length > 0 && (
            <div className="sub-menu">
              <RecursiveMenu
                items={activeMenu.children}
                activePath={activePath}
                setActivePath={setActivePath}
              />
            </div>
          )}
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};


const AppLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuList, setMenuList] = useState(MENU);

  const [activeMenu, setActiveMenu] = useState(null);
  const [activePath, setActivePath] = useState([0]);
  const sidebarOutsideRef = useRef(null);
  const location = useLocation();


  useClickOutside(
    sidebarOutsideRef,
    () => setIsMobileMenuOpen(false),
    isMobileMenuOpen // only active when menu is open
  );
  useEffect(() => {
     getMenuList().then(data => {
    console.log("MENU API RESPONSE:", data);
    setMenuList(data.message? data.message : data);
  });

  }, []);

  useEffect(() => {
    if (!menuList.length) return;

    const result = findMenuByPath(menuList, location.pathname);
    if (result) {
      setActiveMenu(result.activeMenu);
      setActivePath(result.activePath);
    }
  }, [location.pathname, menuList]);




  return (<>
    <Navbar sidebarOutsideRef={sidebarOutsideRef} setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} activeMenu={activeMenu} setActiveMenu={setActiveMenu} activePath={activePath} setActivePath={setActivePath} />
    <AppContext menuList={menuList} isMobileMenuOpen={isMobileMenuOpen} activeMenu={activeMenu} setActiveMenu={setActiveMenu} activePath={activePath} setActivePath={setActivePath}>
      <Outlet />
    </AppContext>
  </>)
}





const App = () => {

  return (
    <div className="app-layout">
      <Router>

        <Suspense fallback={<LogoLoaderComponent />}>

          <Routes>

            <Route path='/authentication/forgotpassword' element={<ForgotPassword />} />
            <Route path='/authentication/lockscreen' element={<LockScreen />} />
            <Route path='/' element={<Login />} />
            <Route path='/authentication/register' element={<Register />} />
            <Route path='/authentication/otp' element={<OTP />} />
            <Route element={<AppLayout />}>
              <Route path='/dashboard' element={<AdminDashboard />} />
              <Route path='/reservation' element={<Reservation />} />
              <Route path='/add_new_reservation' element={<AddNewReservation />} />
              <Route path='/booking' element={<Booking />} />
              <Route path='/room_view' element={<RoomView />} />
              <Route path='/reservation_view' element={<ReservationView/>} />

              <Route path='/user_reserved_details' element={<UserReserved />} />
              <Route path='/room_booked_details' element={<RoomBooked />} />
              <Route path='/settlement_summary' element={<SettlementSummary />} />

              <Route path='/guest_enquiry' element={<GuestEnquiry />} /> 

              {/* // Restaurant Routes */}
              <Route path='/floor_layout' element={<FloorLayout />} />
              <Route path='/table_master' element={<TableMaster />} />

              <Route path='/employee' element={<Employee />} />

              <Route path='/task_assign' element={<TaskAssign />} />
              <Route path='/room_incident_log' element={<RoomIncidentLog />} />

              <Route path='/floor_layout' element={<FloorLayout />} />
              <Route path='/table_master' element={<TableMaster />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/table_reservation' element={<TableReservation />} />
              <Route path='/menus' element={<MenuManagement />} />
              <Route path='/kot/main_kitchen' element={<MainKitchen />} />
              <Route path='/kot/grill' element={<Grill />} />
              <Route path='/kot/dessert' element={<Dessert />} />
              <Route path='/kot/bar' element={<Bar/>} />
              <Route path='/billing_payments' element={<BillingPayments/>} />
              <Route path='/stock' element={<Stock/>} />
              <Route path='/recipe_management' element={<ReceipeManagement />} />
              <Route path='/staff_master' element={<StaffMaster />} />
              <Route path='/staff_planning' element={<StaffPlanning />} />
              <Route path='/guest_management' element={<GuestManagement />} />
              <Route path='/reports_analytics' element={<ReportAnalytics />} />
              {/* // Master Data Routes */}
              <Route path='/facilities' element={<Facilities />} />
              <Route path='/room_type' element={<RoomType />} />
              <Route path='/bed_type' element={<BedType />} />
              <Route path='/hall_floor' element={<HallFloor />} />
              <Route path='/rooms' element={<Rooms />} />
              <Route path='/discount_type' element={<DiscountType />} />
              <Route path='/tax_types' element={<TaxTypes />} />
              <Route path='/payment_methods' element={<PaymentMethods />} />
              <Route path='/identification_proof' element={<IdentificationProof />} />
              <Route path='/currency_country' element={<CurrencyCountry />} />
              <Route path='/hsk_task_type' element={<HskTaskType />} />
              <Route path='/complementary' element={<Complementary />} />
              <Route path='/reservation_status' element={<ReservationStatus />} />
            </Route>
          </Routes>
        </Suspense>   
      </Router>
    </div>
  );
};



export default App;