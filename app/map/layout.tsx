import FilterBar from "../components/map/FilterBar";
import List from "../components/list/List";
import KakaoMap from "../components/map/KakaoMap";

const layout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <FilterBar />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-100 h-full z-10">
          <List />
        </div>
        {/* Map area */}
        <div className="flex-1 relative">
          <KakaoMap />
        </div>
      </div>
    </div>
  );
};

export default layout;
