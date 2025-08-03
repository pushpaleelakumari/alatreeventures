import { Outlet } from 'react-router-dom'
import Header from './Header'

const AdminLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Sticky Header */}
            <header className="sticky top-0 z-50">
                <Header />
            </header>

            {/* Content Area - will automatically start below header */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout