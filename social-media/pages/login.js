import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";

import "bootstrap/dist/css/bootstrap.css";

export default function Login() {
    const router = useRouter();
    const { mutate } = useMutation();
    const [payload, setPayload] = useState({
      email: "",
      password: "",
    });
  
    const HandleSubmit = async () => {
      const res = await mutate({
        url: "https://paace-f178cafcae7b.nevacloud.io/api/login",
        payload,
      });
      if (res?.success) {
        Cookies.set("user_token", res?.data?.token, {
          expires: new Date(res?.data?.expires_at),
          path: "/",
        });
        router.push("/");
      }
    };
  
  return (
    <div className="container">
      <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                <label for="floatingInput" value={payload?.email}
                  onChange={(event) =>
                    setPayload({ ...payload, email: event.target.value })
                  }>Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                <label for="floatingPassword"   value={payload?.password}
                  onChange={(event) =>
                    setPayload({ ...payload, password: event.target.value })
                  }>Password</label>
              </div>

              <div class="form-check mb-3">
                <label class="form-check-label" for="rememberPasswordCheck">
                  Belum punya akun?  <Link href="/register">Sign Up</Link>
                </label>
              </div>
              <div class="d-grid">
                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit" onClick={() => HandleSubmit()}>Sign
                  in</button>
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
