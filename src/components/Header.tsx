'use client';

import Link from 'next/link';
import { NAV_LINKS } from '@/constants/nav_links';
import { SITE_TITLE } from '@/lib/seo';

export function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold">
          {SITE_TITLE}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {NAV_LINKS.map((entry) => (
              <li className="nav-item" key={entry.url}>
                <Link className="nav-link" href={entry.url}>
                  {entry.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
