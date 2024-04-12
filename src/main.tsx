import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { NextUIProvider } from "@nextui-org/react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import AuthPage from "./pages/auth/auth"
import { PostsPage } from "./pages/posts/posts"
import { Layout } from "./components/layout/layout"
import { CurrentPostPage } from "./pages/current-post/currentPost"
import { UserProfilePage } from "./pages/user-profile/userProfile"
import { FollowersPage } from "./pages/followers/followers"
import { FollowingPage } from "./pages/following/following"
import { AuthGuard } from "./features/user/authGuard"

const container = document.getElementById("root")
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <PostsPage />,
      },
      {
        path: "posts/:id",
        element: <CurrentPostPage />,
      },
      {
        path: "users/:id",
        element: <UserProfilePage />,
      },
      {
        path: "/followers",
        element: <FollowersPage />,
      },
      {
        path: "/following",
        element: <FollowingPage />,
      },
    ],
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <ThemeProvider>
            <AuthGuard>
              <RouterProvider router={router} />
            </AuthGuard>
          </ThemeProvider>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
