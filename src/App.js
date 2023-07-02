import { CartProvider } from "react-use-cart";
import "./App.css";
import React, { Suspense } from "react";

const Router = React.lazy(() => import("./router/Router"));

export default function App() {
  return (
    <div>
      <Suspense fallback={<div className="m-2">Loading...</div>}>
        <CartProvider>
          <Router />
        </CartProvider>
      </Suspense>
    </div>
  );
}
