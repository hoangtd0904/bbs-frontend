import * as authServices from "./services/authServices";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { DefaultLayout } from "./layouts";
import { publicRoutes, privateRoutes, authRoutes } from "./routes";

function App() {
  // values
  const exp = 30; // logout in minutes

  //states
  const [login, setLogin] = useState(sessionStorage.getItem("name") !== null);
  const [loading, setLoading] = useState(true);

  // request handlers
  const validate = async () => {
    const result = await authServices.validate();
    if (result !== undefined) {
      sessionStorage.setItem("name", result.username);
      console.log("get: " + result.username);
      setLoading(false);
      setTimeout(() => {
        // TODO: handle expired time
        alert("Expired credentials!\nLogging out now.");
        setLogin(false);
      }, exp * 60000);
    }
  };

  // functions

  function getPagewithLayout(route) {
    let Layout = DefaultLayout;

    if (route.layout) {
      Layout = route.layout;
    } else if (route.layout === null) Layout = Fragment;

    const Page = route.component;

    return { Layout, Page };
  }

  const PrivateRoutes = () => {
    return sessionStorage.getItem("name") !== null ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    );
  };

  const AuthRoutes = () => {
    return sessionStorage.getItem("name") === null ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    );
  };

  useEffect(() => {
    console.log("validating..." + login);

    validate();
    // axios
    //     .get(`http://localhost:9000/validate`, {
    //         withCredentials: true,
    //     })
    //     .then((response) => {
    //         sessionStorage.setItem('name', response.data.username);
    //         console.log("get: " + response.data.username);
    //         setLoading(false);
    //         setTimeout(() => { // TODO: handle expired time
    //             alert('Expired credentials!\nLogging out now.');
    //             setLogin(false)
    //         }, (exp * 60000));
    //     })
    //     .catch((error) => {
    //         console.log(error.response.data.error);
    //         sessionStorage.removeItem('name');
    //     });
  }, [login, loading]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const { Layout, Page } = getPagewithLayout(route);
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout login={login} setLogin={setLogin} loading={loading}>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          <Route element={<PrivateRoutes />}>
            {privateRoutes.map((route, index) => {
              const { Layout, Page } = getPagewithLayout(route);
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout login={login} setLogin={setLogin}>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Route>
          <Route element={<AuthRoutes />}>
            {authRoutes.map((route, index) => {
              const { Layout, Page } = getPagewithLayout(route);
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout setLogin={setLogin}>
                      <Page setLogin={setLogin} />
                    </Layout>
                  }
                />
              );
            })}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
