import { Home } from "@/Home";
import NftInstallPlugin from "@/components/NftIntallPlugin";
import { React, ReactDOM } from "@/lib/react";
import { Provider } from "@/lib/redux";
import { store } from "@/store";
import "./index.css";

const AppComponent = () => {
  if (window.ethereum) {
    return <Home />;
  } else {
    return <NftInstallPlugin />;
  }
};
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppComponent />
    </Provider>
  </React.StrictMode>
);
