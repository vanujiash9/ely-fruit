import { renderToString } from "react-dom/server"
import App from "./App"
import { business, businessSchema } from "./features/business/business-data"

export function render(): string {
  return renderToString(<App />)
}

export { business, businessSchema }
