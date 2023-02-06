import { reactLocalStorage } from 'reactjs-localstorage';

//  const tokenData = () => {

//     let BearerToken = reactLocalStorage.get("token", false);
//     console.log(BearerToken)
//     if(!BearerToken){
//         return("/login")
//     }
//     else{
//         return("#/")
//     }

// }

// export default tokenData             

export const TokenDataValidCheck = () => {


    const tokenData = () => {

        let BearerToken = reactLocalStorage.get("token", false);
        console.log(BearerToken)
        if (!BearerToken) {
            return ("#/login")
        }
        else {
            return ("#/")
        }

    }



    return tokenData();
};
