import { Link } from "react-router-dom";

function StartPage() {
    return ( 
        <div className="h-screen bg-black flex justify-center items-center">
            <Link to='/menu/view' className="btn bg-green-500 rounded-full border-none text-white px-12 py-4 hover:bg-green-600 font-bold">Start</Link>
        </div>
    );
}

export default StartPage;