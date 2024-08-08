import React from 'react'
import Container from '../container/Container.jsx'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn.jsx'

function Header() {
 const authStatus = useSelector((state) => state.auth.status)

 const navigate = useNavigate()

 const navItems = [
    {
        name:"Home",
        slug:"/",
        active:true
    },
    {
        name:"Logout",
        slug:"/logout",
        active: !authStatus
    }, 
      {
        name:"Signup",
        slug:"/signup",
        active: !authStatus
    },
    {
        name:"All-Post",
        slug:"/all-post",
        active: authStatus
    },
    {
        name:"Add-Post",
        slug:"/add-post",
        active: authStatus
    }
 ]




  return (
   <header className='py-3 shadow bg-gray-300'>
    <Container >
        <nav className='flex' >
            <div className='mr-4'>
                <Link to='/'>
                <Logo/>
                </Link>
            </div>
            <ul className=' flex ml-auto'>
                {navItems.map((item) => item.active ?  (
                    <li className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                    key={item.name}>
                        <button onClick={() => navigate(item.slug) }>{item.name}</button>
                    </li>
                ): null )}
            </ul>
            {
                authStatus && (
                    <li><LogoutBtn/></li>
                )

            }
        </nav>
    </Container>
   </header>
  )
}

export default Header