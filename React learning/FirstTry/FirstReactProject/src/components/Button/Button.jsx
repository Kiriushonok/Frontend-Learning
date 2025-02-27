import classes from "./Button.module.css";

export default function Button({ isActive, children, ...props }) {
  return (
    <button
      {...props}
      className={
        isActive ? `${classes.active} ${classes.button}` : `${classes.button}`
      }
    >
      {children}
    </button>
  );
}
