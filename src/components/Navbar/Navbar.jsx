import React from 'react';
import NavbarStyles from './Navbar.module.css';
import Hamburger from 'hamburger-react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

function Navbar() {
    const [user, setUser] = useState(null);
    const fetchData = async () => {
        try {
            const response = await fetch('https://localhost:7192/pingauth', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
                });
          if(response.ok){
            const data = await response.json();
            setUser(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(() => {
      fetchData();
    }, []);

    const logout = async () => {
        try{
            await fetch("https://localhost:7192/logout", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
        } catch(error) {
            console.log(error);
        } finally {
            window.location.href = '/';
        }
    }

    const [isActive, setIsActive] = useState(false);
    const [isOpen, setOpen] = useState(false)

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={`${NavbarStyles.navbar} ${isActive ? NavbarStyles.active : ''}`}>
            <img height="100px" className={NavbarStyles.logoNav} src={logo}/>
            <nav>
                
                <ul className={NavbarStyles.desktopNav}>
                    <div>
                        <li><Link to='/'>Projects</Link></li>
                        <li><Link to='/CreateProject'>Create Project</Link></li>
                    </div>
                    {user ? (
                        <div>
                            <li><Link onClick={logout}>Logout</Link></li>
                        </div>
                    ) : (
                        <div>
                            <li><Link to='/Login'>Login</Link></li>
                            <li><Link to='/Register'>Register</Link></li>
                        </div>
                    )}
                </ul>
                <ul className={NavbarStyles.mobNav}>
                    <li><Link to='/'>Projects</Link></li>
                    <li><Link to='/CreateProject'>Create Project</Link></li>
                    {user ? (
                        <div>
                            <li><Link onClick={logout}>Logout</Link></li>
                        </div>
                    ) : (
                        <div>
                            <li><Link to='/Login'>Login</Link></li>
                            <li><Link to='/Register'>Register</Link></li>
                        </div>
                    )}

                </ul>
            </nav>
            <div className={NavbarStyles.mobileBtn} onClick={handleClick}>
                <Hamburger toggled={isOpen} toggle={setOpen} />
            </div>

        </div>
    )
}

export default Navbar
