import { processSilentRenew } from "redux-oidc";

const SilentRenew = () => {
    /**
     * this is currently erroring out in dev on my local machine, with `Frame window timed out` error. Possibly related
     * to SSL cert being missing / wrong on local box. See https://stackoverflow.com/questions/48086331/how-to-handle-oidc-silent-renew-error
     * and https://github.com/IdentityModel/oidc-client-js/issues/1088
     */

    processSilentRenew();
    console.log("silent renew");
    return (<></>);
}

export default SilentRenew;