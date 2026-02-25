import { clientApi } from "@/app/lib/api";
import Navbar from "./Navbar";

export default async function Header() {

    // Fetch data song song từ API
    const [config] = await Promise.all([
      clientApi.getConfigSite().catch(() => null),
    ]);
  

    return (
        <>
            <Navbar config={config} />
        </>
    );
}