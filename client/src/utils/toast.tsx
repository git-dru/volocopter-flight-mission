import { toast } from "react-toastify";

interface ToastOptions {
  type: "success" | "error";
  title: string;
  text: string;
}

const ToastContent = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => (
  <div>
    <strong>{title}</strong>
    <div>{text}</div>
  </div>
);

const Toast = ({ type, title, text }: ToastOptions) => {
  toast[type](<ToastContent title={title} text={text} />, {
    position: toast.POSITION.BOTTOM_CENTER,
    style: { width: "max-content" },
  });
};

export default Toast;
