import Swal from "sweetalert2";
import "./Toast.css";

const Toast = Swal.mixin({
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timer: 2000,
	timerProgressBar: true,
	// backdrop: "rgba(0, 0, 0, 0.2)",
	background: "#F5F5F5",
	color: "#104EC1",
	width: "16em",
	didOpen: (toast) => {
		toast.addEventListener("mouseenter", Swal.stopTimer);
		toast.addEventListener("mouseleave", Swal.resumeTimer);
	},
});

export default Toast;

export const SmallToast = Swal.mixin({
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timer: 2000,
	// backdrop: "rgba(0, 0, 0, 0.2)",
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener("mouseenter", Swal.stopTimer);
		toast.addEventListener("mouseleave", Swal.resumeTimer);
	},
});
