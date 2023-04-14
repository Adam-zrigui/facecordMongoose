import React, { Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ErrorFallback from "./components/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import { Spinner } from "@chakra-ui/react";

const HomePage = React.lazy(() => import("./Pages/HomePage"));
const ChatPage = React.lazy(() => import("./Pages/ChatPage"));
function App() {
  return (
    <div className="App">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload(true)}
      >
        <Suspense
          fallback={
            <div style={{ margin: "auto" }}>
              {" "}
              {
                <Spinner
                  thickness="9px"
                  speed="0.65s"
                  w={50}
                  h={50}
                  emptyColor="blue.600"
                  color="blue.800"
                  size="xl"
                />
              }{" "}
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chats" element={<ChatPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;