import SunwayNavLink from "./SunwayNavLink"
import SunwayRoute from "./SunwayRoute"
import { STORE_NAME } from "./config"

const App = () => {
  return (
    <div className="app">
      <SunwayNavLink />
      <main>
        <SunwayRoute />
      </main>
      <footer className="footer">
        <div className="container">&copy; {new Date().getFullYear()} {STORE_NAME}. Payment is cash on delivery.</div>
      </footer>
    </div>
  )
}

export default App
