import DetailsPromotion from "@/components/main/details-components/DetailsPromotion";
import FindShopsAndLocation from "@/components/main/details-components/FindShopsAndLocation";
import NewArrive from "@/components/main/details-components/NewArrive";
import TopProduct from "@/components/main/details-components/TopProduct";


const Details = () => {
    return (
        <div className="lg:px-10 lg:flex gap-[21px] lg:mb-[80px]">
            <DetailsPromotion />
            <FindShopsAndLocation />
            <div>
                <TopProduct />
                <NewArrive />
            </div>
        </div>
    );
};

export default Details;