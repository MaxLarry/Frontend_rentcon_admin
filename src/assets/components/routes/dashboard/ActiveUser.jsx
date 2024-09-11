import React from 'react';

function ActiveUser()  {
  return (
    <div className="bg-white border border-gray-200 px-10 py-5 rounded-md shadow-md block items-center col-start-1 md:col-end-3 lg:col-end-4">
      <div className="text-2xl font-bold text-zinc-900">120</div>
      <span className='text-xl font-medium text-gray-500'>Active User</span>
        <div className="flex justify-between mt-4">
          <div className='block'>
          <div className="text-2xl font-bold text-zinc-900">90</div>
            <span className="text-lg font-medium text-gray-500">Landlords</span>
            </div>
            <div className='block'>
            <div className="text-2xl font-bold text-zinc-900">12</div>
            <span className="text-lg font-medium text-gray-500">Occupants</span>
            </div>
            <div className='block'>
            <div className="text-2xl font-bold text-zinc-900">18</div>
            <span className="text-lg font-medium text-gray-500">Unverified</span>
            </div>
      </div>
    </div>
  );
};

export default ActiveUser;
