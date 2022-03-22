import React, { lazy, Suspense } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from '@reach/router'

//Pages
import Loading from '@pages/loading'
const Main = lazy(() => import('@pages/main'))

const NotFound = () => <div>Sorry, nothing here.</div>

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Main path='/' />
        <NotFound default />
      </Router>
    </Suspense>
  )
}

export default hot(module)(App)
