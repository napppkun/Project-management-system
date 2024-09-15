import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItemsAdmin } from "./nav-items-admin";
import { Link } from "react-router-dom";
const Layout = ({ children }) => (
    <div className="d-flex flex-column min-vh-100">
        <header className="bg-light shadow-sm">
            <div className="container py-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="h3 mb-0">Student Project Repository</h1>
                    <nav>
                        <ul className="nav">
                            {navItemsAdmin.map(({ title, to }) => (
                                <li key={to} className="nav-item">
                                    <Link to={to} className="nav-link">
                                        {title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
        <main className="flex-grow-1">
            <div className="container py-4">
                {children}
            </div>
        </main>
        <footer className="bg-dark text-white py-3">
            <div className="container text-center">
                © 2024 Student Project Repository. All rights reserved.
            </div>
        </footer>
    </div>
);

function Home() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {navItemsAdmin.map(({ to, page }) => (
                        <Route key={to} path={to} element={page} />
                    ))}
                </Routes>
            </Layout>
        </BrowserRouter>        
    );
}

export default Home;