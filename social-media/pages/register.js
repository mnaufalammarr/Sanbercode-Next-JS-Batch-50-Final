import "bootstrap/dist/css/bootstrap.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useState } from "react";
import { useMutation } from "@/hooks/useMutation";

export default function Login() {
  const router = useRouter();
  const { mutate } = useMutation();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
    hobby: "",
  });

  const HandleSubmit = async () => {
    const res = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/register",
      payload,
    });
    if (!res?.success) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 2000,
        confirmButtonColor: "rgb(56 189 248)",
      });
    } else {
      Cookies.set("user_token", res?.data?.token, {
        expires: new Date(res?.data?.expires_at),
        path: "/login",
      });
      router.push("/login");
    }
  };
  const [startDate] = useState(new Date());
  return (
    <div className="container">
      <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Sign up</h5>
            <form>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Username"/>
                <label for="floatingInput"  value={payload?.name}
                onChange={(event) =>
                  setPayload({ ...payload, name: event.target.value })
                }>Username</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Phone"/>
                <label for="floatingInput" value={payload?.phone}
                onChange={(event) =>
                  setPayload({ ...payload, phone: event.target.value })
                }> Phone</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Hobby"/>
                <label for="floatingInput"   value={payload?.hobby}
                onChange={(event) =>
                  setPayload({ ...payload, hobby: event.target.value })
                }>Hobby</label>
              </div>
              <div class="form-floating mb-3">
                <label for="floatingInput">BirthDate</label>
              <DatePicker selected={startDate} onSelectedDateChanged={payload?.dob}
                onChange={(event) =>
                  setPayload({ ...payload, dob: event.target.value })
                }/>
              </div>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                <label for="floatingInput" value={payload?.email}
                onChange={(event) =>
                  setPayload({ ...payload, email: event.target.value })
                }>Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                <label for="floatingPassword" value={payload?.password}
                onChange={(event) =>
                  setPayload({ ...payload, password: event.target.value })
                }>Password</label>
              </div>
              <div class="d-grid">
                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit" onClick={() => HandleSubmit()}>Sign
                  Up</button>
              </div>
            
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
     </div>
  );
}
