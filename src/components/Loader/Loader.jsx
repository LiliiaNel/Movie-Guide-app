import { PulseLoader } from "react-spinners";

export default function Loader() {
    return <div className="flex justify-center items-center h-64">
        <PulseLoader
            color={'#f97316'}
            size={14}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>;
};