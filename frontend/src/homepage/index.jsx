import React,{lazy , Suspense , useState , useEffect} from "react";
import { onAuthStateChanged , signOut} from "firebase/auth";
import { auth } from "../Authentication/firebase";
import {  Link, Routes, Route, useLocation } from "react-router-dom";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, BellIcon,XMarkIcon } from '@heroicons/react/24/outline';

import logo from '../assets/bg/main-logo.png';
import avatar from '../assets/profile/avatar.jpg';

import NotFound from "./notFound";
import RideList from "../passenger/ridesDiaplay";
const Home = lazy(() => import("./Home"));
const Contact = lazy(() => import("./contact"));
const About = lazy(() => import("./about"));
const FAQ = lazy(() => import("./faq"));
const Form = lazy(() => import('../rider/form'))
import Footer from "./footer";
import RideForm from "../passenger/searchRaids";
import Loader from "./loading";
import Confirm from "../passenger/confirm";
import RequestSentDialog from "../passenger/request";
import Publish from "../rider/publish";
import Signup from "../Authentication/signup";
import Login from "../Authentication/login.jsx";
import ForgotPassword from "../Authentication/resetPassword.jsx";
import Profile from "../users/profile.jsx";
import RequestList from "../users/reqList.jsx";
import NotificationList from "../users/notification.jsx";
import RideDetail from "../common-components/rideDetails.jsx";
import FutureRides from "../users/rides.jsx";
import UserProfile from "../common-components/usersProfile.jsx";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: "FAQ's", href: '/faq' }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


const handleSignOut = async () => {
  try {
    await signOut(auth);
    alert("User signed out successfully"); 
  }
  catch (error) {
    alert("Error signing out:", error.message);
  }
}

function NavBar() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setIsLoggedIn(true);
      } else {
        // User is not logged in
        setIsLoggedIn(false);
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);
  if (
    location.pathname !== '/' &&
    location.pathname !== '/about' &&
    location.pathname !== '/contact' &&
    location.pathname !== '/faq'
  )
    return null;

  return (
    <Disclosure as="nav" className="bg-green-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-green-400 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center mr-6">
                  <img
                    alt="Your Company"
                    src={logo}
                    className="h-8 w-auto"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => {
                      const isCurrent = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            isCurrent
                              ? 'bg-green-800 text-white'
                              : 'text-green-200 hover:bg-green-600 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={isCurrent ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="relative ml-auto flex items-center">
                  <Link
                          to="/notifications"
                          className="text-sm text-gray-700 text-green-800"
                  >
                      <button
                      type="button"
                      className="relative rounded-full bg-green-800 p-1 text-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon aria-hidden="true" className="size-6" />
                      </button>
                  </Link>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="rounded-full bg-green-700 p-1 text-green-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-900 ml-5"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="h-8 w-8 rounded-full"
                  />
                </button>
                {isMenuOpen && (
                  <div className="absolute top-7 right-4 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                    {isLoggedIn ? (
                      <>
                        <Link
                          to="/your-rides"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Your rides
                        </Link>
                        <Link
                          to="/ride-requests"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Ride requests
                        </Link>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Your Profile
                        </Link>
                        <button
                          onClick={() => {
                            handleSignOut();
                            setIsMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-green-800"
                        >
                          Sign out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 text-green-800"
                        >
                          Log in
                        </Link>
                        <Link
                          to="/signup"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 text-green-800"
                        >
                          Sign up
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => {
                const isCurrent = location.pathname === item.href;
                return (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={classNames(
                      isCurrent
                        ? 'bg-green-800 text-white'
                        : 'text-green-200 hover:bg-green-600 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                );
              })}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}



export default function NavLink() {
  return (
      <Suspense fallback={<Loader />}>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/take-ride/search" element={<RideList />}/>
          <Route path="/take-ride/search/confirm" element={<Confirm />}/>
          <Route path="/take-ride/search/req" element={<RequestSentDialog />}/>
          <Route path="/*" element={<NotFound />}/>
          <Route path="/take-ride" element={<RideForm />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/offer-ride" element={<Form />}/>
          <Route path="/offer-ride/publish" element={<Publish />}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/ride-requests" element={<RequestList />}/>
          <Route path="/notifications" element={<NotificationList />}/>
          <Route path="/ride/details/:seats/:rid" element={<RideDetail />} />
          <Route path="/your-rides" element={<FutureRides />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      <Footer />
      </Suspense>
  );
}
