import { useWebSettingByTitle, useWebSettings } from "../../hooks/api/useWebSettings";
import Footer from "../Footer"
import Navbar from "../Navbar"
import { LoadingTransition } from "../ui/TextLoading";

const DefaultLayout = ({ children }) => {
    const { data, isLoading } = useWebSettings();

    return (
        <LoadingTransition
            loading={isLoading}
            text="ESKALABER"
            size="xl"
            fullscreen={true}
        >
            <div className="min-h-screen">
                <Navbar />

                <main>
                    {children}
                </main>

                <Footer data={data?.data} />
            </div>
        </LoadingTransition>
    )
}

export default DefaultLayout;