import * as ServiceAuth from "../pages/service/auth/auth"

export const useCurrentUser = () :any => {
  if(ServiceAuth.isAuthenticated()) {
    
    return JSON.parse(localStorage.getItem("user") || "")
  }
}