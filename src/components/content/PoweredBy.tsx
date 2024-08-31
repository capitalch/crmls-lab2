import { AppVersion } from "../../index";
import dayjs from "dayjs";

function PoweredBy() {
  return (
      <div className="text-xs text-secondary flex flex-wrap justify-center">
<<<<<<< HEAD
        <img src="https://cdn.crmls.org/operations/files/logos/REcore-Logo_110x32-Black.png" alt="REcore Logo" />
=======
        <img src="https://cdn.crmls.org/operations/files/logos/REcore-Logo-Black.png" alt="REcore Logo" />
>>>>>>> dev-1
        <p className="mt-1">Powered by REcore Solutions LLC.</p>
        <p className="mt-1">&copy; {dayjs().format("YYYY")} REcore. All rights reserved.</p>
        <p className="mt-1">Version { AppVersion }</p>
      </div>
  )
}

export default PoweredBy