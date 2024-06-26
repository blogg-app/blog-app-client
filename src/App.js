import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'

import 'App.css'
import HomePage from 'pages/home/HomePage'
import BlogPage from 'pages/blog/BlogPage'
import Admin from 'pages/admin/screens/Admin'
import LoginPage from 'pages/Login/LoginPage'
import NotFound from 'pages/NotFound/NotFound'
import AdminLayout from 'pages/admin/AdminLayout'
import Users from 'pages/admin/screens/users/Users'
import ProfilePage from 'pages/profile/ProfilePage'
import RegisterPage from 'pages/register/RegisterPage'
import NewPost from 'pages/admin/screens/posts/NewPost'
import EditPost from 'pages/admin/screens/posts/EditPost'
import Comments from 'pages/admin/screens/comments/Comments'
import ManagePosts from 'pages/admin/screens/posts/ManagePosts'
import Categories from 'pages/admin/screens/categories/Categories'
import ArticleDetailPage from './pages/articleDetail/ArticleDetailPage'
import ForgotPasswordPage from 'pages/ForgotPassword/ForgotPasswordPage'
import EditCategories from 'pages/admin/screens/categories/EditCategories'

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<ArticleDetailPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/profile" element={<ProfilePage />} />
        <Route path="/auth/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
          <Route path="posts/new" element={<NewPost />} />
          <Route path="posts/manage" element={<ManagePosts />} />
          <Route path="posts/manage/edit/:slug" element={<EditPost />} />
          <Route path="categories/manage" element={<Categories />} />
          <Route
            path="categories/manage/edit/:categoryId"
            element={<EditCategories />}
          />
          <Route path="users/manage" element={<Users />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
