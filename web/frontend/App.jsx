import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu,ResourcePicker } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
  NavigationBar,
  TopBar,
} from "./components";
import { Heading, Page, Text } from "@shopify/polaris";
import { useEffect, useState } from "react";
import MyModal from "./components/FormModal";

// import { useAuthenticatedFetch } from "./hooks";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const { t } = useTranslation();

  // let fetch = useAuthenticatedFetch()

  // const [open,setOpen] = useState(false)
  // const [storeName, setStoreName] = useState('');

  // useEffect(()=> {
  //   async function fetchData() {
  //     try {
        
  //       let request = fetch('/api/store/info',{
  //         method:"GET",
  //         headers:{"Content-Type":"application/json"}
  //       })
  //       console.log(request)
  //       let response = await request.json()
  //       setStoreName(response.data[0].name)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchData()
  // },[])
  // const handleSelection = (res) => {
  //   const idFromREsources = res.selection.map((product)=> product.id)
  //   setOpen(false)
  //   console.log(idFromREsources)
  // }
  return (
    // <PolarisProvider>
    //   <BrowserRouter>
    //     <AppBridgeProvider>
    //       {/* <Text variant="heading3xl" as="h2">
    //         store Name
    //       </Text> */}
    //       <Page
    //         title="Product selector"
    //         primaryAction={{
    //           content: "Select products",
    //           onAction: () => setOpen(true),
    //         }}
    //       />

    //       <ResourcePicker
    //         resourceType="Product"
    //         open={open}
    //         onCancel={() => setOpen(false)}
    //         onSelection={(res) => handleSelection(res)}
    //       />
    //     </AppBridgeProvider>
    //   </BrowserRouter>
    // </PolarisProvider>
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <NavigationMenu navigationLinks={[]} />
            <div className="main-section">
              <div className="menu-section">
                <NavigationBar />
              </div>
              <div className="content-section">
                <TopBar />

                <Routes pages={pages} />
              </div>
            </div>
            {/* <MyModal /> */}

            {/* <Text variant="heading3xl" as="h2">
            storeName
            </Text>
            <Page
            title="Product selector"
            primaryAction={{
              content: "Select products",
              onAction: () => setOpen(true),
            }}
          />

          <ResourcePicker
            resourceType="Product"
            open={open}
            onCancel={() => setOpen(false)}
            onSelection={(res) => handleSelection(res)}
          /> */}
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}

