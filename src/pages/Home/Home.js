import Product from "../Product/Product";
// import Slider from "../../components/Slider/Slider";

const Home = () => {
  // const wLocation = window.location.href;

  // const smoothScroll = () => {
  //   if (wLocation.includes("#products")) {
  //     window.scrollTo({ top: 700, behavior: "smooth" });
  //   }
  //   return;
  // };

  // useEffect(() => {
  //   smoothScroll();
  // }, []);
  return (
    <div className="home">
      {/* <Slider /> */}
      <Product />
    </div>
  );
};

export default Home;
