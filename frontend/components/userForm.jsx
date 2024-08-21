import React from "react";
import { useForm } from "react-hook-form";

export default function Modal({ showModal }) {
  //   const [showModal, setShowModal] = React.useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (e) => {
    // e.preventDefault()
    // alert(JSON.stringify(e));

    let formdata = new FormData();
    formdata.username = document.getElementById("name").value;
    formdata.useremail = document.getElementById("email").value;

    console.log(formdata)
    console.log(`${location.origin}/apps/proxy/userdata?shop=${Shopify.shop}`);
    fetch(`${location.origin}/apps/proxy/userinfo?shop=${Shopify.shop}`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin":"*",
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    // await fetch(`${location.origin}/apps/proxy?shop=${Shopify.shop}`);
    // const response = await fetch(
    //   `${location.origin}/apps/proxy?shop=${Shopify.shop}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json, text/plain, */*",
    //       "Content-Type": "application/json",
    //     },
    //     //   body: JSON.stringify({ name: "venki", email: "venki@gmail.com" }),
    //     body: JSON.stringify(formdata),
    //   }
    // );
    // if (!response.ok) {
    //   return;
    // }
    // const data = await response.json();
    // console.log("outer");
    // console.log(data);
  };

  return (
    <>
      <div id="alivenow-game">
        <div id="pop-up-container">
          <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <div id="backdrop">
              <h2>GET 10% OFF</h2>
              <p>Sign with email to get 10% Discount code.</p>
              <div id="controls">
                <label htmlFor="name">Name:</label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  name="name"
                  required
                />
                <br />
              </div>
              <div id="controls">
                <label htmlFor="email">Email:</label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  name="email"
                  required
                />
                <br />
              </div>
              <div id="form-error">Email already exits,Try Another!</div>
              <button type="submit" id="submit-btn">
                Submit.
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
