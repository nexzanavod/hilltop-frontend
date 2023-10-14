import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes,Navigate } from 'react-router-dom'
import './scss/style.scss'
import 'rsuite/dist/rsuite.min.css'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const ProgramPage = React.lazy(() => import('./views/pages/main/Program/programPage'))
const Income = React.lazy(() => import('./views/pages/main/Income/AddIncome'))
const Report = React.lazy(() => import('./views/pages/main/report/report.All/components/report.component'))



class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/#/program" name="program Page" element={<ProgramPage />} />
            <Route exact path="/#/income" name="Income Page" element={<Income />} />
            <Route exact path="/#/report" name="Income Page" element={<Report />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />

            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App

