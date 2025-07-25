import React, {useState} from "react";
import Link from "next/link";


export const Navigation = () => {

    const [isMenuActive, setIsMenuActive] = useState<boolean>(false)

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive)
    }

    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item">
                    <strong>
                        Cart
                    </strong>
                </a>

                <a
                    role="button"
                    className={`navbar-burger ${isMenuActive ? 'is-active' : ''}`}
                    aria-label="menu"
                    aria-expanded="false"
                    onClick={toggleMenu}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className={`navbar-menu ${isMenuActive ? 'is-active' : ''}`}>
                <div className="navbar-start">
                    <Link href="/CartView" className="navbar-item">
                        CartView
                    </Link>,<Link href="/ProductView" className="navbar-item">
                    ProductView
                </Link>
                </div>
            </div>
        </nav>
    )
}