import { Form, useActionData, useNavigation,useRouteError, } from "react-router-dom";
import styles from "../style/AuthForm.module.css";

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const error = useRouteError();
  return (
    <div className={styles.formBox}>
      <Form method="POST" className={styles.authForm}>
        <h2 className={styles.title}>Log In</h2>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        {error && <p>{error.data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={styles.action}>
          <div>
            <button
              className={styles.buttonBck}
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Submitting..." : "Login"}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default AuthForm;
