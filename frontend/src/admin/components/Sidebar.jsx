import React from 'react'
import classNames from 'classnames';
import { FcReading } from "react-icons/fc";
import { DASHBOARD_SIDEBAR_LINKS } from '../lib/navigation';
import { Link, useLocation } from 'react-router-dom';

const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcReading fontSize={24} />
        <span className="text-neutral-100 text-lg">HS BookStore</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
          
        ))}
      </div>
      <div>bottom part</div>
    </div>
  )
}

function SidebarLink({item}) {

  const {pathname} = useLocation()

  return (
    <Link to={item.path} className={classNames(pathname === item.path ? 'bg-neutral-700 text-white':'text-neutral-400', linkClasses)}>
      <span className='text-xl'>{item.icon}</span>
      {item.label}
    </Link>
  )
}
