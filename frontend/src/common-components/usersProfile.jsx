import React,{useState , useEffect} from 'react';
import { useLocation } from 'react-router-dom';


const BACKEND_URL = 'https://ridegreen.onrender.com';

const UserProfile = () => {
    const [user , setUser] = useState([]);
    const loc = useLocation();
    const {email} = loc.state || {};


    useEffect(()=>{
        const fetchUser = async () => {
        try{
            const url = new URL(`${BACKEND_URL}/api/user-data`);
            url.searchParams.append("email", email);
            const response = await fetch(url);

            if(response.ok){
                const data = await response.json();
                // console.log(data);
                setUser(data);
            }
            else{
                console.log('error receiving the message');
            }
        }
        catch(err){
            console.error(err);
        }
     };
     fetchUser();
    },[])

    if(user.length > 0){

        return (
            <div className='flex justify-center '>
          <div className="bg-white overflow-hidden shadow rounded-lg border min-width-96 m-9 w-6/12 ">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-green-900">
                User Profile
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-green-700">Full name</dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    {user[0].name}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-green-700">Email address</dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                      {user[0].email}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-green-700">Phone number</dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    {user[0].phone}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-green-700">Gender</dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    {user[0].gender}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-green-700">Age</dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    {user[0].age}
                  </dd>
                </div>
                
              </dl>
            </div>
          </div>
          </div>
        );
    }
    else{
        return(<h1>no user</h1>);
    }
};

export default UserProfile;
