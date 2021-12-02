import styles from '../../styles/dodajZadatak.module.scss';
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { Container } from 'react-bootstrap';
import AddTaskForm from '../../components/Task/AddTaskForm';
import WithAuth from '../../middlewares/Client/withAuth';
import Notification from '../../components/Notification/Notification';
import Loader from '../../components/Loader';
import Head from 'next/head';
import useStateWithValidation from '../../components/Utilities/Hooks/useStateWithValidation';

const dodajZadatak = () => {
  const [username, setUsername, usernameIsValid] = useStateWithValidation(
    name => name.length > 5,
    ''
  );

  const handleWriteName = e => {
    setUsername(e.target.value);
  };
  return (
    <>
      <Head>
        <title>Dodaj zadatak</title>
        <meta name="description" content="prijava, generiranje, zadataka" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        id="mainContainer"
        className="my-4 justify-content-center aling-items-center"
      >
        <form>
          <div className="mb-6">
            <label
              for="email"
              className={
                usernameIsValid == true
                  ? 'text-green-700 block dark:text-green-500'
                  : usernameIsValid == false
                  ? 'text-red-700 dark:text-red-500'
                  : 'text-gray-900 dark:text-gray-300'
              }
            >
              Your email
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>

              <input
                type="email"
                id="email"
                className={
                  usernameIsValid == true
                    ? 'input-text--success'
                    : usernameIsValid == false
                    ? 'input-text--error'
                    : 'input-text'
                }
                placeholder="name@flowbite.com"
                required
                value={username}
                onChange={handleWriteName}
              ></input>
            </div>
            {usernameIsValid == true ? (
              <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                <span className="font-medium">Alright!</span> Username
                available!
              </p>
            ) : usernameIsValid == false ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span> Username already
                taken!
              </p>
            ) : null}
          </div>

          <label
            for="email-adress-icon"
            className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Your Email
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <input
              type="text"
              id="email-adress-icon"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
            ></input>
          </div>

          <div className="mb-6">
            <label
              for="password"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            ></input>
          </div>
          <div className="mb-6">
            <label
              for="repeat-password"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Repeat password
            </label>
            <input
              type="password"
              id="repeat-password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            ></input>
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              ></input>
            </div>
            <div className="text-sm ml-3">
              <label
                for="terms"
                className="font-medium text-gray-900 dark:text-gray-300"
              >
                I agree with the{' '}
                <a
                  href="#"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </a>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register new account
          </button>
        </form>

        <AddTaskForm />
        <Notification className={styles.notificationPosition} />
      </Container>
    </>
  );
};

export default WithAuth(dodajZadatak);
