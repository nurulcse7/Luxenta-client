import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
};

export default UserLayout;
