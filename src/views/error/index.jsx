import { useRouteError } from "react-router-dom";
import useResetScroll from '../../hooks/useResetScroll'

export default function ErrorPage() {
  useResetScroll();
  
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="p-24 h-[80vh] text-2xl text-center flex flex-col justify-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}