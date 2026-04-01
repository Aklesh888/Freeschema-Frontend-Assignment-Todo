import { updateAccessToken } from "mftsccs-browser";
import { IUser } from "../../interfaces/IUser.interface";

export async function saveTolocalStorage(signinResponse: any) {

  
    let userProfile: IUser = {
      token: signinResponse?.data?.token,
      refreshToken: signinResponse?.data?.refreshtoken,
      email: signinResponse?.data?.email,
      userId: signinResponse?.data?.entity?.[0]?.userId,
      userConcept: signinResponse?.data?.userConcept,
      amcode: btoa(JSON.stringify(signinResponse?.data?.roles)),
    };
    updateAccessToken(userProfile.token);
  
    localStorage.setItem("profile", JSON.stringify(userProfile));
  
    return true;
  }



  export async function getLocalStorageData() {
    return new Promise((resolve: any) => {
      let dataFromLocalStorage: string = localStorage?.getItem("profile") || "";
      if (dataFromLocalStorage) {
        const profileData: IUser = JSON.parse(dataFromLocalStorage);
        // return profileData;
        resolve(profileData);
      } else {
        resolve();
      }
    });
  }


  export  function getLocalUserId() {
      let dataFromLocalStorage: string = localStorage?.getItem("profile") || "";
      if (dataFromLocalStorage) {
        const profileData: IUser = JSON.parse(dataFromLocalStorage);
        // return profileData;
        return Number(profileData.userId);
      } 
      return 999;
  }