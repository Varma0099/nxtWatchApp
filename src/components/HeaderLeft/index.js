import {Link, useLocation} from 'react-router-dom'
import './index.css'

const HeaderLeft = () => {
  const location = useLocation()
  const {pathname} = location

  const navItems = [
    {
      path: '/',
      icon: '🏠', // Home
      text: 'Home',
    },
    {
      path: '/trending',
      icon: '📈', // Trending
      text: 'Trending',
    },
    {
      path: '/gaming',
      icon: '🎮', // Gaming
      text: 'Gaming',
    },
    {
      path: '/saved-videos',
      icon: '💾', // Saved
      text: 'Saved Videos',
    },
  ]

  const socialLinks = [
    {
      icon: '📘', // Facebook
      url: 'https://facebook.com',
      label: 'Facebook',
    },
    {
      icon: '🐦', // Twitter
      url: 'https://twitter.com',
      label: 'Twitter',
    },
    {
      icon: '💼', // LinkedIn
      url: 'https://linkedin.com',
      label: 'LinkedIn',
    },
  ]

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.text}</span>
          </Link>
        ))}
      </nav>

      <div className="social-links">
        <h3 className="social-title">Contact Us</h3>
        <div className="social-icons">
          {socialLinks.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label={link.label}
            >
              <span>{link.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default HeaderLeft
