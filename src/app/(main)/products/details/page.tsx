import DetailsPromotion from "@/components/main/details-components/DetailsPromotion";
import FindShopsAndLocation from "@/components/main/details-components/FindShopsAndLocation";
import NewArrive from "@/components/main/details-components/NewArrive";
import TopProduct from "@/components/main/details-components/TopProduct";


const Details = () => {
    return (
        <div className="lg:px-4 mt-16 lg:pt-[51px] lg:flex gap-[21px] lg:mb-[80px] mx-auto max-w-[1280px]">
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