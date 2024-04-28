import {RouterProvider, createBrowserRouter} from "react-router-dom";
import MainApp from "./mainApp.js"

function App() {

  const route = createBrowserRouter([
    {
      path:"/",
      element: < MainApp />,
    },
  ])

  return (
    <div className="App">
       <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;