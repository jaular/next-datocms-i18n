import { useRouter } from "next/router";

const LenguageSelector = () => {
  const router = useRouter();
  const path = router.pathname === "/";
  const changeLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (path) {
      router.push(router.pathname, router.pathname, {
        locale: event.target.value,
      });
    } else {
      router.push("/", "/", {
        locale: event.target.value,
      });
    }
  };

  return (
    <div>
      <select onChange={changeLang} defaultValue={router.locale}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
};

export default LenguageSelector;
