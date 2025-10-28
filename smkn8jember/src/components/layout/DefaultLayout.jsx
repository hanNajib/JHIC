import { useEffect } from "react";
import { useWebSettingByTitle, useWebSettings } from "../../hooks/api/useWebSettings";
import Footer from "../Footer"
import Navbar from "../Navbar"
import { LoadingTransition } from "../ui/TextLoading";

const DefaultLayout = ({ children }) => {
    const { isLoading } = useWebSettings();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [window.location.pathname]);
    return (
        <LoadingTransition
            loading={isLoading}
            text="ESKALABER"
            size="xl"
            fullscreen={true}
        >
            <div className="min-h-screen">
                <Navbar />

                <main className="min-h-52">
                    {children}
                </main>

                <Footer />
            </div>
        </LoadingTransition>
    )
}

export default DefaultLayout;