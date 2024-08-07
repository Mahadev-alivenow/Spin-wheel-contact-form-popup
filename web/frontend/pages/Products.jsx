import { ResourcePicker } from "@shopify/app-bridge-react";
import { Page, Grid, LegacyCard, Layout, Spinner } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import {
  AppBridgeProvider,
  PolarisProvider,
  QueryProvider,
} from "../components";
import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthenticatedFetch } from "../hooks";
import { Add, Delete } from "@mui/icons-material";
import useApiRequest from "../hooks/useApiRequest";
import MyModal from "../components/FormModal";



function Products() {

  const {responseData,isLoading,error} = useApiRequest("/api/products/all","GET")
  // console.log(responseData)
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [formData, setFormData] = useState({});
 
  let fetch = useAuthenticatedFetch()

  let submitHandler = (e) => {
    e.preventDefault()
    fetch("/api/products/update",{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formData)
    }).then((response)=> {
      if(response.ok){
        setIsModalOpen(false)
      }
      return response.json()
    }).then(data => {
      console.log(data)
    }).catch(error => { 
      console.log(error.message)
    })

  }
  let valueHandler = (e) => {
    let {name,value} = e.target
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    })) 

  };

  const productHandler = (productId) => {
    let searchedProduct = responseData?.data.find((ele)=> ele.id === productId)
    setIsModalOpen(true)
    setFormData(()=> ({
      ...searchedProduct
    }))
  }
  const createhandler = async() => {
    try {
      let request = await fetch("/api/products/create",{
        method: "POST"
      });
      let response = await request.json()
      console.log(response)
    } catch (error) {
      console.log(error.message)
    }
  };

  const deletehandler = async() => {
    
    try {
      let request = await fetch("/api/products/delete",{
        method: "DELETE"
      });
      let response = await request.json()
      console.log(response)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <button className="button" onClick={createhandler}>
            New <Add />
          </button>
          <button className="button" onClick={deletehandler}>
            Delete <Delete />
          </button>
        </Layout.Section>
        <Layout.Section>
          {isLoading && (
            <Spinner accessibilityLabel="Spinner example" size="large" />
          )}
          <Grid>
            {!isLoading &&
              responseData.data.map((product) => (
                <Grid.Cell
                  key={product.id}
                  columnSpan={{ xs: 6, sm: 6, md: 2, lg: 4, xl: 3 }}
                >
                  <div
                    className="card"
                    onClick={() => productHandler(product.id)}
                  >
                    <LegacyCard sectioned>
                      <img
                        src={product?.image?.src}
                        alt="product media"
                        className="product-image"
                      />
                      <h2 className="product-title">{product.title}</h2>
                      <p className="product-price">
                        ${product.variants[0].price}
                      </p>
                    </LegacyCard>
                  </div>
                </Grid.Cell>
              ))}
          </Grid>
        </Layout.Section>
      </Layout>
      {isModalOpen && (
        <div className="product-modal">
          <p className="btn-close" onClick={() => setIsModalOpen(false)}>
            X
          </p>
          <div className="modal-form">
            <form onSubmit={submitHandler}>
              <div className="image-block">
                <img src={formData?.image?.src} alt="product media" />
              </div>
              <div className="form-fields">
                <input type="hidden" name="id" value={formData.id} />
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={valueHandler}
                />
                <input
                  type="number"
                  name="formData.variants[0].price"
                  id="price"
                  value={formData.variants[0].price}
                  onChange={valueHandler}
                />
                <textarea
                  name="body_html"
                  id="body_html"
                  cols="30"
                  rows="10"
                  value={formData.body_html}
                  onChange={valueHandler}
                ></textarea>
                <input
                  type="text"
                  name="handle"
                  id="handle"
                  value={formData.handle}
                  onChange={valueHandler}
                />
                <input className="button" type="submit" value="Update" />
              </div>
            </form>
          </div>
        </div>
      )}
      {/* <a href="#" className="text-3xl font-bold underline text-coffee">Hello world!</a> */}
    </Page>
  );
}

// function Products() {
//   const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
//   const { t } = useTranslation();

//   let fetch = useAuthenticatedFetch();

//   const [open, setOpen] = useState(false);
//   const [storeName, setStoreName] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         let request = await fetch("/api/store/info");
//         let response = await request.json()
//         console.log(response);
//         setStoreName(response.data[0]?.name || "Your Store name");
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
//     fetchData();
//   }, []);

//   const handleSelection = (res) => {
//     const idFromREsources = res.selection.map((product)=> product.id)
//     setOpen(false)
//     console.log(idFromREsources)
//   }
//   return (
//     <PolarisProvider>
//       <AppBridgeProvider>
//         {/* //   <BrowserRouter>
//         // <AppBridgeProvider>
//     //       <QueryProvider> */}

//         {/* // <> */}
//         <Page
//           title="Product selector"
//           primaryAction={{
//             content: "Select products",
//             onAction: () => setOpen(true),
//           }}
//         />

//         <ResourcePicker
//           resourceType="Product"
//           open={open}
//           onCancel={() => setOpen(false)}
//           onSelection={(res) => handleSelection(res)}
//         />
//         <div>{storeName}</div>
//         {/* </>

//     //       </QueryProvider>
//     //     </AppBridgeProvider>
//     //   </BrowserRouter> */}
//       </AppBridgeProvider>
//     </PolarisProvider>
//   );
// }

export default Products;
